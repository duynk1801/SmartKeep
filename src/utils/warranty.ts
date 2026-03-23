import { WARRANTY_EXPIRY_WARNING_DAYS } from '@/src/constants/configs';

/**
 * Warranty Calculation Utilities
 */

export type WarrantyStatus = 'active' | 'expiring' | 'expired';

/**
 * Calculates the number of days until a warranty expires.
 * @returns Positive = days remaining, Negative = days past expiry
 */
export function getDaysUntilExpiry(expiryDateString: string): number {
  const expiry = new Date(expiryDateString);
  const now = new Date();

  // Normalize to midnight to avoid time-of-day differences
  expiry.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  const diffMs = expiry.getTime() - now.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Determines the warranty status based on expiry date.
 */
export function getWarrantyStatus(expiryDateString: string): WarrantyStatus {
  const daysRemaining = getDaysUntilExpiry(expiryDateString);

  if (daysRemaining < 0) return 'expired';
  if (daysRemaining <= WARRANTY_EXPIRY_WARNING_DAYS) return 'expiring';
  return 'active';
}

/**
 * Calculates the warranty coverage percentage used.
 * @returns A number between 0 and 100
 */
export function getWarrantyCoveragePercent(
  purchaseDateString: string,
  expiryDateString: string,
): number {
  const purchase = new Date(purchaseDateString);
  const expiry = new Date(expiryDateString);
  const now = new Date();

  const totalMs = expiry.getTime() - purchase.getTime();
  const usedMs = now.getTime() - purchase.getTime();

  if (totalMs <= 0) return 100;

  const percent = (usedMs / totalMs) * 100;
  return Math.max(0, Math.min(100, Math.round(percent)));
}
