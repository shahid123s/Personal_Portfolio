const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const globalErrorHandler = require('./middlewares/error.middleware');
const AppError = require('./utils/AppError');

// Routes
const authRoutes = require('./modules/auth/auth.routes');
const projectRoutes = require('./modules/project/project.routes');
const experienceRoutes = require('./modules/experience/experience.routes');
const profileRoutes = require('./modules/profile/profile.routes');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files (for local dev if needed)
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// Routes mapping
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/profile', profileRoutes);

// Health check
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
  
  const healthInfo = {
    status: dbStatus === 'Connected' ? 'OK' : 'ERROR',
    message: 'Portfolio API is running 🚀',
    database: dbStatus,
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
    timestamp: new Date().toISOString(),
  };
  
  res.status(dbStatus === 'Connected' ? 200 : 503).json(healthInfo);
});

// Handle 404 errors
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(globalErrorHandler);

module.exports = app;
