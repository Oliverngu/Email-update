import React, { useState, useEffect, useCallback } from 'react';
import { getUnitNotificationSettings, updateUnitNotificationSettings } from '../../core/api/settingsService';
import BellIcon from '@/ui/components/icons/BellIcon';
import LoadingSpinner from '@/ui/components/LoadingSpinner';

interface NotificationSettingsProps {
    unitId: string;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ unitId }) => {
    const [settings, setSettings] = useState<{
        notificationEmails: string[];
        notifications: {
            enableGuestReservationEmails: boolean;
            enableUnitReservationEmails: boolean;
            enableSchedulePublishEmails: boolean;
        }
    } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const settingLabels = {
        enableGuestReservationEmails: "Vendég foglalását megerősítő e-mailek",
        enableUnitReservationEmails: "Értesítés az üzletnek új foglalásról",
        enableSchedulePublishEmails: "Értesítés a felhasználóknak új beosztásról"
    };

    const fetchSettings = useCallback(async () => {
        setIsLoading(true);
        const currentSettings = await getUnitNotificationSettings(unitId);
        setSettings(currentSettings);
        setIsLoading(false);
    }, [unitId]);

    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    const handleToggle = (key: keyof typeof settingLabels) => {
        if (!settings) return;
        setSettings(prev => prev ? ({ 
            ...prev, 
            notifications: {
                ...prev.notifications,
                [key]: !prev.notifications[key]
            }
        }) : null);
    };
    
    const handleEmailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (!settings) return;
        const emails = e.target.value.split(/[\n,;]+/).map(email => email.trim()).filter(Boolean);
        setSettings(prev => prev ? ({ ...prev, notificationEmails: emails }) : null);
    };

    const handleSave = async () => {
        if (!settings) return;
        setIsSaving(true);
        try {
            await updateUnitNotificationSettings(unitId, settings);
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
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2"><BellIcon className="h-6 w-6" /> Egység e-mail értesítései</h3>
            <p className="text-gray-600 mt-1 mb-4">Itt lehet testreszabni az ehhez az egységhez kapcsolódó automatikus e-maileket.</p>
            
            <div className="p-4 bg-gray-50 rounded-lg border mb-6">
                <label htmlFor="notificationEmails" className="block text-sm font-medium text-gray-700 font-semibold mb-1">Értesítési e-mail címek</label>
                <p className="text-xs text-gray-500 mb-2">Ide küldjük az új foglalásokról szóló értesítéseket. Több címet vesszővel vagy új sorral válassz el.</p>
                <textarea
                    id="notificationEmails"
                    value={settings.notificationEmails.join('\n')}
                    onChange={handleEmailsChange}
                    rows={3}
                    className="w-full p-2 border rounded-md"
                    placeholder="pl. manager@email.com, recepciós@email.com"
                />
            </div>

            <div className="space-y-3">
                {Object.keys(settingLabels).map(key => (
                    <label key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700 font-medium">{settingLabels[key as keyof typeof settingLabels]}</span>
                         <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                            <input
                                type="checkbox"
                                checked={settings.notifications[key as keyof typeof settingLabels]}
                                onChange={() => handleToggle(key as keyof typeof settingLabels)}
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