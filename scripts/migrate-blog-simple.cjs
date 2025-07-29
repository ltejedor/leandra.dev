#!/usr/bin/env node

/**
 * Simple Blog Migration Script
 * Converts archived HTML blog posts to TipTap JSON format
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Blog posts to migrate with their metadata
const blogPosts = [
  {
    file: 'AI Agents on WhatsApp_ Building Where Your Users Are.html',
    title: 'AI Agents on WhatsApp: Building Where Your Users Are',
    date: '2025-05-21',
    slug: 'ai-agents-on-whatsapp-building-where-your-users-are',
    description: 'Guide to building AI Agents in WhatsApp. How to both build quickly with an open-source MCP server and implement agents with Meta\'s official WhatsApp Cloud API.'
  },
  {
    file: 'Controllable AI Mosaics.html',
    title: 'Controllable AI Mosaics',
    date: '2025-04-04',
    slug: 'controllable-ai-mosaics',
    description: 'Experiments, thoughts, and an initial demo around controllable and human-creativity-centered AI art creation.'
  },
  {
    file: 'Ship AI Apps in Minutes_ A Guide to Replicate, Gradio, Streamlit & More.html',
    title: 'Ship AI Apps in Minutes: A Guide to Replicate, Gradio, Streamlit & More',
    date: '2025-03-19',
    slug: 'ship-ai-apps-in-minutes-guide-to-replicate-gradio-streamlit-more',
    description: 'Build functioning AI prototypes in minutes instead of days with this practical toolkit for rapid deployment.'
  },
  {
    file: 'Generative Tool Design.html',
    title: 'Generative Tool Design',
    date: '2025-02-23',
    slug: 'generative-tool-design',
    description: 'AI-driven generative design is transforming tool creation and optimizing them for real-world tasks. This post explores methods for generating articulated objects, refining designs through physical iteration, and automating robotic tool creation.'
  },
  {
    file: 'On the Future (of AI).html',
    title: 'On the Future (of AI)',
    date: '2025-02-17',
    slug: 'on-the-future-of-ai',
    description: 'Reflecting on AI\'s rapid evolution during my time at MIT, I share insights on navigating its future: look beneath the surface noise at the slower current of fundamental research and study how previous technological breakthroughs unfolded.'
  },
  {
    file: '2024 Year in Review.html',
    title: '2024 Year in Review',
    date: '2025-01-02',
    slug: '2024-year-in-review',
    description: 'My 2024 was filled with meaningful projects, incredible people, and adventures across the globe.'
  },
  {
    file: 'Hackathon Finalist Spotlight_ AI Agents for Disaster Response.html',
    title: 'Hackathon Finalist Spotlight: AI Agents for Disaster Response',
    date: '2024-10-21',
    slug: 'hackathon-ai-agents-for-disaster-response',
    description: 'This past weekend our team became finalists in the ETHGlobal SF Hackathon (10 teams chosen out of 239) by building decentralized agents which monitor and respond to disasters.'
  },
  {
    file: 'Using Replicate APIs in Vercel Without Timeouts_ A Guide to Polling.html',
    title: 'Using Replicate APIs in Vercel Without Timeouts: A Guide to Polling',
    date: '2024-07-24',
    slug: 'using-replicate-apis-in-vercel-without-timeouts-guide-to-polling',
    description: 'Learn how to harness Replicate APIs in Vercel without timeouts using a simple polling technique with Next.js and the T3 stack.'
  },
  {
    file: 'Launch_ Generative AI for Industrial Designers.html',
    title: 'Launch: Generative AI for Industrial Designers',
    date: '2024-07-05',
    slug: 'launch-generative-ai-for-industrial-designers',
    description: 'Inspired by real workflow challenges faced by industrial designers, I built ID AI: a suite of four specialized generative AI tools that streamline moodboard creation, seamless texture generation, photorealistic rendering, and material visualization.'
  },
  {
    file: 'How to Build an AI Agent With the OpenAI Assistants API.html',
    title: 'How to Build an AI Agent With the OpenAI Assistants API',
    date: '2024-06-15',
    slug: 'how-to-build-ai-agent-with-openai-assistants-api',
    description: 'A comprehensive guide to building AI agents using OpenAI\'s Assistants API, covering setup, implementation, and best practices.'
  },
  {
    file: 'Artificial Intelligence as a Creative Collaborator.html',
    title: 'Artificial Intelligence as a Creative Collaborator',
    date: '2024-05-10',
    slug: 'artificial-intelligence-as-creative-collaborator',
    description: 'Exploring how AI can serve as a creative partner rather than a replacement, enhancing human creativity and opening new possibilities for artistic expression.'
  },
  {
    file: '2023 Year in Review.html',
    title: '2023 Year in Review',
    date: '2024-01-02',
    slug: '2023-year-in-review',
    description: 'Reflecting on the achievements, challenges, and growth of 2023.'
  },
  {
    file: '2021 Year in Review.html',
    title: '2021 Year in Review',
    date: '2022-01-02',
    slug: '2021-year-in-review',
    description: 'Looking back at the pivotal moments and learnings of 2021.'
  }
];

function createSimpleTipTapContent(title, description, htmlContent) {
  // Create a basic TipTap document structure
  const content = [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: description
        }
      ]
    }
  ];

  // Parse the HTML to extract main content
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;
  
  // Find the article content
  const articleElement = document.querySelector('.article.w-richtext');
  
  if (articleElement) {
    // Process each child element
    for (const child of articleElement.children) {
      const tagName = child.tagName.toLowerCase();
      const textContent = child.textContent.trim();
      
      if (!textContent) continue;
      
      switch (tagName) {
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
          content.push({
            type: 'heading',
            attrs: { level: parseInt(tagName.charAt(1)) },
            content: [{ type: 'text', text: textContent }]
          });
          break;
          
        case 'p':
          // Handle paragraphs with potential links
          const links = child.querySelectorAll('a');
          if (links.length > 0) {
            // For now, just add as plain text - we can enhance this later
            content.push({
              type: 'paragraph',
              content: [{ type: 'text', text: textContent }]
            });
          } else {
            content.push({
              type: 'paragraph',
              content: [{ type: 'text', text: textContent }]
            });
          }
          break;
          
        case 'ul':
          const listItems = Array.from(child.querySelectorAll('li')).map(li => ({
            type: 'listItem',
            content: [{
              type: 'paragraph',
              content: [{ type: 'text', text: li.textContent.trim() }]
            }]
          }));
          
          if (listItems.length > 0) {
            content.push({
              type: 'bulletList',
              content: listItems
            });
          }
          break;
          
        case 'ol':
          const orderedItems = Array.from(child.querySelectorAll('li')).map(li => ({
            type: 'listItem',
            content: [{
              type: 'paragraph',
              content: [{ type: 'text', text: li.textContent.trim() }]
            }]
          }));
          
          if (orderedItems.length > 0) {
            content.push({
              type: 'orderedList',
              content: orderedItems
            });
          }
          break;
          
        case 'figure':
          // Handle images
          const img = child.querySelector('img');
          const figcaption = child.querySelector('figcaption');
          
          if (img) {
            const src = img.getAttribute('src');
            const alt = img.getAttribute('alt') || figcaption?.textContent || '';
            
            // Add image
            content.push({
              type: 'paragraph',
              content: [{
                type: 'text',
                text: `[Image: ${alt}]`
              }]
            });
            
            // Add caption if exists
            if (figcaption && figcaption.textContent.trim()) {
              content.push({
                type: 'paragraph',
                content: [{
                  type: 'text',
                  text: figcaption.textContent.trim(),
                  marks: [{ type: 'italic' }]
                }]
              });
            }
          }
          break;
          
        default:
          // For other elements, just add as paragraph
          if (textContent) {
            content.push({
              type: 'paragraph',
              content: [{ type: 'text', text: textContent }]
            });
          }
      }
    }
  }

  return {
    type: 'doc',
    content: content
  };
}

async function migrateBlogPost(postInfo) {
  const filePath = path.join(__dirname, '..', 'blogs_archive', postInfo.file);
  
  if (!fs.existsSync(filePath)) {
    console.warn(`❌ File not found: ${postInfo.file}`);
    return;
  }
  
  console.log(`📝 Processing: ${postInfo.title}`);
  
  try {
    const htmlContent = fs.readFileSync(filePath, 'utf-8');
    const tipTapContent = createSimpleTipTapContent(postInfo.title, postInfo.description, htmlContent);
    
    // Create or update the post in the database
    const result = await prisma.post.upsert({
      where: { slug: postInfo.slug },
      update: {
        title: postInfo.title,
        content: tipTapContent,
        published: true,
        createdAt: new Date(postInfo.date)
      },
      create: {
        slug: postInfo.slug,
        title: postInfo.title,
        content: tipTapContent,
        published: true,
        createdAt: new Date(postInfo.date)
      }
    });
    
    console.log(`✅ Successfully migrated: ${postInfo.title} (ID: ${result.id})`);
    
  } catch (error) {
    console.error(`❌ Error processing ${postInfo.file}:`, error.message);
  }
}

async function main() {
  console.log('🚀 Starting blog migration...\n');
  
  try {
    for (const postInfo of blogPosts) {
      await migrateBlogPost(postInfo);
    }
    
    console.log('\n🎉 Blog migration completed!');
    
    // Display summary
    const totalPosts = await prisma.post.count();
    const publishedPosts = await prisma.post.count({ where: { published: true } });
    
    console.log(`\n📊 Summary:`);
    console.log(`- Total posts: ${totalPosts}`);
    console.log(`- Published posts: ${publishedPosts}`);
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });