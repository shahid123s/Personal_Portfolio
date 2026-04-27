const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Profile = require('../models/Profile');
const authMiddleware = require('../middleware/auth.middleware');

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'portfolio/profile',
    allowedFormats: ['jpeg', 'png', 'jpg', 'webp'],
  },
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// GET profile (public)
router.get('/', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile();
      await profile.save();
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT update profile (admin)
router.put('/', authMiddleware, upload.single('photo'), async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) profile = new Profile();

    const { name, tagline, bio, email, location, github, linkedin, resume } = req.body;
    if (name) profile.name = name;
    if (tagline) profile.tagline = tagline;
    if (bio) profile.bio = bio;
    if (email) profile.email = email;
    if (location) profile.location = location;
    if (github !== undefined) profile.github = github;
    if (linkedin !== undefined) profile.linkedin = linkedin;
    if (resume !== undefined) profile.resume = resume;

    if (req.file) {
      if (profile.photo && profile.photo.includes('cloudinary')) {
        // Optional: Extract public_id and delete old image from Cloudinary here
      }
      profile.photo = req.file.path;
    }

    await profile.save();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
