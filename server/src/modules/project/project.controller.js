const projectService = require('./project.service');
const catchAsync = require('../../utils/catchAsync');

exports.getAllProjects = catchAsync(async (req, res) => {
  const projects = await projectService.getAllProjects();
  res.status(200).json(projects);
});

exports.getProjectById = catchAsync(async (req, res) => {
  const project = await projectService.getProjectById(req.params.id);
  res.status(200).json(project);
});

exports.createProject = catchAsync(async (req, res) => {
  const project = await projectService.createProject(req.body, req.file);
  res.status(201).json(project);
});

exports.updateProject = catchAsync(async (req, res) => {
  const project = await projectService.updateProject(req.params.id, req.body, req.file);
  res.status(200).json(project);
});

exports.deleteProject = catchAsync(async (req, res) => {
  await projectService.deleteProject(req.params.id);
  res.status(200).json({ message: 'Project deleted successfully' });
});
