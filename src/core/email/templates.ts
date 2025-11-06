import { User, Booking, Unit } from '../models/data';
import { EmailMessageType } from '../api/emailService';

// The shape of the data payload for rendering templates
export type EmailTemplateData = {
    user?: User;
    weekLabel?: string;
    booking?: Booking;
    unit?: Unit;
    notificationEmails?: string[];
};

// --- Individual Template Functions ---

const registrationConfirmationTemplate = (data: EmailTemplateData, locale: 'hu' | 'en') => {
    const user = data.user!;
    const subject = locale === 'hu' ? `Üdv a MintLeaf rendszerében, ${user.firstName}!` : `Welcome to MintLeaf, ${user.firstName}!`;
    const html = `<h1>${locale === 'hu' ? `Üdvözlünk, ${user.firstName}!` : `Welcome, ${user.firstName}!`}</h1><p>${locale === 'hu' ? 'Sikeresen regisztráltál a MintLeaf rendszerébe.' : 'You have successfully registered for the MintLeaf system.'}</p>`;
    const text = `${locale === 'hu' ? `Üdvözlünk, ${user.firstName}!` : `Welcome, ${user.firstName}!`} ${locale === 'hu' ? 'Sikeresen regisztráltál a MintLeaf rendszerébe.' : 'You have successfully registered for the MintLeaf system.'}`;
    return { subject, html, text };
};

const guestReservationConfirmationTemplate = (data: EmailTemplateData, locale: 'hu' | 'en') => {
    const { booking, unit } = data;
    if (!booking || !unit) return null;
    const subject = locale === 'hu' ? `Foglalási kérés a ${unit.name} étterembe` : `Reservation request for ${unit.name}`;
    const html = `<p>${locale === 'hu' ? `Kedves ${booking.name},` : `Dear ${booking.name},`}</p><p>${locale === 'hu' ? 'Köszönjük foglalási kérését. Hamarosan jelentkezünk a megerősítéssel.' : 'Thank you for your reservation request. We will contact you soon with a confirmation.'}</p><p>${locale === 'hu' ? 'Azonosító' : 'Reference'}: ${booking.referenceCode}</p>`;
    const text = html.replace(/<[^>]*>?/gm, '');
    return { subject, html, text };
};

const unitNewReservationNotificationTemplate = (data: EmailTemplateData, locale: 'hu' | 'en') => {
    const { booking, unit } = data;
    if (!booking || !unit) return null;
    const subject = `Új foglalási kérés érkezett - ${unit.name}`;
    const html = `<p>Új foglalási kérés érkezett a(z) ${unit.name} egységbe.</p>
        <p><strong>Név:</strong> ${booking.name}</p>
        <p><strong>Létszám:</strong> ${booking.headcount} fő</p>
        <p><strong>Időpont:</strong> ${booking.startTime.toDate().toLocaleString('hu-HU')}</p>
        <p>A foglalás kezeléséhez lépj be a MintLeaf admin felületére.</p>`;
    const text = html.replace(/<[^>]*>?/gm, '');
    return { subject, html, text };
};

const schedulePublishedNotificationTemplate = (data: EmailTemplateData, locale: 'hu' | 'en') => {
    const { user, weekLabel } = data;
    if (!user || !weekLabel) return null;
    const subject = `Új beosztás a(z) ${weekLabel} hétre`;
    const html = `<h1>Szia ${user.firstName},</h1>
        <p>Publikálásra került a(z) <strong>${weekLabel}</strong> hétre vonatkozó beosztásod.</p>
        <p>A részletekért jelentkezz be a MintLeaf alkalmazásba.</p>`;
    const text = html.replace(/<[^>]*>?/gm, '');
    return { subject, html, text };
};

// --- Main Renderer Function ---

export const renderEmailTemplate = (
    messageType: EmailMessageType,
    locale: 'hu' | 'en',
    data: EmailTemplateData
): { subject: string, html: string, text: string } | null => {
    switch (messageType) {
        case 'registration_confirmation':
            return registrationConfirmationTemplate(data, locale);
        case 'guest_reservation_confirmation':
            return guestReservationConfirmationTemplate(data, locale);
        case 'unit_new_reservation_notification':
            return unitNewReservationNotificationTemplate(data, locale);
        case 'schedule_published_notification':
            return schedulePublishedNotificationTemplate(data, locale);
        default:
            console.error(`[EMAIL SERVICE] Unknown email template type: ${messageType}`);
            return null;
    }
};