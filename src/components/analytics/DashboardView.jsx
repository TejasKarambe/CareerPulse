import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import {
  Briefcase,
  Users,
  Award,
  TrendingUp,
  Clock,
  ArrowRight,
  Plus
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';
import { formatDate, getStatusBadgeClasses } from '../../utils/formatters';
import { Button } from '../ui/Button';

const STAGE_COLORS = {
  applied: '#3b82f6',
  screening: '#f59e0b',
  interview: '#0284c7',
  offer: '#10b981',
  rejected: '#f43f5e',
};

export const DashboardView = ({ onSelectApp, onOpenNewModal }) => {
  const { applications, setActiveTab, currentPaletteConfig } = useApp();

  const metrics = useMemo(() => {
    const total = applications.length;
    const active = applications.filter((a) => ['applied', 'screening', 'interview'].includes(a.status)).length;
    const interviews = applications.filter((a) => a.status === 'interview').length;
    const offers = applications.filter((a) => a.status === 'offer').length;
    const rejected = applications.filter((a) => a.status === 'rejected').length;
    const interviewRate = total ? Math.round(((interviews + offers) / total) * 100) : 0;
    const offerRate = total ? Math.round((offers / total) * 100) : 0;

    return { total, active, interviews, offers, rejected, interviewRate, offerRate };
  }, [applications]);

  // Stage distribution data
  const stageData = useMemo(() => {
    const counts = { applied: 0, screening: 0, interview: 0, offer: 0, rejected: 0 };
    applications.forEach((a) => {
      if (counts[a.status] !== undefined) counts[a.status]++;
    });
    return Object.entries(counts).map(([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      count: value,
      key,
    }));
  }, [applications]);

  // Upcoming interviews
  const upcomingInterviews = useMemo(() => {
    const list = [];
    applications.forEach((app) => {
      (app.interviewDates || []).forEach((iv) => {
        list.push({
          app,
          round: iv.round,
          date: iv.date,
          interviewer: iv.interviewer,
        });
      });
    });
    return list
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 5);
  }, [applications]);

  // Top applied tags
  const topTags = useMemo(() => {
    const tagMap = {};
    applications.forEach((a) => {
      (a.tags || []).forEach((t) => {
        tagMap[t] = (tagMap[t] || 0) + 1;
      });
    });
    return Object.entries(tagMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);
  }, [applications]);

  return (
    <div className="space-y-6">
      {/* Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Pipeline</p>
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              {metrics.total}
            </h3>
            <span className="text-xs theme-text-primary font-medium">
              {metrics.active} active processes
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl theme-bg-light flex items-center justify-center theme-text-primary">
            <Briefcase size={22} />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Interviews</p>
            <h3 className="text-3xl font-extrabold text-sky-600 dark:text-sky-400 mt-1">
              {metrics.interviews}
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              {metrics.interviewRate}% interview hit rate
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-950 flex items-center justify-center text-sky-600 dark:text-sky-400">
            <Users size={22} />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Job Offers</p>
            <h3 className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
              {metrics.offers}
            </h3>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              {metrics.offerRate}% conversion rate
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Award size={22} />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Rejections</p>
            <h3 className="text-3xl font-extrabold text-rose-600 dark:text-rose-400 mt-1">
              {metrics.rejected}
            </h3>
            <span className="text-xs text-slate-500 font-medium">Keep learning & iterating</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950 flex items-center justify-center text-rose-600 dark:text-rose-400">
            <TrendingUp size={22} />
          </div>
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl theme-bg-light theme-text-primary mx-auto flex items-center justify-center">
            <Briefcase size={28} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Your Pipeline is Empty</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto mt-1">
              You haven't added any job applications yet. Click below to add your first opportunity.
            </p>
          </div>
          <Button variant="primary" onClick={onOpenNewModal}>
            <Plus size={16} />
            <span>Add First Application</span>
          </Button>
        </div>
      ) : (
        <>
          {/* Main Visualizations Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pipeline Bar Chart */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">Pipeline Conversion Funnel</h3>
                  <p className="text-xs text-slate-500">Distribution across all stages</p>
                </div>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stageData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1e293b',
                        borderColor: '#334155',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '12px',
                      }}
                    />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                      {stageData.map((entry) => (
                        <Cell key={entry.key} fill={STAGE_COLORS[entry.key] || currentPaletteConfig.primary} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Upcoming Interview Schedule Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                    <Clock size={16} className="theme-text-primary" />
                    Upcoming Interviews
                  </h3>
                  <button
                    onClick={() => setActiveTab('calendar')}
                    className="text-xs theme-text-primary font-medium hover:underline flex items-center gap-0.5 cursor-pointer"
                  >
                    Calendar <ArrowRight size={12} />
                  </button>
                </div>

                {upcomingInterviews.length === 0 ? (
                  <div className="h-48 flex items-center justify-center text-center text-xs text-slate-400">
                    No interviews scheduled yet.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {upcomingInterviews.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => onSelectApp(item.app)}
                        className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/70 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-all cursor-pointer group"
                      >
                        <div className="flex items-start justify-between">
                          <span className="text-xs font-bold theme-text-primary">
                            {item.app.companyName}
                          </span>
                          <span className="text-[11px] font-mono text-slate-500">
                            {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        <div className="font-medium text-xs text-slate-800 dark:text-slate-200 group-hover:opacity-80 transition-opacity">
                          {item.round}
                        </div>
                        {item.interviewer && (
                          <p className="text-[11px] text-slate-400 truncate mt-0.5">with {item.interviewer}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Skill Tags */}
              {topTags.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase mb-2">Most Target Skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {topTags.map(([tag, count]) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium"
                      >
                        {tag} <span className="text-slate-400 font-normal">({count})</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recent Applications Feed */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Recent Pipeline Activity</h3>
                <p className="text-xs text-slate-500">Latest applications added or updated</p>
              </div>
              <button
                onClick={() => setActiveTab('applications')}
                className="text-xs font-semibold theme-text-primary hover:underline flex items-center gap-1 cursor-pointer"
              >
                Open Kanban Board <ArrowRight size={13} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {applications.slice(0, 6).map((app) => (
                <div
                  key={app.id}
                  onClick={() => onSelectApp(app)}
                  className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs theme-text-primary">
                      {app.companyName}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize border ${getStatusBadgeClasses(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-200 truncate">
                    {app.jobTitle}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">Applied on {formatDate(app.appliedDate)}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
