const express = require('express');
const experienceController = require('./experience.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

const router = express.Router();

router.route('/')
  .get(experienceController.getAllExperiences)
  .post(authMiddleware, experienceController.createExperience);

router.route('/:id')
  .put(authMiddleware, experienceController.updateExperience)
  .delete(authMiddleware, experienceController.deleteExperience);

module.exports = router;
