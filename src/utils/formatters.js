export function formatCurrency(amount, currency = 'USD ($)') {
  if (!amount && amount !== 0) return 'N/A';
  const symbol = currency.match(/\((.*?)\)/)?.[1] || '$';
  return `${symbol}${Number(amount).toLocaleString()}`;
}

export function formatSalaryRange(min, max, currency = 'USD ($)') {
  if (!min && !max) return 'Not specified';
  const symbol = currency.match(/\((.*?)\)/)?.[1] || '$';
  if (min && !max) return `From ${symbol}${Number(min).toLocaleString()}`;
  if (!min && max) return `Up to ${symbol}${Number(max).toLocaleString()}`;
  return `${symbol}${(min / 1000).toFixed(0)}k - ${symbol}${(max / 1000).toFixed(0)}k`;
}

export function formatDate(dateString) {
  if (!dateString) return '—';
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
}

export function formatDateTime(dateString) {
  if (!dateString) return '—';
  try {
    const d = new Date(dateString);
    return d.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return dateString;
  }
}

export function getStatusBadgeClasses(status) {
  switch (status) {
    case 'applied':
      return 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800';
    case 'screening':
      return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800';
    case 'interview':
      return 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-800';
    case 'offer':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800';
    case 'rejected':
      return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
  }
}
