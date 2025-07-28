import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { generateHTML } from '@tiptap/html/server';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';

// TipTap extensions for HTML generation - match client configuration
const extensions = [
  StarterKit,
  Image.configure({
    HTMLAttributes: {
      class: 'rounded-lg max-w-full h-auto',
    },
  }),
];

export const postRouter = createTRPCRouter({
  // Get all published posts
  getPublished: publicProcedure
    .input(z.object({ 
      limit: z.number().min(1).max(100).optional().default(10),
      cursor: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      const posts = await ctx.db.post.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
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

      // Generate HTML from TipTap JSON
      // Handle case where content might be null
      const html = post.content 
        ? generateHTML(post.content as any, extensions)
        : '';

      return {
        ...post,
        html,
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
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.upsert({
        where: { slug: input.slug },
        update: {
          title: input.title,
          content: input.content,
          published: input.published,
        },
        create: {
          slug: input.slug,
          title: input.title,
          content: input.content,
          published: input.published,
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
});
