import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, Globe, MapPin, Briefcase, ExternalLink } from 'lucide-react';
import { getStatusBadgeClasses } from '../../utils/formatters';

export const CompaniesView = ({ onSelectApp }) => {
  const { applications } = useApp();

  // Aggregate companies from applications
  const companies = useMemo(() => {
    const map = {};
    applications.forEach((app) => {
      const name = app.companyName;
      if (!map[name]) {
        map[name] = {
          name,
          url: app.url,
          location: app.location,
          applications: [],
        };
      }
      map[name].applications.push(app);
    });
    return Object.values(map);
  }, [applications]);

  if (companies.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Tracked Companies</h2>
          <p className="text-sm text-slate-500">
            Directory of organizations you have applied to or are currently interviewing with.
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl p-12 text-center text-slate-400">
          <Building2 size={32} className="mx-auto mb-2 opacity-50" />
          <p className="font-semibold text-slate-700 dark:text-slate-300">No companies tracked yet</p>
          <p className="text-xs mt-1">Companies are automatically populated as you add job applications.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Tracked Companies</h2>
        <p className="text-sm text-slate-500">
          Directory of organizations you have applied to or are currently interviewing with.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {companies.map((comp) => (
          <div
            key={comp.name}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl theme-bg-light theme-text-primary flex items-center justify-center font-bold text-base">
                    {comp.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">
                      {comp.name}
                    </h3>
                    {comp.location && (
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <MapPin size={12} /> {comp.location}
                      </span>
                    )}
                  </div>
                </div>

                {comp.url && (
                  <a
                    href={comp.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>

              <div className="mt-4 space-y-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase">
                  Applications ({comp.applications.length})
                </span>
                <div className="space-y-1.5">
                  {comp.applications.map((app) => (
                    <div
                      key={app.id}
                      onClick={() => onSelectApp(app)}
                      className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 hover:border-slate-400 transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <span className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate pr-2">
                        {app.jobTitle}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize border shrink-0 ${getStatusBadgeClasses(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
