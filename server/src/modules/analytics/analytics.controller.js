const analyticsService = require('./analytics.service');
const catchAsync = require('../../utils/catchAsync');

// Public: fired when the page loads
exports.recordPageView = catchAsync(async (req, res) => {
  const { sessionId, referrer } = req.body;
  const userAgent = req.headers['user-agent'];
  await analyticsService.recordPageView({ sessionId, referrer, userAgent });
  res.status(200).json({ success: true });
});

// Public: fired when user leaves
exports.updateSessionDuration = catchAsync(async (req, res) => {
  const { sessionId, duration } = req.body;
  await analyticsService.updateSessionDuration({ sessionId, duration });
  res.status(200).json({ success: true });
});

// Public: fired when a tracked link is clicked
exports.recordLinkClick = catchAsync(async (req, res) => {
  const { type } = req.body;
  await analyticsService.recordLinkClick(type);
  res.status(200).json({ success: true });
});

// Admin: get full stats
exports.getStats = catchAsync(async (req, res) => {
  const stats = await analyticsService.getStats();
  res.status(200).json(stats);
});
