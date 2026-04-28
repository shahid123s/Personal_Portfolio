const { PageView, LinkClick } = require('./analytics.model');

// Record a new page view session
exports.recordPageView = async ({ sessionId, referrer, userAgent }) => {
  const existing = await PageView.findOne({ sessionId });
  if (!existing) {
    await PageView.create({ sessionId, referrer, userAgent });
  }
};

// Update session duration when user leaves
exports.updateSessionDuration = async ({ sessionId, duration }) => {
  await PageView.findOneAndUpdate({ sessionId }, { sessionDuration: duration });
};

// Record a link click (resume / github / linkedin)
exports.recordLinkClick = async (type) => {
  await LinkClick.create({ type });
};

// Aggregate all analytics stats for the dashboard
exports.getStats = async () => {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOf7DaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
  const startOf30DaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);

  const [
    totalVisits,
    todayVisits,
    last7DaysVisits,
    last30DaysVisits,
    avgDurationResult,
    resumeClicks,
    githubClicks,
    linkedinClicks,
    last7DaysClicksData,
    last7DaysVisitsData,
  ] = await Promise.all([
    PageView.countDocuments(),
    PageView.countDocuments({ createdAt: { $gte: startOfToday } }),
    PageView.countDocuments({ createdAt: { $gte: startOf7DaysAgo } }),
    PageView.countDocuments({ createdAt: { $gte: startOf30DaysAgo } }),
    PageView.aggregate([{ $group: { _id: null, avg: { $avg: '$sessionDuration' } } }]),
    LinkClick.countDocuments({ type: 'resume' }),
    LinkClick.countDocuments({ type: 'github' }),
    LinkClick.countDocuments({ type: 'linkedin' }),
    // Daily clicks for the last 7 days
    LinkClick.aggregate([
      { $match: { createdAt: { $gte: startOf7DaysAgo } } },
      {
        $group: {
          _id: { day: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, type: '$type' },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.day': 1 } },
    ]),
    // Daily visits for the last 7 days
    PageView.aggregate([
      { $match: { createdAt: { $gte: startOf7DaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]),
  ]);

  const avgSessionDuration = avgDurationResult[0]?.avg
    ? Math.round(avgDurationResult[0].avg)
    : 0;

  return {
    visits: {
      total: totalVisits,
      today: todayVisits,
      last7Days: last7DaysVisits,
      last30Days: last30DaysVisits,
    },
    avgSessionDuration,
    linkClicks: {
      resume: resumeClicks,
      github: githubClicks,
      linkedin: linkedinClicks,
      total: resumeClicks + githubClicks + linkedinClicks,
    },
    charts: {
      dailyVisits: last7DaysVisitsData.map((d) => ({ date: d._id, count: d.count })),
      dailyClicks: last7DaysClicksData,
    },
  };
};
