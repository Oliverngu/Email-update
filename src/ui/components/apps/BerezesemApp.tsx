import React from 'react';
import { User, Shift, TimeEntry, Unit } from '../../../core/models/data';

interface BerezesemAppProps {
    currentUser: User;
    schedule: Shift[];
    activeUnitIds: string[];
    timeEntries: TimeEntry[];
    allUnits: Unit[];
}

const BerezesemApp: React.FC<BerezesemAppProps> = (props) => {
    return (
        <div className="p-4 md:p-8">
            <h1 className="text-2xl font-bold">Bérezésem / Óraszámok</h1>
            <p className="text-gray-600">Bérkalkuláció és munkaórák.</p>
        </div>
    );
};

export default BerezesemApp;
