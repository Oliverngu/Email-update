import React from 'react';
import { User, Unit } from '../../../core/models/data';

interface ReservationSettingsAppProps {
    currentUser: User;
    allUnits: Unit[];
}

const ReservationSettingsApp: React.FC<ReservationSettingsAppProps> = (props) => {
    return (
        <div className="p-4 md:p-8">
            <h1 className="text-2xl font-bold">Foglalási beállítások</h1>
            <p className="text-gray-600">Itt tudod kezelni a foglalási rendszert.</p>
        </div>
    );
};

export default ReservationSettingsApp;
