const authService = require('./auth.service');
const catchAsync = require('../../utils/catchAsync');

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  
  res.status(200).json({
    token: result.token,
    admin: result.admin
  });
});

exports.getMe = catchAsync(async (req, res) => {
  const admin = await authService.getMe(req.admin.id);
  
  res.status(200).json(admin);
});
