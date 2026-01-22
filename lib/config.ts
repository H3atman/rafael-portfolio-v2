/**
 * Application Configuration
 * 
 * This file centralizes all configuration values for the application.
 * Environment variables are loaded from .env.local and prefixed with NEXT_PUBLIC_
 * to make them available in the browser.
 */

export const config = {
  /**
   * Cal.com booking URL
   * Update this in .env.local to change the booking link across the entire application
   */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "https://cal.com/PLACEHOLDER_CAL_LINK",
} as const;
