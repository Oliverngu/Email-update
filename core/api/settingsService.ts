import { db } from '../../firebase/config';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';

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

// For global admin settings
export interface GlobalNotificationSettings {
    enableRegistrationEmails: boolean;
    enableGuestReservationEmails: boolean;
    enableUnitReservationEmails: boolean;
    enableSchedulePublishEmails: boolean;
}

export const getGlobalNotificationSettings = async (): Promise<GlobalNotificationSettings> => {
    const docRef = doc(db, 'global_settings', 'notifications');
    const docSnap = await getDoc(docRef);
    // Defaults if the doc doesn't exist
    const defaults: GlobalNotificationSettings = {
        enableRegistrationEmails: true,
        enableGuestReservationEmails: true,
        enableUnitReservationEmails: true,
        enableSchedulePublishEmails: true,
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
