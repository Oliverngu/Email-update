// src/core/api/settingsService.ts
import { db } from '../firebase/config';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

export const getUserNotificationSettings = async (userId: string) => {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
        return docSnap.data().notifications || {};
    }
    return {};
};

export const updateUserNotificationSettings = async (userId: string, settings: any) => {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
        notifications: settings
    });
};

// FIX: Add missing GlobalNotificationSettings interface for email service.
export interface GlobalNotificationSettings {
    enableRegistrationEmails: boolean;
    enableGuestReservationEmails: boolean;
    enableUnitReservationEmails: boolean;
    enableSchedulePublishEmails: boolean;
}

// FIX: Add missing getGlobalNotificationSettings function for email service.
export const getGlobalNotificationSettings = async (): Promise<GlobalNotificationSettings> => {
    const docRef = doc(db, 'global_settings', 'notifications');
    const docSnap = await getDoc(docRef);
    const defaults: GlobalNotificationSettings = {
        enableRegistrationEmails: true,
        enableGuestReservationEmails: true,
        enableUnitReservationEmails: true,
        enableSchedulePublishEmails: true,
    };
    if (docSnap.exists()) {
        return { ...defaults, ...docSnap.data() };
    }
    return defaults;
};
