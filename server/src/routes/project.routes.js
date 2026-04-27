const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Project = require('../models/Project');
const authMiddleware = require('../middleware/auth.middleware');

// Setup upload directory
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const suffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'project-' + suffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    const ok =
      allowed.test(path.extname(file.originalname).toLowerCase()) &&
      allowed.test(file.mimetype);
    ok ? cb(null, true) : cb(new Error('Only image files allowed'));
  },
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
      image: req.file ? `/uploads/${req.file.filename}` : '',
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
      if (project.image) {
        const oldPath = path.join(__dirname, '../..', project.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      project.image = `/uploads/${req.file.filename}`;
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

    if (project.image) {
      const imgPath = path.join(__dirname, '../..', project.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }
    await project.deleteOne();
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
