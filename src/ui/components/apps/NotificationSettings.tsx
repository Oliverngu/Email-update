import React from 'react';
import { User } from '../../../core/models/data';

interface NotificationSettingsProps {
    currentUser: User;
    activeUnitId: string | null;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = (props) => {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800">Értesítési beállítások</h1>
            <p className="text-gray-600 mt-2">E-mail értesítések testreszabása egységenként (pl. új foglalásról szóló értesítők).</p>
        </div>
    );
};
export default NotificationSettings;
