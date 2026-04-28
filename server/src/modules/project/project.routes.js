const express = require('express');
const projectController = require('./project.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const createUploadMiddleware = require('../../middlewares/upload.middleware');

const router = express.Router();
const upload = createUploadMiddleware('portfolio/projects');

router.route('/')
  .get(projectController.getAllProjects)
  .post(authMiddleware, upload.single('image'), projectController.createProject);

router.route('/:id')
  .get(projectController.getProjectById)
  .put(authMiddleware, upload.single('image'), projectController.updateProject)
  .delete(authMiddleware, projectController.deleteProject);

module.exports = router;
