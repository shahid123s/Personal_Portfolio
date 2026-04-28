const mongoose = require('mongoose');

// Tracks each page visit
const pageViewSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  referrer: { type: String, default: 'Direct' },
  userAgent: { type: String },
  sessionDuration: { type: Number, default: 0 }, // in seconds
  createdAt: { type: Date, default: Date.now },
});

// Tracks clicks on social/profile links
const linkClickSchema = new mongoose.Schema({
  type: { type: String, enum: ['resume', 'github', 'linkedin'], required: true },
  createdAt: { type: Date, default: Date.now },
});

const PageView = mongoose.model('PageView', pageViewSchema);
const LinkClick = mongoose.model('LinkClick', linkClickSchema);

module.exports = { PageView, LinkClick };
