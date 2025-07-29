#!/usr/bin/env node

/**
 * Add Tags to Blog Posts Script
 * Adds relevant tags to existing blog posts based on their content and titles
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Define tags for each post based on content analysis
// Only using: Build in Public, Tutorials, Adventure, Talk
const postTags = {
  'ai-agents-on-whatsapp-building-where-your-users-are': ['Tutorials'],
  'controllable-ai-mosaics': ['Build in Public'],
  'ship-ai-apps-in-minutes-guide-to-replicate-gradio-streamlit-more': ['Tutorials'],
  'generative-tool-design': [],
  'on-the-future-of-ai': ['Talk'],
  '2024-year-in-review': ['Adventure'],
  'hackathon-ai-agents-for-disaster-response': ['Adventure'],
  'using-replicate-apis-in-vercel-without-timeouts-guide-to-polling': ['Tutorials'],
  'launch-generative-ai-for-industrial-designers': ['Build in Public'],
  'how-to-build-ai-agent-with-openai-assistants-api': ['Tutorials'],
  'artificial-intelligence-as-creative-collaborator': [],
  '2023-year-in-review': ['Adventure'],
  '2021-year-in-review': ['Adventure']
};

/**
 * @param {string} slug
 * @param {string[]} tags
 */
async function addTagsToPost(slug, tags) {
  try {
    const post = await prisma.post.findUnique({
      where: { slug }
    });

    if (!post) {
      console.warn(`❌ Post not found: ${slug}`);
      return;
    }

    await prisma.post.update({
      where: { slug },
      data: { tags }
    });

    console.log(`✅ Added tags to "${post.title}": ${tags.join(', ')}`);
  } catch (error) {
    console.error(`❌ Error adding tags to ${slug}:`, error.message);
  }
}

async function main() {
  console.log('🚀 Starting to add tags to blog posts...\n');

  try {
    for (const [slug, tags] of Object.entries(postTags)) {
      await addTagsToPost(slug, tags);
    }

    console.log('\n🎉 Tags added to all blog posts!');

    // Display summary
    const allTags = [...new Set(Object.values(postTags).flat())].sort();
    const postsWithTags = await prisma.post.count({
      where: {
        tags: { isEmpty: false },
        published: true
      }
    });

    console.log(`\n📊 Summary:`);
    console.log(`- Posts with tags: ${postsWithTags}`);
    console.log(`- Unique tags: ${allTags.length}`);
    console.log(`- All tags: ${allTags.join(', ')}`);

  } catch (error) {
    console.error('❌ Failed to add tags:', error);
    process.exit(1);
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });