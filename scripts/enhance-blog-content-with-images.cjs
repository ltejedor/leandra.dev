#!/usr/bin/env node

/**
 * Enhanced Blog Content Migration with Proper Image Handling
 * Converts HTML content to TipTap JSON with proper image nodes
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Blog posts mapping
const blogPosts = [
  {
    slug: 'ai-agents-on-whatsapp-building-where-your-users-are',
    file: 'AI Agents on WhatsApp_ Building Where Your Users Are.html'
  },
  {
    slug: 'controllable-ai-mosaics',
    file: 'Controllable AI Mosaics.html'
  },
  {
    slug: 'ship-ai-apps-in-minutes-guide-to-replicate-gradio-streamlit-more',
    file: 'Ship AI Apps in Minutes_ A Guide to Replicate, Gradio, Streamlit & More.html'
  },
  {
    slug: 'generative-tool-design',
    file: 'Generative Tool Design.html'
  },
  {
    slug: 'on-the-future-of-ai',
    file: 'On the Future (of AI).html'
  },
  {
    slug: '2024-year-in-review',
    file: '2024 Year in Review.html'
  },
  {
    slug: 'hackathon-ai-agents-for-disaster-response',
    file: 'Hackathon Finalist Spotlight_ AI Agents for Disaster Response.html'
  },
  {
    slug: 'using-replicate-apis-in-vercel-without-timeouts-guide-to-polling',
    file: 'Using Replicate APIs in Vercel Without Timeouts_ A Guide to Polling.html'
  },
  {
    slug: 'launch-generative-ai-for-industrial-designers',
    file: 'Launch_ Generative AI for Industrial Designers.html'
  },
  {
    slug: 'how-to-build-ai-agent-with-openai-assistants-api',
    file: 'How to Build an AI Agent With the OpenAI Assistants API.html'
  },
  {
    slug: 'artificial-intelligence-as-creative-collaborator',
    file: 'Artificial Intelligence as a Creative Collaborator.html'
  },
  {
    slug: '2023-year-in-review',
    file: '2023 Year in Review.html'
  },
  {
    slug: '2021-year-in-review',
    file: '2021 Year in Review.html'
  }
];

function processTextContent(element) {
  const content = [];
  
  for (const node of element.childNodes) {
    if (node.nodeType === 3) { // Text node
      const text = node.textContent.trim();
      if (text) {
        content.push({
          type: 'text',
          text: text
        });
      }
    } else if (node.nodeType === 1) { // Element node
      const tagName = node.tagName.toLowerCase();
      const text = node.textContent.trim();
      
      if (!text) continue;
      
      switch (tagName) {
        case 'strong':
        case 'b':
          content.push({
            type: 'text',
            text: text,
            marks: [{ type: 'bold' }]
          });
          break;
        case 'em':
        case 'i':
          content.push({
            type: 'text',
            text: text,
            marks: [{ type: 'italic' }]
          });
          break;
        case 'a':
          const href = node.getAttribute('href');
          content.push({
            type: 'text',
            text: text,
            marks: href ? [{ type: 'link', attrs: { href } }] : []
          });
          break;
        case 'code':
          content.push({
            type: 'text',
            text: text,
            marks: [{ type: 'code' }]
          });
          break;
        default:
          content.push({
            type: 'text',
            text: text
          });
      }
    }
  }
  
  return content;
}

function createEnhancedTipTapContent(htmlContent) {
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;
  
  const content = [];
  
  // Find the article content
  const articleElement = document.querySelector('.article.w-richtext');
  
  if (!articleElement) {
    console.warn('No article content found');
    return {
      type: 'doc',
      content: [{
        type: 'paragraph',
        content: [{ type: 'text', text: 'Content not found' }]
      }]
    };
  }
  
  // Process each child element
  for (const child of articleElement.children) {
    const tagName = child.tagName.toLowerCase();
    
    switch (tagName) {
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        const level = parseInt(tagName.charAt(1));
        const headingContent = processTextContent(child);
        if (headingContent.length > 0) {
          content.push({
            type: 'heading',
            attrs: { level },
            content: headingContent
          });
        }
        break;
        
      case 'p':
        const paragraphContent = processTextContent(child);
        if (paragraphContent.length > 0) {
          content.push({
            type: 'paragraph',
            content: paragraphContent
          });
        }
        break;
        
      case 'ul':
        const listItems = Array.from(child.querySelectorAll('li')).map(li => {
          const itemContent = processTextContent(li);
          return itemContent.length > 0 ? {
            type: 'listItem',
            content: [{
              type: 'paragraph',
              content: itemContent
            }]
          } : null;
        }).filter(Boolean);
        
        if (listItems.length > 0) {
          content.push({
            type: 'bulletList',
            content: listItems
          });
        }
        break;
        
      case 'ol':
        const orderedItems = Array.from(child.querySelectorAll('li')).map(li => {
          const itemContent = processTextContent(li);
          return itemContent.length > 0 ? {
            type: 'listItem',
            content: [{
              type: 'paragraph',
              content: itemContent
            }]
          } : null;
        }).filter(Boolean);
        
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
        
        if (img) {
          const src = img.getAttribute('src');
          const alt = img.getAttribute('alt') || '';
          
          if (src) {
            // Add the image
            content.push({
              type: 'image',
              attrs: {
                src: src,
                alt: alt,
                title: figcaption?.textContent?.trim() || null
              }
            });
            
            // Add caption as separate paragraph if exists
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
        }
        break;
        
      case 'img':
        const src = child.getAttribute('src');
        const alt = child.getAttribute('alt') || '';
        
        if (src) {
          content.push({
            type: 'image',
            attrs: {
              src: src,
              alt: alt,
              title: null
            }
          });
        }
        break;
        
      case 'blockquote':
        const quoteContent = processTextContent(child);
        if (quoteContent.length > 0) {
          content.push({
            type: 'blockquote',
            content: [{
              type: 'paragraph',
              content: quoteContent
            }]
          });
        }
        break;
        
      case 'pre':
        const codeElement = child.querySelector('code');
        const codeText = codeElement ? codeElement.textContent : child.textContent;
        if (codeText.trim()) {
          content.push({
            type: 'codeBlock',
            content: [{
              type: 'text',
              text: codeText.trim()
            }]
          });
        }
        break;
        
      case 'div':
        // Handle embedded content or special divs
        if (child.classList.contains('w-embed')) {
          // Skip embedded content for now, or handle specially
          const embedContent = child.textContent.trim();
          if (embedContent) {
            content.push({
              type: 'paragraph',
              content: [{
                type: 'text',
                text: embedContent
              }]
            });
          }
        } else {
          // Process as regular content
          const divContent = processTextContent(child);
          if (divContent.length > 0) {
            content.push({
              type: 'paragraph',
              content: divContent
            });
          }
        }
        break;
        
      default:
        // For other elements, try to extract text content
        const textContent = child.textContent.trim();
        if (textContent) {
          content.push({
            type: 'paragraph',
            content: [{
              type: 'text',
              text: textContent
            }]
          });
        }
    }
  }
  
  return {
    type: 'doc',
    content: content.length > 0 ? content : [{
      type: 'paragraph',
      content: [{ type: 'text', text: 'No content found' }]
    }]
  };
}

async function enhanceBlogPost(postInfo) {
  const filePath = path.join(__dirname, '..', 'blogs_archive', postInfo.file);
  
  if (!fs.existsSync(filePath)) {
    console.warn(`❌ File not found: ${postInfo.file}`);
    return;
  }
  
  console.log(`🔄 Enhancing: ${postInfo.slug}`);
  
  try {
    const htmlContent = fs.readFileSync(filePath, 'utf-8');
    const enhancedContent = createEnhancedTipTapContent(htmlContent);
    
    // Update the post in database
    await prisma.post.update({
      where: { slug: postInfo.slug },
      data: { content: enhancedContent }
    });
    
    console.log(`✅ Enhanced: ${postInfo.slug} (${enhancedContent.content.length} content blocks)`);
    
  } catch (error) {
    console.error(`❌ Error enhancing ${postInfo.file}:`, error.message);
  }
}

async function main() {
  console.log('🚀 Starting enhanced blog content migration...\n');
  
  try {
    for (const postInfo of blogPosts) {
      await enhanceBlogPost(postInfo);
    }
    
    console.log('\n🎉 Enhanced blog content migration completed!');
    
  } catch (error) {
    console.error('❌ Enhancement failed:', error);
    process.exit(1);
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });