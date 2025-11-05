// src/core/api/emailService.ts

import { emailProviderConfig } from '../config/emailConfig';
import { renderEmailTemplate, EmailTemplateData } from '../email/templates';
import { getGlobalNotificationSettings, GlobalNotificationSettings } from './settingsService';

// A union of all possible message types
export type EmailMessageType = 
  | 'registration_confirmation'
  | 'guest_reservation_confirmation'
  | 'unit_new_reservation_notification'
  | 'schedule_published_notification';

// The final, rendered parameters for the provider
interface FinalEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

// The data structure passed from the calling component
interface SendEmailData {
    messageType: EmailMessageType;
    locale?: 'hu' | 'en';
    data: EmailTemplateData;
}

// --- Private: Mock Logging Helper ---

function mockSend(params: FinalEmailParams, type: 'MOCK' | 'REAL SEND FAILED') {
    console.groupCollapsed(`[${type} EMAIL] Subject: ${params.subject}`);
    console.log("To:", params.to);
    console.log("From:", emailProviderConfig.fromDefault);
    console.log("--- HTML Body ---");
    console.log(params.html);
    console.log("-------------------");
    console.groupEnd();
}

// --- Private: Provider Sending Logic ---

async function sendViaProvider(params: FinalEmailParams): Promise<void> {
  const { provider, apiKey, fromDefault } = emailProviderConfig;

  // The 'provider' in the config is already determined by NODE_ENV and apiKey presence.
  // If it's 'resend', we can proceed. Otherwise, it's 'mock'.
  if (provider === 'resend' && apiKey) {
    // REAL SEND logic using Resend
    try {
      const toArray = Array.isArray(params.to) ? params.to : [params.to];
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: fromDefault,
          to: toArray,
          subject: params.subject,
          html: params.html,
          text: params.text,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({ message: 'Failed to parse error response from Resend API' }));
        console.error(`[EMAIL SERVICE] Resend API Error: ${response.status}`, errorBody);
        console.warn('[EMAIL SERVICE] Falling back to mock email log due to API error.');
        mockSend(params, 'REAL SEND FAILED');
      } else {
        console.log(`[EMAIL SERVICE] Email sent successfully via Resend to: ${params.to.toString()}`);
      }
    } catch (error) {
      console.error("[EMAIL SERVICE] Network or other error during email sending:", error);
      console.warn('[EMAIL SERVICE] Falling back to mock email log due to network error.');
      mockSend(params, 'REAL SEND FAILED');
    }
  } else {
    // MOCK SEND logic (for dev, or if prod is misconfigured)
    mockSend(params, 'MOCK');
  }
}

// --- Public API ---

/**
 * Orchestrates sending an email by checking settings, rendering templates, and calling the provider.
 * This is the main function to be called from other parts of the application.
 * It does not throw errors to avoid breaking business logic flows.
 */
export const sendEmail = async (params: SendEmailData): Promise<{ success: boolean; message: string }> => {
  const { messageType, data, locale = 'hu' } = params;

  // 1. Check global notification settings
  const notificationSettings = await getGlobalNotificationSettings();
  const settingKey = {
      'registration_confirmation': 'enableRegistrationEmails',
      'guest_reservation_confirmation': 'enableGuestReservationEmails',
      'unit_new_reservation_notification': 'enableUnitReservationEmails',
      'schedule_published_notification': 'enableSchedulePublishEmails',
  }[messageType] as keyof GlobalNotificationSettings;

  if (notificationSettings[settingKey] === false) {
    console.log(`[EMAIL SERVICE] Skipped email type "${messageType}" due to global settings.`);
    return { success: true, message: 'Skipped by global settings.' };
  }
  
  // 2. Determine recipient(s) from data payload
  let to: string | string[] | undefined;
  if ('user' in data && data.user?.email) {
    to = data.user.email;
  } else if ('booking' in data && data.booking?.contact?.email) {
    to = data.booking.contact.email;
  } else if ('notificationEmails' in data && data.notificationEmails) {
    to = data.notificationEmails;
  }

  if (!to || (Array.isArray(to) && to.length === 0)) {
    console.warn(`[EMAIL SERVICE] No recipient found for message type "${messageType}".`);
    return { success: false, message: 'No recipient found.' };
  }

  // 3. Render email content from template
  const renderedContent = renderEmailTemplate(messageType, locale, data);

  if (!renderedContent) {
    console.error(`[EMAIL SERVICE] Failed to render template for message type "${messageType}".`);
    return { success: false, message: 'Template rendering failed.' };
  }

  const finalEmailParams: FinalEmailParams = {
    to,
    ...renderedContent,
  };

  // 4. Send via the configured provider (with fallback).
  // No need to wrap in try/catch as sendViaProvider handles its own errors.
  await sendViaProvider(finalEmailParams);
  
  return { success: true, message: 'Email processed.' };
};
