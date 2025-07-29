#!/usr/bin/env node

/**
 * Fix Blog Images and Preview Text Script
 * Fixes missing preview images and improves content extraction
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Blog posts with their metadata and image info
const blogPosts = [
  {
    slug: 'ai-agents-on-whatsapp-building-where-your-users-are',
    file: 'AI Agents on WhatsApp_ Building Where Your Users Are.html',
    previewImage: 'https://cdn.prod.website-files.com/61c4cc1ea790bc571dff495a/682e1a6eb045ba3dbd038bc7_Frame%204.png'
  },
  {
    slug: 'controllable-ai-mosaics',
    file: 'Controllable AI Mosaics.html',
    previewImage: 'https://cdn.prod.website-files.com/61c4cc1ea790bc571dff495a/67f06a3cacc9350b0d2bac68_Frame%203.png'
  },
  {
    slug: 'ship-ai-apps-in-minutes-guide-to-replicate-gradio-streamlit-more',
    file: 'Ship AI Apps in Minutes_ A Guide to Replicate, Gradio, Streamlit & More.html',
    previewImage: 'https://cdn.prod.website-files.com/61c4cc1ea790bc571dff495a/67db337cfdf61cc449b79ca7_deploy-ai-app-thumbnail.png'
  },
  {
    slug: 'generative-tool-design',
    file: 'Generative Tool Design.html',
    previewImage: 'https://cdn.prod.website-files.com/61c4cc1ea790bc571dff495a/67bbc0dbff81f49ddc7a1314_a7e55c19-0a77-4387-8150-1e7bf116478d.jpeg'
  },
  {
    slug: 'on-the-future-of-ai',
    file: 'On the Future (of AI).html',
    previewImage: 'https://cdn.prod.website-files.com/61c4cc1ea790bc571dff495a/67b3adf37b570d750c36f953_Screenshot%202025-02-17%20at%201.45.01%E2%80%AFPM.png'
  },
  {
    slug: '2024-year-in-review',
    file: '2024 Year in Review.html',
    previewImage: 'https://cdn.prod.website-files.com/61c4cc1ea790bc571dff495a/6770154d0cd2fd81418c4ffe_unnamed.jpg'
  },
  {
    slug: 'hackathon-ai-agents-for-disaster-response',
    file: 'Hackathon Finalist Spotlight_ AI Agents for Disaster Response.html',
    previewImage: 'https://cdn.prod.website-files.com/61c4cc1ea790bc571dff495a/6716fbea0cd06acd25219ebe_Screenshot%202024-10-21%20at%206.10.16%E2%80%AFPM.png'
  },
  {
    slug: 'using-replicate-apis-in-vercel-without-timeouts-guide-to-polling',
    file: 'Using Replicate APIs in Vercel Without Timeouts_ A Guide to Polling.html',
    previewImage: 'https://cdn.prod.website-files.com/61c4cc1ea790bc571dff495a/66a0cc4ea5bb416da48d5ed6_replicate-api-polling-interface-example.png'
  },
  {
    slug: 'launch-generative-ai-for-industrial-designers',
    file: 'Launch_ Generative AI for Industrial Designers.html',
    previewImage: 'https://cdn.prod.website-files.com/61c4cc1ea790bc571dff495a/6778303cb02bc934fae878ef_minimalist-speaker.png'
  },
  {
    slug: 'how-to-build-ai-agent-with-openai-assistants-api',
    file: 'How to Build an AI Agent With the OpenAI Assistants API.html',
    previewImage: 'https://cdn.prod.website-files.com/61c4cc1ea790bc571dff495a/65679fc72d22d2725e0a88b7_Screenshot%202023-11-29%20at%203.31.59%E2%80%AFPM.png'
  },
  {
    slug: 'artificial-intelligence-as-creative-collaborator',
    file: 'Artificial Intelligence as a Creative Collaborator.html',
    previewImage: null // Will extract from HTML
  },
  {
    slug: '2023-year-in-review',
    file: '2023 Year in Review.html',
    previewImage: null // Will extract from HTML
  },
  {
    slug: '2021-year-in-review',
    file: '2021 Year in Review.html',
    previewImage: null // Will extract from HTML
  }
];

function extractPreviewImageFromHtml(htmlContent) {
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;
  
  // Try to find og:image meta tag
  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage) {
    return ogImage.getAttribute('content');
  }
  
  // Try to find the hero image
  const heroImage = document.querySelector('.hero-image');
  if (heroImage) {
    return heroImage.getAttribute('src');
  }
  
  // Try to find the first image in the article
  const articleImage = document.querySelector('.article img');
  if (articleImage) {
    return articleImage.getAttribute('src');
  }
  
  return null;
}

function extractExcerptFromHtml(htmlContent) {
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;
  
  // Try to find the description meta tag first
  const description = document.querySelector('meta[name="description"]');
  if (description) {
    return description.getAttribute('content');
  }
  
  // Try to find the intro paragraph
  const introContainer = document.querySelector('.blog-post-intro-contrainer .paragraph');
  if (introContainer) {
    return introContainer.textContent.trim();
  }
  
  // Try to find the first paragraph in the article
  const firstParagraph = document.querySelector('.article p');
  if (firstParagraph) {
    const text = firstParagraph.textContent.trim();
    // Limit to reasonable excerpt length
    return text.length > 200 ? text.substring(0, 200) + '...' : text;
  }
  
  return null;
}

function enhanceTipTapContentWithImages(content, htmlContent) {
  if (!content || !content.content) return content;
  
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;
  
  // Find all images in the original HTML
  const images = Array.from(document.querySelectorAll('.article img, .hero-image, figure img'));
  const imageMap = new Map();
  
  images.forEach((img, index) => {
    const src = img.getAttribute('src');
    const alt = img.getAttribute('alt') || '';
    const figcaption = img.closest('figure')?.querySelector('figcaption')?.textContent?.trim() || '';
    
    if (src) {
      imageMap.set(index, {
        src: src,
        alt: alt,
        caption: figcaption
      });
    }
  });
  
  // Update TipTap content to include actual images instead of placeholder text
  function updateNode(node) {
    if (node.type === 'paragraph' && node.content) {
      // Look for image placeholder text like "[Image: description]"
      const textNode = node.content.find(c => c.type === 'text' && c.text?.includes('[Image:'));
      if (textNode) {
        const imageIndex = node.content.findIndex(c => c === textNode);
        if (imageIndex >= 0 && imageMap.has(imageIndex)) {
          const imageData = imageMap.get(imageIndex);
          
          // Replace with actual image node
          return {
            type: 'image',
            attrs: {
              src: imageData.src,
              alt: imageData.alt,
              title: imageData.caption
            }
          };
        }
      }
    }
    
    if (node.content && Array.isArray(node.content)) {
      node.content = node.content.map(updateNode).filter(Boolean);
    }
    
    return node;
  }
  
  const updatedContent = { ...content };
  updatedContent.content = updatedContent.content.map(updateNode).filter(Boolean);
  
  return updatedContent;
}

async function fixBlogPost(postInfo) {
  const filePath = path.join(__dirname, '..', 'blogs_archive', postInfo.file);
  
  if (!fs.existsSync(filePath)) {
    console.warn(`❌ File not found: ${postInfo.file}`);
    return;
  }
  
  console.log(`🔧 Fixing: ${postInfo.slug}`);
  
  try {
    const htmlContent = fs.readFileSync(filePath, 'utf-8');
    
    // Extract preview image
    let previewImage = postInfo.previewImage;
    if (!previewImage) {
      previewImage = extractPreviewImageFromHtml(htmlContent);
    }
    
    // Extract excerpt
    const excerpt = extractExcerptFromHtml(htmlContent);
    
    // Get current post from database
    const currentPost = await prisma.post.findUnique({
      where: { slug: postInfo.slug }
    });
    
    if (!currentPost) {
      console.warn(`❌ Post not found in database: ${postInfo.slug}`);
      return;
    }
    
    // Enhance TipTap content with proper images
    const enhancedContent = enhanceTipTapContentWithImages(currentPost.content, htmlContent);
    
    // Update the post
    const updateData = {
      content: enhancedContent
    };
    
    if (previewImage) {
      updateData.previewImage = previewImage;
    }
    
    if (excerpt) {
      updateData.excerpt = excerpt;
    }
    
    await prisma.post.update({
      where: { slug: postInfo.slug },
      data: updateData
    });
    
    console.log(`✅ Fixed: ${postInfo.slug}`);
    if (previewImage) console.log(`  📸 Preview image: ${previewImage.substring(0, 60)}...`);
    if (excerpt) console.log(`  📝 Excerpt: ${excerpt.substring(0, 60)}...`);
    
  } catch (error) {
    console.error(`❌ Error fixing ${postInfo.file}:`, error.message);
  }
}

async function main() {
  console.log('🚀 Starting blog image and preview fixes...\n');
  
  try {
    for (const postInfo of blogPosts) {
      await fixBlogPost(postInfo);
    }
    
    console.log('\n🎉 Blog fixes completed!');
    
    // Display summary
    const postsWithImages = await prisma.post.count({ 
      where: { 
        previewImage: { not: null },
        published: true 
      } 
    });
    const postsWithExcerpts = await prisma.post.count({ 
      where: { 
        excerpt: { not: null },
        published: true 
      } 
    });
    
    console.log(`\n📊 Summary:`);
    console.log(`- Posts with preview images: ${postsWithImages}`);
    console.log(`- Posts with excerpts: ${postsWithExcerpts}`);
    
  } catch (error) {
    console.error('❌ Fix failed:', error);
    process.exit(1);
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });