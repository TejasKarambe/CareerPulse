import React from 'react';
import { cn } from '../../utils/cn';

export const Card = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl shadow-xs',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className, ...props }) => {
  return (
    <div className={cn('p-5 pb-3 border-b border-slate-100 dark:border-slate-800/80', className)} {...props}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className, ...props }) => {
  return (
    <h3 className={cn('font-semibold text-base text-slate-900 dark:text-slate-100', className)} {...props}>
      {children}
    </h3>
  );
};

export const CardContent = ({ children, className, ...props }) => {
  return (
    <div className={cn('p-5', className)} {...props}>
      {children}
    </div>
  );
};
