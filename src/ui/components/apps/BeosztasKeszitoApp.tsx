import React from 'react';
import { Shift, Request, User, Unit } from '../../../core/models/data';

interface BeosztasAppProps {
    schedule: Shift[];
    requests: Request[];
    currentUser: User;
    canManage: boolean;
    allUnits: Unit[];
    activeUnitIds: string[];
}

export const BeosztasApp: React.FC<BeosztasAppProps> = ({ schedule, requests, currentUser, canManage, allUnits, activeUnitIds }) => {
    return (
        <div className="p-4 md:p-8">
            <h1 className="text-2xl font-bold">Beosztás</h1>
            <p className="text-gray-600">Itt tudod kezelni a beosztást.</p>
        </div>
    );
};
