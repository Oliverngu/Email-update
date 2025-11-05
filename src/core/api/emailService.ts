// src/core/api/emailService.ts

import { emailProviderConfig } from '../config/emailConfig';
import { renderEmailTemplate, EmailTemplateData } from '../email/templates';
import { getGlobalNotificationSettings, GlobalNotificationSettings, getUnitNotificationSettings } from './settingsService';

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

  if (provider === 'resend' && apiKey) {
    try {
      const toArray = Array.isArray(params.to) ? params.to : [params.to];
      if (toArray.length === 0) {
          console.log(`[EMAIL SERVICE] Skipped sending email for "${params.subject}" because there are no recipients.`);
          return;
      }
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
    mockSend(params, 'MOCK');
  }
}

// --- Public API ---

export const sendEmail = async (params: SendEmailData): Promise<{ success: boolean; message: string }> => {
  const { messageType, data, locale = 'hu' } = params;

  // 1. Check notification settings
  if (messageType === 'registration_confirmation') {
    const globalSettings = await getGlobalNotificationSettings();
    if (globalSettings.enableRegistrationEmails === false) {
      console.log(`[EMAIL SERVICE] Skipped email type "${messageType}" due to global settings.`);
      return { success: true, message: 'Skipped by global settings.' };
    }
  } else {
    const unit = data.unit;
    if (!unit) {
      console.warn(`[EMAIL SERVICE] Unit not provided for unit-specific email type "${messageType}". Sending without check.`);
    } else {
      const unitSettings = await getUnitNotificationSettings(unit.id);
      
      if (messageType === 'guest_reservation_confirmation' && unitSettings.notifications.enableGuestReservationEmails === false) {
        console.log(`[EMAIL SERVICE] Skipped "${messageType}" for unit ${unit.id} due to unit settings.`);
        return { success: true, message: 'Skipped by unit settings.' };
      }
      if (messageType === 'unit_new_reservation_notification' && unitSettings.notifications.enableUnitReservationEmails === false) {
        console.log(`[EMAIL SERVICE] Skipped "${messageType}" for unit ${unit.id} due to unit settings.`);
        return { success: true, message: 'Skipped by unit settings.' };
      }
      if (messageType === 'schedule_published_notification') {
        const user = data.user!;
        if (unitSettings.notifications.enableSchedulePublishEmails === false) {
          console.log(`[EMAIL SERVICE] Skipped "${messageType}" for unit ${unit.id} due to unit settings.`);
          return { success: true, message: 'Skipped by unit settings.' };
        }
        if (user.notifications?.newSchedule === false) {
            console.log(`[EMAIL SERVICE] Skipped "${messageType}" for user ${user.id} due to user's personal settings.`);
            return { success: true, message: 'Skipped by user settings.' };
        }
      }
    }
  }
  
  // 2. Determine recipient(s)
  let to: string | string[] | undefined;
  if (messageType === 'unit_new_reservation_notification' && data.unit) {
      const unitSettings = await getUnitNotificationSettings(data.unit.id);
      to = unitSettings.notificationEmails;
  } else if ('user' in data && data.user?.email) {
    to = data.user.email;
  } else if ('booking' in data && data.booking?.contact?.email) {
    to = data.booking.contact.email;
  }

  if (!to || (Array.isArray(to) && to.length === 0)) {
    console.warn(`[EMAIL SERVICE] No recipient found for message type "${messageType}".`);
    return { success: false, message: 'No recipient found.' };
  }

  // 3. Render email content
  const renderedContent = renderEmailTemplate(messageType, locale, data);
  if (!renderedContent) {
    console.error(`[EMAIL SERVICE] Failed to render template for message type "${messageType}".`);
    return { success: false, message: 'Template rendering failed.' };
  }

  const finalEmailParams: FinalEmailParams = { to, ...renderedContent };

  // 4. Send
  await sendViaProvider(finalEmailParams);
  
  return { success: true, message: 'Email processed.' };
};
