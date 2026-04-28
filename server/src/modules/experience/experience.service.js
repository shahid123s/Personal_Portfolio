const Experience = require('./experience.model');
const AppError = require('../../utils/AppError');

exports.getAllExperiences = async () => {
  return await Experience.find().sort({ order: 1 });
};

exports.createExperience = async (data) => {
  const { period, role, company, description, order } = data;
  const experience = new Experience({
    period,
    role,
    company,
    description,
    order: parseInt(order) || 0,
  });
  return await experience.save();
};

exports.updateExperience = async (id, data) => {
  const experience = await Experience.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!experience) {
    throw new AppError('Experience not found', 404);
  }
  return experience;
};

exports.deleteExperience = async (id) => {
  const experience = await Experience.findByIdAndDelete(id);
  if (!experience) {
    throw new AppError('Experience not found', 404);
  }
  return true;
};
