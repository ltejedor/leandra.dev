#!/usr/bin/env node

/**
 * Enhanced Blog Content Script
 * Improves the TipTap JSON content with better formatting, links, and images
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function processTextWithLinks(element) {
  const result = [];
  const walker = element.ownerDocument.createTreeWalker(
    element,
    element.ownerDocument.defaultView.NodeFilter.SHOW_TEXT | element.ownerDocument.defaultView.NodeFilter.SHOW_ELEMENT,
    null,
    false
  );

  let node;
  let currentText = '';
  
  while (node = walker.nextNode()) {
    if (node.nodeType === 3) { // Text node
      currentText += node.textContent;
    } else if (node.tagName === 'A') {
      // Add any preceding text
      if (currentText.trim()) {
        result.push({ type: 'text', text: currentText.trim() });
        currentText = '';
      }
      
      // Add the link
      const href = node.getAttribute('href');
      const linkText = node.textContent.trim();
      if (href && linkText) {
        result.push({
          type: 'text',
          text: linkText,
          marks: [{ type: 'link', attrs: { href: href } }]
        });
      }
    } else if (node.tagName === 'EM' || node.tagName === 'I') {
      // Add any preceding text
      if (currentText.trim()) {
        result.push({ type: 'text', text: currentText.trim() });
        currentText = '';
      }
      
      const italicText = node.textContent.trim();
      if (italicText) {
        result.push({
          type: 'text',
          text: italicText,
          marks: [{ type: 'italic' }]
        });
      }
    } else if (node.tagName === 'STRONG' || node.tagName === 'B') {
      // Add any preceding text
      if (currentText.trim()) {
        result.push({ type: 'text', text: currentText.trim() });
        currentText = '';
      }
      
      const boldText = node.textContent.trim();
      if (boldText) {
        result.push({
          type: 'text',
          text: boldText,
          marks: [{ type: 'bold' }]
        });
      }
    }
  }
  
  // Add any remaining text
  if (currentText.trim()) {
    result.push({ type: 'text', text: currentText.trim() });
  }
  
  // Only return non-empty text nodes
  const filteredResult = result.filter(item => item.text && item.text.trim());
  
  // If no valid text found, try to get the element's text content as fallback
  if (filteredResult.length === 0) {
    const fallbackText = element.textContent.trim();
    if (fallbackText) {
      return [{ type: 'text', text: fallbackText }];
    }
  }
  
  return filteredResult;
}

function enhancedHtmlToTipTapJSON(htmlContent) {
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;
  
  // Find the article content
  const articleElement = document.querySelector('.article.w-richtext');
  
  if (!articleElement) {
    return null;
  }

  const content = [];
  
  // Process each child element
  for (const child of articleElement.children) {
    const tagName = child.tagName.toLowerCase();
    const textContent = child.textContent.trim();
    
    if (!textContent && tagName !== 'figure') continue;
    
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
        const textNodes = processTextWithLinks(child);
        // Only add paragraph if it has valid content
        if (textNodes.length > 0 && textNodes.some(node => node.text && node.text.trim())) {
          content.push({
            type: 'paragraph',
            content: textNodes
          });
        }
        break;
        
      case 'ul':
        const listItems = Array.from(child.querySelectorAll('li')).map(li => {
          const itemContent = processTextWithLinks(li);
          return {
            type: 'listItem',
            content: [{
              type: 'paragraph',
              content: itemContent
            }]
          };
        });
        
        if (listItems.length > 0) {
          content.push({
            type: 'bulletList',
            content: listItems
          });
        }
        break;
        
      case 'ol':
        const orderedItems = Array.from(child.querySelectorAll('li')).map(li => {
          const itemContent = processTextWithLinks(li);
          return {
            type: 'listItem',
            content: [{
              type: 'paragraph',
              content: itemContent
            }]
          };
        });
        
        if (orderedItems.length > 0) {
          content.push({
            type: 'orderedList',
            content: orderedItems
          });
        }
        break;
        
      case 'figure':
        const img = child.querySelector('img');
        const figcaption = child.querySelector('figcaption');
        const iframe = child.querySelector('iframe');
        
        if (img) {
          let src = img.getAttribute('src');
          const alt = img.getAttribute('alt') || figcaption?.textContent || '';
          
          // Convert relative URLs to absolute URLs if needed
          if (src && src.startsWith('./')) {
            src = src.replace('./', '/images/blog/');
          }
          
          content.push({
            type: 'image',
            attrs: {
              src: src,
              alt: alt,
              title: alt
            }
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
        } else if (iframe) {
          // Handle embedded videos
          const title = iframe.getAttribute('title') || 'Embedded Video';
          content.push({
            type: 'paragraph',
            content: [{
              type: 'text',
              text: `[Video: ${title}]`,
              marks: [{ type: 'italic' }]
            }]
          });
        }
        break;
        
      case 'blockquote':
        const quoteContent = processTextWithLinks(child);
        content.push({
          type: 'blockquote',
          content: [{
            type: 'paragraph',
            content: quoteContent
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
        
      case 'div':
        // Handle special div elements like embedded content
        if (child.classList.contains('w-embed')) {
          // Skip embedded content for now
          continue;
        }
        
        // For other divs, process as paragraph if they have text content
        if (textContent) {
          const divContent = processTextWithLinks(child);
          content.push({
            type: 'paragraph',
            content: divContent
          });
        }
        break;
        
      default:
        // For other elements, just extract text content
        if (textContent) {
          const defaultContent = processTextWithLinks(child);
          content.push({
            type: 'paragraph',
            content: defaultContent
          });
        }
    }
  }
  
  return {
    type: 'doc',
    content: content
  };
}

async function enhancePost(slug) {
  console.log(`🔧 Enhancing: ${slug}`);
  
  // Find the corresponding HTML file
  const blogPosts = [
    { slug: 'ai-agents-on-whatsapp-building-where-your-users-are', file: 'AI Agents on WhatsApp_ Building Where Your Users Are.html' },
    { slug: 'controllable-ai-mosaics', file: 'Controllable AI Mosaics.html' },
    { slug: 'ship-ai-apps-in-minutes-guide-to-replicate-gradio-streamlit-more', file: 'Ship AI Apps in Minutes_ A Guide to Replicate, Gradio, Streamlit & More.html' },
    { slug: 'generative-tool-design', file: 'Generative Tool Design.html' },
    { slug: 'on-the-future-of-ai', file: 'On the Future (of AI).html' },
    { slug: '2024-year-in-review', file: '2024 Year in Review.html' },
    { slug: 'hackathon-ai-agents-for-disaster-response', file: 'Hackathon Finalist Spotlight_ AI Agents for Disaster Response.html' },
    { slug: 'using-replicate-apis-in-vercel-without-timeouts-guide-to-polling', file: 'Using Replicate APIs in Vercel Without Timeouts_ A Guide to Polling.html' },
    { slug: 'launch-generative-ai-for-industrial-designers', file: 'Launch_ Generative AI for Industrial Designers.html' },
    { slug: 'how-to-build-ai-agent-with-openai-assistants-api', file: 'How to Build an AI Agent With the OpenAI Assistants API.html' },
    { slug: 'artificial-intelligence-as-creative-collaborator', file: 'Artificial Intelligence as a Creative Collaborator.html' },
    { slug: '2023-year-in-review', file: '2023 Year in Review.html' },
    { slug: '2021-year-in-review', file: '2021 Year in Review.html' }
  ];
  
  const postInfo = blogPosts.find(p => p.slug === slug);
  if (!postInfo) {
    console.warn(`❌ No HTML file found for slug: ${slug}`);
    return;
  }
  
  const filePath = path.join(__dirname, '..', 'blogs_archive', postInfo.file);
  
  if (!fs.existsSync(filePath)) {
    console.warn(`❌ File not found: ${postInfo.file}`);
    return;
  }
  
  try {
    const htmlContent = fs.readFileSync(filePath, 'utf-8');
    const enhancedContent = enhancedHtmlToTipTapJSON(htmlContent);
    
    if (!enhancedContent) {
      console.warn(`❌ Could not extract content from: ${postInfo.file}`);
      return;
    }
    
    // Update the post in the database
    await prisma.post.update({
      where: { slug: slug },
      data: { content: enhancedContent }
    });
    
    console.log(`✅ Enhanced: ${slug}`);
    
  } catch (error) {
    console.error(`❌ Error enhancing ${slug}:`, error.message);
  }
}

async function main() {
  console.log('🚀 Starting blog content enhancement...\n');
  
  try {
    // Get all published posts
    const posts = await prisma.post.findMany({
      where: { published: true },
      select: { slug: true, title: true }
    });
    
    console.log(`Found ${posts.length} posts to enhance\n`);
    
    for (const post of posts) {
      await enhancePost(post.slug);
    }
    
    console.log('\n🎉 Blog content enhancement completed!');
    
  } catch (error) {
    console.error('❌ Enhancement failed:', error);
    process.exit(1);
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });