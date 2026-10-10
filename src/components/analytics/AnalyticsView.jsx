import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
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
  Legend,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';
import { BarChart3 } from 'lucide-react';

const COLORS = ['#3b82f6', '#0ea5e9', '#10b981', '#f59e0b', '#f43f5e', '#8b5cf6'];

export const AnalyticsView = () => {
  const { applications, currentPaletteConfig } = useApp();

  // Work arrangement distribution
  const arrangementData = useMemo(() => {
    const map = {};
    applications.forEach((a) => {
      const type = a.workArrangement || 'Remote';
      map[type] = (map[type] || 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [applications]);

  // Salary comparison
  const salaryData = useMemo(() => {
    return applications
      .filter((a) => a.salaryMax || a.salaryMin)
      .map((a) => ({
        company: a.companyName.length > 10 ? a.companyName.substring(0, 10) + '..' : a.companyName,
        min: a.salaryMin ? a.salaryMin / 1000 : 0,
        max: a.salaryMax ? a.salaryMax / 1000 : (a.salaryMin || 0) / 1000,
      }))
      .slice(0, 8);
  }, [applications]);

  // Timeline applications by month
  const timelineData = useMemo(() => {
    const months = {};
    applications.forEach((a) => {
      if (!a.appliedDate) return;
      const monthYear = a.appliedDate.slice(0, 7); // YYYY-MM
      months[monthYear] = (months[monthYear] || 0) + 1;
    });
    return Object.entries(months)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, count]) => ({ date, count }));
  }, [applications]);

  if (applications.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Analytics & Conversion Rates</h2>
          <p className="text-sm text-slate-500">Deep-dive into your job search metrics and salary brackets.</p>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl p-12 text-center text-slate-400">
          <BarChart3 size={32} className="mx-auto mb-2 opacity-50" />
          <p className="font-semibold text-slate-700 dark:text-slate-300">No data to analyze yet</p>
          <p className="text-xs mt-1">Add job applications to automatically generate analytics and salary benchmarks.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Analytics & Conversion Rates</h2>
        <p className="text-sm text-slate-500">Deep-dive into your job search metrics and salary brackets.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Work Arrangement Pie */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-2">Work Arrangement Breakdown</h3>
          <p className="text-xs text-slate-500 mb-4">Remote vs. Hybrid vs. On-site positions</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={arrangementData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {arrangementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Applications Over Time Line Chart */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-2">Applications Timeline</h3>
          <p className="text-xs text-slate-500 mb-4">Volume of submissions per month</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke={currentPaletteConfig.primary}
                  strokeWidth={3}
                  dot={{ r: 5, fill: currentPaletteConfig.primary }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Salary Ranges Bar Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-2">Salary Benchmark Range (in $k)</h3>
          <p className="text-xs text-slate-500 mb-4">Min vs Max compensation bounds for top tracked companies</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="company" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="min" fill="#94a3b8" name="Min Salary ($k)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="max" fill={currentPaletteConfig.primary} name="Max Salary ($k)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
