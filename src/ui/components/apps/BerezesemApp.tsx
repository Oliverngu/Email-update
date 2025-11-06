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
        <div className="p-4 md:p-8 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Munkaórák és Bér</h1>
                    <p className="text-gray-600 mt-1">Részletes bontás a ledolgozott órákról és a becsült bérről.</p>
                </div>
            </div>
            <div className="flex-1 mt-4 bg-white rounded-lg border shadow-sm flex items-center justify-center">
                <p className="text-gray-500">Az óraelszámolás és bérkalkuláció itt fog megjelenni.</p>
            </div>
        </div>
    );
};

export default BerezesemApp;