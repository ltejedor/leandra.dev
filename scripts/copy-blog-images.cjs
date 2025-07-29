#!/usr/bin/env node

/**
 * Copy Blog Images Script
 * Copies images from archived blog files to public directory
 */

const fs = require('fs');
const path = require('path');

function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function main() {
  console.log('📸 Copying blog images...\n');
  
  const archiveDir = path.join(__dirname, '..', 'blogs_archive');
  const publicDir = path.join(__dirname, '..', 'public', 'images', 'blog');
  
  // Create the public images directory if it doesn't exist
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Find all _files directories in the archive
  const entries = fs.readdirSync(archiveDir, { withFileTypes: true });
  
  let copiedCount = 0;
  
  for (const entry of entries) {
    if (entry.isDirectory() && entry.name.endsWith('_files')) {
      const srcPath = path.join(archiveDir, entry.name);
      const destPath = path.join(publicDir, entry.name);
      
      console.log(`📁 Copying: ${entry.name}`);
      
      try {
        copyDirectory(srcPath, destPath);
        copiedCount++;
        console.log(`✅ Copied: ${entry.name}`);
      } catch (error) {
        console.error(`❌ Error copying ${entry.name}:`, error.message);
      }
    }
  }
  
  console.log(`\n🎉 Copied ${copiedCount} image directories to public/images/blog/`);
  console.log('\nNote: You may need to update image paths in your blog posts to reference these new locations.');
}

main();