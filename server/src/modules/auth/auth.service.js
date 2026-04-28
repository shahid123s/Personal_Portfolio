const jwt = require('jsonwebtoken');
const Admin = require('../admin/admin.model');
const AppError = require('../../utils/AppError');

exports.login = async (email, password) => {
  if (!email || !password) {
    throw new AppError('Email and password are required', 400);
  }

  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw new AppError('Invalid credentials', 401);
  }

  const isMatch = await admin.comparePassword(password);
  if (!isMatch) {
    throw new AppError('Invalid credentials', 401);
  }

  const token = jwt.sign(
    { id: admin._id, email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return { token, admin: { id: admin._id, email: admin.email, name: admin.name } };
};

exports.getMe = async (id) => {
  const admin = await Admin.findById(id).select('-password');
  if (!admin) {
    throw new AppError('Admin not found', 404);
  }
  return admin;
};
