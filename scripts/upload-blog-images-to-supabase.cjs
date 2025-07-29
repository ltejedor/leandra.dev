#!/usr/bin/env node

/**
 * Upload Blog Images to Supabase Script
 * Uploads all blog images to Supabase storage and updates post content
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const { PrismaClient } = require('@prisma/client');
const { JSDOM } = require('jsdom');

const prisma = new PrismaClient();

// Create Supabase admin client
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Mapping of blog posts to their image directories
const blogPostImageMapping = {
  'ai-agents-on-whatsapp-building-where-your-users-are': 'AI Agents on WhatsApp_ Building Where Your Users Are_files',
  'controllable-ai-mosaics': 'Controllable AI Mosaics_files',
  'ship-ai-apps-in-minutes-guide-to-replicate-gradio-streamlit-more': 'Ship AI Apps in Minutes_ A Guide to Replicate, Gradio, Streamlit & More_files',
  'generative-tool-design': 'Generative Tool Design_files',
  'on-the-future-of-ai': 'On the Future (of AI)_files',
  '2024-year-in-review': '2024 Year in Review_files',
  'hackathon-ai-agents-for-disaster-response': 'Hackathon Finalist Spotlight_ AI Agents for Disaster Response_files',
  'using-replicate-apis-in-vercel-without-timeouts-guide-to-polling': 'Using Replicate APIs in Vercel Without Timeouts_ A Guide to Polling_files',
  'launch-generative-ai-for-industrial-designers': 'Launch_ Generative AI for Industrial Designers_files',
  'how-to-build-ai-agent-with-openai-assistants-api': 'How to Build an AI Agent With the OpenAI Assistants API_files',
  'artificial-intelligence-as-creative-collaborator': 'Artificial Intelligence as a Creative Collaborator_files',
  '2023-year-in-review': '2023 Year in Review_files',
  '2021-year-in-review': '2021 Year in Review_files'
};

async function uploadImageToSupabase(filePath, fileName, postSlug) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const fileExt = path.extname(fileName).toLowerCase();
    
    // Skip non-image files
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    if (!imageExtensions.includes(fileExt)) {
      return null;
    }
    
    // Sanitize filename to remove invalid characters
    const sanitizedFileName = fileName
      .replace(/[^a-zA-Z0-9.-]/g, '_') // Replace invalid chars with underscore
      .replace(/_+/g, '_') // Replace multiple underscores with single
      .replace(/^_|_$/g, ''); // Remove leading/trailing underscores
    
    // Create a unique filename with post slug prefix
    const uniqueFileName = `${postSlug}/${sanitizedFileName}`;
    
    console.log(`  📤 Uploading: ${fileName}`);
    
    // Upload to Supabase
    const { data, error } = await supabaseAdmin.storage
      .from('blog-images')
      .upload(`public/${uniqueFileName}`, fileBuffer, {
        cacheControl: '3600',
        upsert: true, // Allow overwriting
        contentType: getContentType(fileExt)
      });

    if (error) {
      console.error(`    ❌ Upload failed for ${fileName}:`, error.message);
      return null;
    }

    // Get public URL
    const { data: urlData } = supabaseAdmin.storage
      .from('blog-images')
      .getPublicUrl(`public/${uniqueFileName}`);

    if (!urlData?.publicUrl) {
      console.error(`    ❌ Failed to get public URL for ${fileName}`);
      return null;
    }

    console.log(`    ✅ Uploaded: ${fileName}`);
    return {
      originalPath: fileName,
      sanitizedPath: sanitizedFileName,
      publicUrl: urlData.publicUrl
    };

  } catch (error) {
    console.error(`    ❌ Error uploading ${fileName}:`, error.message);
    return null;
  }
}

function getContentType(extension) {
  const contentTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml'
  };
  return contentTypes[extension] || 'application/octet-stream';
}

async function uploadImagesForPost(postSlug) {
  const imageDir = blogPostImageMapping[postSlug];
  if (!imageDir) {
    console.log(`  ⚠️  No image directory found for: ${postSlug}`);
    return {};
  }

  const imageDirPath = path.join(__dirname, '..', 'blogs_archive', imageDir);
  
  if (!fs.existsSync(imageDirPath)) {
    console.log(`  ⚠️  Image directory not found: ${imageDir}`);
    return {};
  }

  console.log(`  📁 Processing images from: ${imageDir}`);
  
  const files = fs.readdirSync(imageDirPath);
  const imageUrlMap = {};
  
  for (const file of files) {
    const filePath = path.join(imageDirPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isFile()) {
      const result = await uploadImageToSupabase(filePath, file, postSlug);
      if (result) {
        imageUrlMap[result.originalPath] = result.publicUrl;
        imageUrlMap[result.sanitizedPath] = result.publicUrl;
      }
    }
  }
  
  return imageUrlMap;
}

function updateTipTapContentWithImages(content, imageUrlMap, originalHtml) {
  if (!content || !content.content) return content;
  
  // Recursively update content nodes
  function updateNode(node) {
    if (node.type === 'image' && node.attrs && node.attrs.src) {
      const originalSrc = node.attrs.src;
      
      // Check if this is a local image path that needs updating
      if (originalSrc.startsWith('/images/blog/')) {
        // Extract the filename from the path
        const fileName = path.basename(originalSrc);
        
        // Look for the corresponding Supabase URL
        if (imageUrlMap[fileName]) {
          node.attrs.src = imageUrlMap[fileName];
          console.log(`    🔄 Updated image: ${fileName} -> ${imageUrlMap[fileName]}`);
        } else {
          // Try to find by sanitized filename
          const sanitizedFileName = fileName
            .replace(/[^a-zA-Z0-9.-]/g, '_')
            .replace(/_+/g, '_')
            .replace(/^_|_$/g, '');
          
          if (imageUrlMap[sanitizedFileName]) {
            node.attrs.src = imageUrlMap[sanitizedFileName];
            console.log(`    🔄 Updated image (sanitized): ${fileName} -> ${imageUrlMap[sanitizedFileName]}`);
          }
        }
      }
    }
    
    if (node.content && Array.isArray(node.content)) {
      node.content.forEach(updateNode);
    }
    
    return node;
  }
  
  const updatedContent = { ...content };
  updatedContent.content = updatedContent.content.map(updateNode);
  
  return updatedContent;
}

async function processPost(postSlug) {
  console.log(`\n🔄 Processing: ${postSlug}`);
  
  try {
    // Get the post from database
    const post = await prisma.post.findUnique({
      where: { slug: postSlug }
    });
    
    if (!post) {
      console.log(`  ❌ Post not found: ${postSlug}`);
      return;
    }
    
    // Upload images for this post
    const imageUrlMap = await uploadImagesForPost(postSlug);
    
    if (Object.keys(imageUrlMap).length === 0) {
      console.log(`  ℹ️  No images to process for: ${postSlug}`);
      return;
    }
    
    // Get original HTML to help with image mapping
    const htmlFile = Object.entries(blogPostImageMapping).find(([slug]) => slug === postSlug)?.[1];
    let originalHtml = '';
    
    if (htmlFile) {
      const htmlPath = path.join(__dirname, '..', 'blogs_archive', htmlFile.replace('_files', '.html'));
      if (fs.existsSync(htmlPath)) {
        originalHtml = fs.readFileSync(htmlPath, 'utf-8');
      }
    }
    
    // Update post content with new image URLs
    const updatedContent = updateTipTapContentWithImages(post.content, imageUrlMap, originalHtml);
    
    // Update the post in database
    await prisma.post.update({
      where: { slug: postSlug },
      data: { content: updatedContent }
    });
    
    console.log(`  ✅ Updated post with ${Object.keys(imageUrlMap).length} images`);
    
  } catch (error) {
    console.error(`  ❌ Error processing ${postSlug}:`, error.message);
  }
}

async function main() {
  console.log('🚀 Starting blog image upload to Supabase...\n');
  
  try {
    // Test Supabase connection
    const { data: buckets, error: bucketsError } = await supabaseAdmin.storage.listBuckets();
    
    if (bucketsError) {
      console.error('❌ Failed to connect to Supabase:', bucketsError.message);
      process.exit(1);
    }
    
    const blogImagesBucket = buckets.find(bucket => bucket.name === 'blog-images');
    if (!blogImagesBucket) {
      console.error('❌ blog-images bucket not found in Supabase');
      console.log('Available buckets:', buckets.map(b => b.name).join(', '));
      process.exit(1);
    }
    
    console.log('✅ Connected to Supabase storage');
    console.log(`📦 Using bucket: ${blogImagesBucket.name}\n`);
    
    // Process each blog post
    const postSlugs = Object.keys(blogPostImageMapping);
    
    for (const postSlug of postSlugs) {
      await processPost(postSlug);
    }
    
    console.log('\n🎉 Blog image upload completed!');
    
    // Summary
    const { data: files } = await supabaseAdmin.storage
      .from('blog-images')
      .list('public', { limit: 1000 });
    
    console.log(`\n📊 Summary:`);
    console.log(`- Total files in blog-images bucket: ${files?.length || 0}`);
    console.log(`- Processed ${postSlugs.length} blog posts`);
    
  } catch (error) {
    console.error('❌ Upload failed:', error);
    process.exit(1);
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });