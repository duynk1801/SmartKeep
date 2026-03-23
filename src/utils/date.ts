/**
 * Date Formatting Utilities
 */

/**
 * Formats an ISO date string to a human-readable format.
 * @example formatDate('2025-12-31') => 'Dec 31, 2025'
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Formats a date to relative time (e.g., "2 days ago", "in 3 months").
 */
export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';

  if (diffDays > 0) {
    if (diffDays < 30) return `in ${diffDays} days`;
    if (diffDays < 365) return `in ${Math.round(diffDays / 30)} months`;
    return `in ${Math.round(diffDays / 365)} years`;
  }

  const absDays = Math.abs(diffDays);
  if (absDays < 30) return `${absDays} days ago`;
  if (absDays < 365) return `${Math.round(absDays / 30)} months ago`;
  return `${Math.round(absDays / 365)} years ago`;
}

/**
 * Formats date to YYYY-MM-DD for API/database usage.
 */
export function toISODateString(date: Date): string {
  return date.toISOString().split('T')[0];
}
