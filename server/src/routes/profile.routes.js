const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Profile = require('../models/Profile');
const authMiddleware = require('../middleware/auth.middleware');

const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    cb(null, 'profile-' + Date.now() + path.extname(file.originalname));
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
      if (profile.photo) {
        const oldPath = path.join(__dirname, '../..', profile.photo);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      profile.photo = `/uploads/${req.file.filename}`;
    }

    await profile.save();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
