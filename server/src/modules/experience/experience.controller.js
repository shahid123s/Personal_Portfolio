const experienceService = require('./experience.service');
const catchAsync = require('../../utils/catchAsync');

exports.getAllExperiences = catchAsync(async (req, res) => {
  const experiences = await experienceService.getAllExperiences();
  res.status(200).json(experiences);
});

exports.createExperience = catchAsync(async (req, res) => {
  const experience = await experienceService.createExperience(req.body);
  res.status(201).json(experience);
});

exports.updateExperience = catchAsync(async (req, res) => {
  const experience = await experienceService.updateExperience(req.params.id, req.body);
  res.status(200).json(experience);
});

exports.deleteExperience = catchAsync(async (req, res) => {
  await experienceService.deleteExperience(req.params.id);
  res.status(200).json({ message: 'Experience deleted successfully' });
});
