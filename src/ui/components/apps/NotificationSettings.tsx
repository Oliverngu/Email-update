import React from 'react';
import { User } from '../../../core/models/data';

interface NotificationSettingsProps {
    currentUser: User;
    activeUnitId: string | null;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = (props) => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Értesítési beállítások</h1>
                    <p className="text-gray-600 mt-1">E-mail értesítések testreszabása a különböző eseményekhez.</p>
                </div>
                 <button className="bg-green-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-800">
                    Mentés
                </button>
            </div>
            <div className="mt-4 bg-white rounded-lg border shadow-sm p-6">
                <p className="text-gray-500 text-center p-4">Az értesítési beállítások űrlapja itt fog megjelenni.</p>
            </div>
        </div>
    );
};
export default NotificationSettings;