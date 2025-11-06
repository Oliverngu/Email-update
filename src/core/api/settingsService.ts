// src/core/api/settingsService.ts
import { db } from '../firebase/config';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { ReservationSetting } from '../models/data';

// For user-specific settings
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

// --- Unit-specific notification settings ---
export type UnitNotificationSettings = {
    notificationEmails: string[];
    notifications: {
        enableGuestReservationEmails: boolean;
        enableUnitReservationEmails: boolean;
        enableSchedulePublishEmails: boolean;
    };
};

export const getUnitNotificationSettings = async (unitId: string): Promise<UnitNotificationSettings> => {
    const docRef = doc(db, 'reservation_settings', unitId);
    const docSnap = await getDoc(docRef);
    
    const defaults: UnitNotificationSettings = {
        notificationEmails: [],
        notifications: {
            enableGuestReservationEmails: true,
            enableUnitReservationEmails: true,
            enableSchedulePublishEmails: true,
        },
    };

    if (docSnap.exists()) {
        const data = docSnap.data();
        return {
            notificationEmails: data.notificationEmails || defaults.notificationEmails,
            notifications: { ...defaults.notifications, ...(data.notifications || {}) },
        };
    }
    return defaults;
};

export const updateUnitNotificationSettings = async (unitId: string, settings: UnitNotificationSettings) => {
    const docRef = doc(db, 'reservation_settings', unitId);
    await setDoc(docRef, { 
        notificationEmails: settings.notificationEmails,
        notifications: settings.notifications 
    }, { merge: true });
};


// For global admin settings
export interface GlobalNotificationSettings {
    enableRegistrationEmails: boolean;
}

export const getGlobalNotificationSettings = async (): Promise<GlobalNotificationSettings> => {
    const docRef = doc(db, 'global_settings', 'notifications');
    const docSnap = await getDoc(docRef);
    const defaults: GlobalNotificationSettings = {
        enableRegistrationEmails: true,
    };
    if (docSnap.exists()) {
        // Merge defaults with saved data to handle missing fields
        return { ...defaults, ...docSnap.data() };
    }
    return defaults;
};

export const updateGlobalNotificationSettings = async (settings: Partial<GlobalNotificationSettings>) => {
    const docRef = doc(db, 'global_settings', 'notifications');
    await setDoc(docRef, settings, { merge: true });
};