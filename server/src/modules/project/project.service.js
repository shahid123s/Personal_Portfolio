const Project = require('./project.model');
const AppError = require('../../utils/AppError');

exports.getAllProjects = async () => {
  return await Project.find().sort({ order: 1, createdAt: -1 });
};

exports.getProjectById = async (id) => {
  const project = await Project.findById(id);
  if (!project) {
    throw new AppError('Project not found', 404);
  }
  return project;
};

exports.createProject = async (bodyData, file) => {
  const { title, description, techStack, githubUrl, liveUrl, featured, order, icon } = bodyData;
  const project = new Project({
    title,
    description,
    techStack: techStack ? JSON.parse(techStack) : [],
    githubUrl: githubUrl || '',
    liveUrl: liveUrl || '',
    featured: featured === 'true',
    order: parseInt(order) || 0,
    icon: icon || 'code',
    image: file ? file.path : '',
  });
  return await project.save();
};

exports.updateProject = async (id, bodyData, file) => {
  const project = await Project.findById(id);
  if (!project) {
    throw new AppError('Project not found', 404);
  }

  const { title, description, techStack, githubUrl, liveUrl, featured, order, icon } = bodyData;
  if (title) project.title = title;
  if (description) project.description = description;
  if (techStack) project.techStack = JSON.parse(techStack);
  if (githubUrl !== undefined) project.githubUrl = githubUrl;
  if (liveUrl !== undefined) project.liveUrl = liveUrl;
  if (featured !== undefined) project.featured = featured === 'true';
  if (order !== undefined) project.order = parseInt(order);
  if (icon) project.icon = icon;

  if (file) {
    if (project.image && project.image.includes('cloudinary')) {
      // Optional: delete old image from Cloudinary
    }
    project.image = file.path;
  }

  return await project.save();
};

exports.deleteProject = async (id) => {
  const project = await Project.findById(id);
  if (!project) {
    throw new AppError('Project not found', 404);
  }

  if (project.image && project.image.includes('cloudinary')) {
    // Optional: extract public_id and delete from Cloudinary
  }
  
  await project.deleteOne();
  return true;
};
