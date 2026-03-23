/**
 * NotificationService — Local push notification scheduling.
 *
 * Schedules reminders for warranty expirations.
 * Uses expo-notifications (to be added as a dependency).
 *
 * Designed as a service so it can be called from hooks or background tasks.
 */

import { WARRANTY_EXPIRY_WARNING_DAYS } from '@/src/constants/configs';

interface ScheduleNotificationOptions {
  title: string;
  body: string;
  triggerDate: Date;
  data?: Record<string, unknown>;
}

export const NotificationService = {
  /**
   * Schedules a local notification.
   *
   * TODO: Integrate with expo-notifications
   */
  async schedule(options: ScheduleNotificationOptions): Promise<string | null> {
    console.log(`[Notification] Scheduled: "${options.title}" at ${options.triggerDate.toISOString()}`);

    // TODO: Use Notifications.scheduleNotificationAsync from expo-notifications
    // Return the notification identifier
    return null;
  },

  /**
   * Schedules a warranty expiry reminder.
   *
   * Fires WARRANTY_EXPIRY_WARNING_DAYS before the expiry date.
   */
  async scheduleWarrantyReminder(
    warrantyId: string,
    deviceName: string,
    expiryDate: string,
  ): Promise<string | null> {
    const expiry = new Date(expiryDate);
    const triggerDate = new Date(expiry);
    triggerDate.setDate(triggerDate.getDate() - WARRANTY_EXPIRY_WARNING_DAYS);

    // Don't schedule if the reminder date has already passed
    if (triggerDate <= new Date()) {
      return null;
    }

    return this.schedule({
      title: '⚠️ Warranty Expiring Soon',
      body: `The warranty for "${deviceName}" expires on ${expiry.toLocaleDateString()}`,
      triggerDate,
      data: { warrantyId, type: 'warranty_expiry' },
    });
  },

  /**
   * Cancels a previously scheduled notification.
   */
  async cancel(notificationId: string): Promise<void> {
    // TODO: Use Notifications.cancelScheduledNotificationAsync
    console.log(`[Notification] Cancelled: ${notificationId}`);
  },

  /**
   * Cancels all scheduled notifications.
   */
  async cancelAll(): Promise<void> {
    // TODO: Use Notifications.cancelAllScheduledNotificationsAsync
    console.log('[Notification] All cancelled');
  },
} as const;
