import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const StatCard = ({ icon, label, value, sub, color = 'text-indigo-400' }) => (
  <div className="p-6 rounded-2xl border border-surface-container-high bg-surface-container/30 flex flex-col gap-2 hover:border-indigo-500/40 transition-colors">
    <div className="flex items-center gap-2 text-zinc-500 text-sm">
      <span className={`material-symbols-outlined text-xl ${color}`}>{icon}</span>
      <span className="uppercase tracking-wider text-[11px]">{label}</span>
    </div>
    <div className="text-4xl font-h2 text-on-surface mt-1">{value ?? '—'}</div>
    {sub && <div className="text-xs text-zinc-500">{sub}</div>}
  </div>
);

const MiniBar = ({ label, value, max, color = 'bg-indigo-500' }) => (
  <div className="mb-3">
    <div className="flex justify-between text-xs text-zinc-400 mb-1">
      <span>{label}</span>
      <span className="text-on-surface font-bold">{value}</span>
    </div>
    <div className="h-1.5 bg-surface-container-high rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full ${color} transition-all duration-700`}
        style={{ width: max > 0 ? `${(value / max) * 100}%` : '0%' }}
      />
    </div>
  </div>
);

const formatDuration = (seconds) => {
  if (!seconds) return '0s';
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
};

const Overview = ({ adminName }) => {
  const [stats, setStats] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [statsRes, msgRes] = await Promise.all([
          api.get('/analytics/stats'),
          api.get('/contact'),
        ]);
        setStats(statsRes.data);
        setMessages(msgRes.data);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32 text-indigo-500 animate-pulse">
        Loading analytics...
      </div>
    );
  }

  const unread = messages.filter((m) => !m.isRead).length;
  const maxClicks = Math.max(
    stats?.linkClicks?.github || 0,
    stats?.linkClicks?.linkedin || 0,
    stats?.linkClicks?.resume || 0,
    1
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-h2 text-on-surface">Welcome back, {adminName} 👋</h1>
        <p className="text-on-surface-variant mt-1 text-sm">Here's how your portfolio is performing.</p>
      </div>

      {/* Visit Stats */}
      <section className="mb-10">
        <h2 className="text-xs uppercase tracking-widest text-zinc-500 mb-4">Visitors</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon="visibility" label="Total Visits" value={stats?.visits?.total} sub="All time" />
          <StatCard icon="today" label="Today" value={stats?.visits?.today} sub="Since midnight" color="text-emerald-400" />
          <StatCard icon="date_range" label="Last 7 Days" value={stats?.visits?.last7Days} sub="Rolling week" />
          <StatCard icon="calendar_month" label="Last 30 Days" value={stats?.visits?.last30Days} sub="Rolling month" />
        </div>
      </section>

      {/* Engagement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Session Duration */}
        <div className="p-6 rounded-2xl border border-surface-container-high bg-surface-container/30">
          <div className="flex items-center gap-2 text-zinc-500 text-[11px] uppercase tracking-wider mb-4">
            <span className="material-symbols-outlined text-xl text-amber-400">timer</span>
            Avg. Time on Page
          </div>
          <div className="text-4xl font-h2 text-on-surface">
            {formatDuration(stats?.avgSessionDuration)}
          </div>
          <p className="text-xs text-zinc-500 mt-2">Average session duration across all visits</p>
        </div>

        {/* Messages */}
        <div className="p-6 rounded-2xl border border-surface-container-high bg-surface-container/30">
          <div className="flex items-center gap-2 text-zinc-500 text-[11px] uppercase tracking-wider mb-4">
            <span className="material-symbols-outlined text-xl text-indigo-400">inbox</span>
            Messages
          </div>
          <div className="flex items-end gap-4">
            <div>
              <div className="text-4xl font-h2 text-on-surface">{messages.length}</div>
              <p className="text-xs text-zinc-500 mt-1">Total received</p>
            </div>
            {unread > 0 && (
              <div>
                <div className="text-4xl font-h2 text-indigo-400">{unread}</div>
                <p className="text-xs text-zinc-500 mt-1">Unread</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Link Clicks */}
      <section className="mb-10">
        <div className="p-6 rounded-2xl border border-surface-container-high bg-surface-container/30">
          <div className="flex items-center gap-2 text-zinc-500 text-[11px] uppercase tracking-wider mb-6">
            <span className="material-symbols-outlined text-xl text-sky-400">ads_click</span>
            Link Clicks — All Time ({stats?.linkClicks?.total || 0} total)
          </div>
          <MiniBar label="GitHub" value={stats?.linkClicks?.github || 0} max={maxClicks} color="bg-indigo-500" />
          <MiniBar label="LinkedIn" value={stats?.linkClicks?.linkedin || 0} max={maxClicks} color="bg-sky-500" />
          <MiniBar label="Resume" value={stats?.linkClicks?.resume || 0} max={maxClicks} color="bg-emerald-500" />
        </div>
      </section>

      {/* Daily Visits Chart (simple text-based) */}
      {stats?.charts?.dailyVisits?.length > 0 && (
        <section>
          <div className="p-6 rounded-2xl border border-surface-container-high bg-surface-container/30">
            <div className="flex items-center gap-2 text-zinc-500 text-[11px] uppercase tracking-wider mb-6">
              <span className="material-symbols-outlined text-xl text-indigo-400">bar_chart</span>
              Daily Visits — Last 7 Days
            </div>
            <div className="flex items-end gap-3 h-24">
              {stats.charts.dailyVisits.map((d) => {
                const maxV = Math.max(...stats.charts.dailyVisits.map((x) => x.count), 1);
                const pct = Math.max(4, Math.round((d.count / maxV) * 100));
                return (
                  <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-xs text-zinc-500">{d.count}</span>
                    <div
                      className="w-full bg-indigo-500/30 rounded-t hover:bg-indigo-500/60 transition-colors"
                      style={{ height: `${pct}%` }}
                      title={`${d.date}: ${d.count} visits`}
                    />
                    <span className="text-[9px] text-zinc-600">
                      {new Date(d.date).toLocaleDateString('en', { weekday: 'short' })}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Overview;
