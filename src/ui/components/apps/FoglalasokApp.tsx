import React from 'react';
import { User, Unit } from '../../../core/models/data';

interface FoglalasokAppProps {
    currentUser: User;
    canAddBookings: boolean;
    allUnits: Unit[];
    activeUnitIds: string[];
}

const FoglalasokApp: React.FC<FoglalasokAppProps> = ({ currentUser, canAddBookings, allUnits, activeUnitIds }) => {
    return (
        <div className="p-4 md:p-8">
            <h1 className="text-2xl font-bold">Foglalások</h1>
            <p className="text-gray-600">Itt tudod kezelni a foglalásokat.</p>
        </div>
    );
};

export default FoglalasokApp;
