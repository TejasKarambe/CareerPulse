import React from 'react';
import { cn } from '../../utils/cn';

export const Input = React.forwardRef(({ className, error, label, ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={cn(
          'w-full px-3 py-2 text-sm rounded-lg border bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-xs',
          error ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-300 dark:border-slate-700',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-rose-500 mt-1 font-medium">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export const Select = React.forwardRef(({ className, label, children, ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={cn(
          'w-full px-3 py-2 text-sm rounded-lg border bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 border-slate-300 dark:border-slate-700 transition-all shadow-xs cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </select>
    </div>
  );
});

Select.displayName = 'Select';

export const Textarea = React.forwardRef(({ className, label, rows = 3, ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          'w-full px-3 py-2 text-sm rounded-lg border bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 border-slate-300 dark:border-slate-700 transition-all shadow-xs resize-y',
          className
        )}
        {...props}
      />
    </div>
  );
});

Textarea.displayName = 'Textarea';
