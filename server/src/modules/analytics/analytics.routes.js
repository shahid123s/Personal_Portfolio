const express = require('express');
const analyticsController = require('./analytics.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

const router = express.Router();

// Public tracking endpoints (called from the frontend silently)
router.post('/pageview', analyticsController.recordPageView);
router.post('/session', analyticsController.updateSessionDuration);
router.post('/click', analyticsController.recordLinkClick);

// Admin: get aggregated stats
router.get('/stats', authMiddleware, analyticsController.getStats);

module.exports = router;
