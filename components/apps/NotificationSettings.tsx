import React, { useState, useEffect, useCallback } from 'react';
import { getGlobalNotificationSettings, updateGlobalNotificationSettings, GlobalNotificationSettings } from '../../core/api/settingsService';
import BellIcon from '../icons/BellIcon';
import LoadingSpinner from '../LoadingSpinner';

const NotificationSettings: React.FC = () => {
    const [settings, setSettings] = useState<GlobalNotificationSettings | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const settingLabels: Record<keyof GlobalNotificationSettings, string> = {
        enableRegistrationEmails: "Regisztrációt megerősítő e-mailek",
        enableGuestReservationEmails: "Vendég foglalását megerősítő e-mailek",
        enableUnitReservationEmails: "Értesítés az üzletnek új foglalásról",
        enableSchedulePublishEmails: "Értesítés a felhasználóknak új beosztásról"
    };

    const fetchSettings = useCallback(async () => {
        setIsLoading(true);
        const currentSettings = await getGlobalNotificationSettings();
        setSettings(currentSettings);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    const handleToggle = (key: keyof GlobalNotificationSettings) => {
        if (!settings) return;
        setSettings(prev => prev ? ({ ...prev, [key]: !prev[key] }) : null);
    };

    const handleSave = async () => {
        if (!settings) return;
        setIsSaving(true);
        try {
            await updateGlobalNotificationSettings(settings);
            alert('Beállítások mentve!');
        } catch (error) {
            alert('Hiba a mentés során.');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading || !settings) return <div className="relative h-48"><LoadingSpinner /></div>;

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2"><BellIcon className="h-6 w-6" /> Globális E-mail Értesítések</h3>
            <p className="text-gray-600 mt-1 mb-4">Itt lehet központilag ki- és bekapcsolni a rendszer által küldött automatikus e-maileket.</p>
            <div className="space-y-3">
                {Object.keys(settingLabels).map(key => (
                    <label key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700 font-medium">{settingLabels[key as keyof GlobalNotificationSettings]}</span>
                         <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                            <input
                                type="checkbox"
                                checked={settings[key as keyof GlobalNotificationSettings]}
                                onChange={() => handleToggle(key as keyof GlobalNotificationSettings)}
                                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                            />
                            <span className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></span>
                        </div>
                    </label>
                ))}
            </div>
            <button onClick={handleSave} disabled={isSaving} className="mt-6 w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400">
                {isSaving ? 'Mentés...' : 'Beállítások mentése'}
            </button>
        </div>
    );
};

export default NotificationSettings;
