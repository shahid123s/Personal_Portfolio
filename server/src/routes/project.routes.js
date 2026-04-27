const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Project = require('../models/Project');
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
    folder: 'portfolio/projects',
    allowedFormats: ['jpeg', 'png', 'jpg', 'webp'],
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// GET all projects (public)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST create project (admin)
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { title, description, techStack, githubUrl, liveUrl, featured, order, icon } = req.body;
    const project = new Project({
      title,
      description,
      techStack: techStack ? JSON.parse(techStack) : [],
      githubUrl: githubUrl || '',
      liveUrl: liveUrl || '',
      featured: featured === 'true',
      order: parseInt(order) || 0,
      icon: icon || 'code',
      image: req.file ? req.file.path : '',
    });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT update project (admin)
router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const { title, description, techStack, githubUrl, liveUrl, featured, order, icon } = req.body;
    if (title) project.title = title;
    if (description) project.description = description;
    if (techStack) project.techStack = JSON.parse(techStack);
    if (githubUrl !== undefined) project.githubUrl = githubUrl;
    if (liveUrl !== undefined) project.liveUrl = liveUrl;
    if (featured !== undefined) project.featured = featured === 'true';
    if (order !== undefined) project.order = parseInt(order);
    if (icon) project.icon = icon;

    if (req.file) {
      if (project.image && project.image.includes('cloudinary')) {
        // Optional: delete old image from Cloudinary
      }
      project.image = req.file.path;
    }

    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE project (admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    if (project.image && project.image.includes('cloudinary')) {
      // Optional: extract public_id and delete from Cloudinary
    }
    await project.deleteOne();
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
