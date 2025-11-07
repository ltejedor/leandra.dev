import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { generateHTML } from '@tiptap/html/server';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import LinkExtension from '@tiptap/extension-link';
import { extractHeadings } from '~/lib/toc-utils';

// TipTap extensions for HTML generation - match client configuration
const extensions = [
  StarterKit,
  Image.configure({
    HTMLAttributes: {
      class: 'rounded-lg max-w-full h-auto',
    },
  }),
  LinkExtension.configure({
    autolink: true,
    linkOnPaste: true,
    openOnClick: false,
    HTMLAttributes: {
      target: '_blank',
      rel: 'noopener noreferrer nofollow',
    },
  }),
];

export const postRouter = createTRPCRouter({
  // Get all published posts
  getPublished: publicProcedure
    .input(z.object({ 
      limit: z.number().min(1).max(100).optional().default(10),
      cursor: z.string().optional(),
      tag: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      const posts = await ctx.db.post.findMany({
        where: { 
          published: true,
          ...(input.tag && { tags: { has: input.tag } })
        },
        orderBy: { createdAt: "desc" },
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        select: {
          id: true,
          title: true,
          slug: true,
          content: true,
          excerpt: true,
          previewImage: true,
          tags: true,
          published: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      let nextCursor: string | undefined = undefined;
      if (posts.length > input.limit) {
        const nextItem = posts.pop();
        nextCursor = nextItem?.id;
      }

      return {
        posts,
        nextCursor,
      };
    }),

  // Get single post by slug
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const post = await ctx.db.post.findUnique({
        where: { slug: input.slug },
      });

      if (!post) return null;

      // Handle case where content might be null
      if (!post.content) {
        return {
          ...post,
          html: '',
          tocHeadings: [],
        };
      }

      // Extract TOC headings from TipTap JSON
      const tocHeadings = extractHeadings(post.content as any);

      // Generate HTML from TipTap JSON
      let html = generateHTML(post.content as any, extensions);

      // Add IDs to headings in the HTML using the same robust approach as client-side
      tocHeadings.forEach(({ id, text, level }) => {
        // Create a more specific pattern that matches the exact heading level and text
        const escapedText = text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const headingPattern = new RegExp(
          `(<h${level}[^>]*>)(\\s*${escapedText}\\s*)(</h${level}>)`,
          'i'
        );
        
        // Replace the heading with one that includes the ID
        html = html.replace(headingPattern, (match, openTag, content, closeTag) => {
          // Check if ID already exists in the opening tag
          if (openTag.includes('id=')) {
            return match; // Skip if ID already exists
          }
          // Add the ID to the opening tag
          const updatedOpenTag = openTag.replace(/(<h\d+)([^>]*)(>)/, `$1 id="${id}"$2$3`);
          return updatedOpenTag + content + closeTag;
        });
      });

      // Ensure proper spacing around inline links when adjacent to words or parentheses
      html = html
        .replace(/([A-Za-z0-9])<a /g, '$1 <a ')
        .replace(/<\/a>([A-Za-z0-9(])/g, '</a> $1');

      // Rewrite relative image srcs to Supabase public URLs (matches live site behavior)
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      if (supabaseUrl) {
        const toSupabaseUrl = (src: string) => {
          if (/^https?:\/\//i.test(src)) return src;
          const parts = src.split('/');
          const filename = parts[parts.length - 1] || src;
          const sanitized = filename
            .replace(/[^a-zA-Z0-9.-]/g, '_')
            .replace(/_+/g, '_')
            .replace(/^_|_$/g, '');
          return `${supabaseUrl}/storage/v1/object/public/blog-images/public/${input.slug}/${sanitized}`;
        };

        html = html.replace(/(<img[^>]*?src=")(.*?)(")[^>]*?>/g, (match, p1, src, p3) => {
          if (src.startsWith('./') || src.startsWith('/images/blog/')) {
            return match.replace(src, toSupabaseUrl(src));
          }
          return match;
        });
      }

      return {
        ...post,
        html,
        tocHeadings,
      };
    }),

  // Admin: Get all posts (including unpublished)
  getAll: publicProcedure
    .query(async ({ ctx }) => {
      return ctx.db.post.findMany({
        orderBy: { updatedAt: "desc" },
        select: {
          id: true,
          title: true,
          slug: true,
          tags: true,
          published: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    }),

  // Admin: Get single post for editing
  getForEdit: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.post.findUnique({
        where: { slug: input.slug },
      });
    }),

  // Admin: Create or update post
  upsert: publicProcedure
    .input(z.object({
      slug: z.string().min(1),
      title: z.string().min(1),
      content: z.any(), // TipTap JSON content
      published: z.boolean().optional().default(false),
      previewImage: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.upsert({
        where: { slug: input.slug },
        update: {
          title: input.title,
          content: input.content,
          published: input.published,
          previewImage: input.previewImage,
        },
        create: {
          slug: input.slug,
          title: input.title,
          content: input.content,
          published: input.published,
          previewImage: input.previewImage,
        },
      });
    }),

  // Admin: Delete post
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.delete({
        where: { id: input.id },
      });
    }),

  // Admin: Toggle publish status
  togglePublish: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.db.post.findUnique({
        where: { id: input.id },
      });

      if (!post) {
        throw new Error('Post not found');
      }

      return ctx.db.post.update({
        where: { id: input.id },
        data: { published: !post.published },
      });
    }),

  // Get all unique tags from published posts
  getTags: publicProcedure
    .query(async ({ ctx }) => {
      const posts = await ctx.db.post.findMany({
        where: { published: true },
        select: { tags: true },
      });

      // Flatten all tags and get unique values
      const allTags = posts.flatMap(post => post.tags);
      const uniqueTags = [...new Set(allTags)].sort();

      return uniqueTags;
    }),
});
