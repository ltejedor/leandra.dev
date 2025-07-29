#!/usr/bin/env node

/**
 * Blog Migration Script
 * Converts archived HTML blog posts to the new TipTap JSON format
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Mapping of HTML files to their metadata
const blogPosts = [
  {
    file: 'AI Agents on WhatsApp_ Building Where Your Users Are.html',
    title: 'AI Agents on WhatsApp: Building Where Your Users Are',
    date: '2025-05-21',
    slug: 'ai-agents-on-whatsapp-building-where-your-users-are'
  },
  {
    file: 'Controllable AI Mosaics.html',
    title: 'Controllable AI Mosaics',
    date: '2025-04-04',
    slug: 'controllable-ai-mosaics'
  },
  {
    file: 'Ship AI Apps in Minutes_ A Guide to Replicate, Gradio, Streamlit & More.html',
    title: 'Ship AI Apps in Minutes: A Guide to Replicate, Gradio, Streamlit & More',
    date: '2025-03-19',
    slug: 'ship-ai-apps-in-minutes-guide-to-replicate-gradio-streamlit-more'
  },
  {
    file: 'Generative Tool Design.html',
    title: 'Generative Tool Design',
    date: '2025-02-23',
    slug: 'generative-tool-design'
  },
  {
    file: 'On the Future (of AI).html',
    title: 'On the Future (of AI)',
    date: '2025-02-17',
    slug: 'on-the-future-of-ai'
  },
  {
    file: '2024 Year in Review.html',
    title: '2024 Year in Review',
    date: '2025-01-02',
    slug: '2024-year-in-review'
  },
  {
    file: 'Hackathon Finalist Spotlight_ AI Agents for Disaster Response.html',
    title: 'Hackathon Finalist Spotlight: AI Agents for Disaster Response',
    date: '2024-10-21',
    slug: 'hackathon-ai-agents-for-disaster-response'
  },
  {
    file: 'Using Replicate APIs in Vercel Without Timeouts_ A Guide to Polling.html',
    title: 'Using Replicate APIs in Vercel Without Timeouts: A Guide to Polling',
    date: '2024-07-24',
    slug: 'using-replicate-apis-in-vercel-without-timeouts-guide-to-polling'
  },
  {
    file: 'Launch_ Generative AI for Industrial Designers.html',
    title: 'Launch: Generative AI for Industrial Designers',
    date: '2024-07-05',
    slug: 'launch-generative-ai-for-industrial-designers'
  },
  {
    file: 'How to Build an AI Agent With the OpenAI Assistants API.html',
    title: 'How to Build an AI Agent With the OpenAI Assistants API',
    date: '2024-06-15',
    slug: 'how-to-build-ai-agent-with-openai-assistants-api'
  },
  {
    file: 'Artificial Intelligence as a Creative Collaborator.html',
    title: 'Artificial Intelligence as a Creative Collaborator',
    date: '2024-05-10',
    slug: 'artificial-intelligence-as-creative-collaborator'
  },
  {
    file: '2023 Year in Review.html',
    title: '2023 Year in Review',
    date: '2024-01-02',
    slug: '2023-year-in-review'
  },
  {
    file: '2021 Year in Review.html',
    title: '2021 Year in Review',
    date: '2022-01-02',
    slug: '2021-year-in-review'
  }
];

function extractContentFromHTML(htmlContent) {
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;
  
  // Find the main article content
  let articleContent = document.querySelector('.article.w-richtext');
  
  if (!articleContent) {
    // Fallback: look for other content containers
    articleContent = document.querySelector('.w-richtext') || 
                    document.querySelector('article') ||
                    document.querySelector('.content');
  }
  
  if (!articleContent) {
    console.warn('Could not find article content');
    return null;
  }
  
  return articleContent;
}

function htmlToTipTapJSON(htmlElement) {
  if (!htmlElement) return null;
  
  const content = [];
  
  // Process each child element
  for (const child of htmlElement.children) {
    const nodeType = child.tagName.toLowerCase();
    
    switch (nodeType) {
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        content.push({
          type: 'heading',
          attrs: { level: parseInt(nodeType.charAt(1)) },
          content: [{ type: 'text', text: child.textContent.trim() }]
        });
        break;
        
      case 'p':
        const textContent = child.textContent.trim();
        if (textContent) {
          const marks = [];
          
          // Check for links
          const links = child.querySelectorAll('a');
          const textNodes = [];
          
          if (links.length > 0) {
            // Handle mixed content with links
            let currentText = child.textContent;
            links.forEach(link => {
              const linkText = link.textContent;
              const href = link.getAttribute('href');
              
              if (href && linkText) {
                const beforeLink = currentText.split(linkText)[0];
                if (beforeLink) {
                  textNodes.push({ type: 'text', text: beforeLink });
                }
                textNodes.push({
                  type: 'text',
                  text: linkText,
                  marks: [{ type: 'link', attrs: { href } }]
                });
                currentText = currentText.substring(beforeLink.length + linkText.length);
              }
            });
            
            if (currentText) {
              textNodes.push({ type: 'text', text: currentText });
            }
          } else {
            textNodes.push({ type: 'text', text: textContent });
          }
          
          content.push({
            type: 'paragraph',
            content: textNodes
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
        
        content.push({
          type: 'bulletList',
          content: listItems
        });
        break;
        
      case 'ol':
        const orderedListItems = Array.from(child.querySelectorAll('li')).map(li => ({
          type: 'listItem',
          content: [{
            type: 'paragraph',
            content: [{ type: 'text', text: li.textContent.trim() }]
          }]
        }));
        
        content.push({
          type: 'orderedList',
          content: orderedListItems
        });
        break;
        
      case 'figure':
        const img = child.querySelector('img');
        const figcaption = child.querySelector('figcaption');
        
        if (img) {
          const src = img.getAttribute('src');
          const alt = img.getAttribute('alt') || figcaption?.textContent || '';
          
          content.push({
            type: 'image',
            attrs: {
              src: src,
              alt: alt,
              title: alt
            }
          });
          
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
        
      case 'img':
        const src = child.getAttribute('src');
        const alt = child.getAttribute('alt') || '';
        
        content.push({
          type: 'image',
          attrs: {
            src: src,
            alt: alt,
            title: alt
          }
        });
        break;
        
      case 'blockquote':
        content.push({
          type: 'blockquote',
          content: [{
            type: 'paragraph',
            content: [{ type: 'text', text: child.textContent.trim() }]
          }]
        });
        break;
        
      case 'pre':
      case 'code':
        content.push({
          type: 'codeBlock',
          content: [{ type: 'text', text: child.textContent }]
        });
        break;
        
      default:
        // For other elements, just extract text content
        const text = child.textContent.trim();
        if (text) {
          content.push({
            type: 'paragraph',
            content: [{ type: 'text', text }]
          });
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
    console.warn(`File not found: ${postInfo.file}`);
    return;
  }
  
  console.log(`Processing: ${postInfo.title}`);
  
  try {
    const htmlContent = fs.readFileSync(filePath, 'utf-8');
    const articleElement = extractContentFromHTML(htmlContent);
    
    if (!articleElement) {
      console.warn(`Could not extract content from: ${postInfo.file}`);
      return;
    }
    
    const tipTapContent = htmlToTipTapJSON(articleElement);
    
    if (!tipTapContent) {
      console.warn(`Could not convert content to TipTap JSON: ${postInfo.file}`);
      return;
    }
    
    // Create or update the post in the database
    await prisma.post.upsert({
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
    
    console.log(`✅ Successfully migrated: ${postInfo.title}`);
    
  } catch (error) {
    console.error(`❌ Error processing ${postInfo.file}:`, error);
  }
}

async function main() {
  console.log('Starting blog migration...\n');
  
  for (const postInfo of blogPosts) {
    await migrateBlogPost(postInfo);
  }
  
  console.log('\n🎉 Blog migration completed!');
  
  // Display summary
  const totalPosts = await prisma.post.count();
  const publishedPosts = await prisma.post.count({ where: { published: true } });
  
  console.log(`\nSummary:`);
  console.log(`- Total posts: ${totalPosts}`);
  console.log(`- Published posts: ${publishedPosts}`);
}

main()
  .catch((e) => {
    console.error('Migration failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });