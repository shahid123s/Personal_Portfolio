require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function testUpload() {
  try {
    console.log('Testing Cloudinary config:', cloudinary.config().cloud_name);
    // write a small dummy image
    const base64Image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
    
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: 'portfolio/test',
    });
    console.log('✅ Upload successful:', result.secure_url);
  } catch (error) {
    console.error('❌ Upload failed:', error);
  }
}

testUpload();
