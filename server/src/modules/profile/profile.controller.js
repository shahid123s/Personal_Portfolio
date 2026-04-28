const profileService = require('./profile.service');
const catchAsync = require('../../utils/catchAsync');

exports.getProfile = catchAsync(async (req, res) => {
  const profile = await profileService.getProfile();
  res.status(200).json(profile);
});

exports.updateProfile = catchAsync(async (req, res) => {
  const profile = await profileService.updateProfile(req.body, req.file);
  res.status(200).json(profile);
});
