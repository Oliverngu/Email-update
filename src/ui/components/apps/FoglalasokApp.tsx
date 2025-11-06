import React from 'react';
import { User, Unit } from '../../../core/models/data';
import PlusIcon from '../icons/PlusIcon';

interface FoglalasokAppProps {
    currentUser: User;
    canAddBookings: boolean;
    allUnits: Unit[];
    activeUnitIds: string[];
}

const FoglalasokApp: React.FC<FoglalasokAppProps> = ({ currentUser, canAddBookings, allUnits, activeUnitIds }) => {
    return (
        <div className="p-4 md:p-8 h-full flex flex-col">
             <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Foglalások</h1>
                    <p className="text-gray-600 mt-1">Tekintsd át a naptárat és kezeld a foglalásokat.</p>
                </div>
                {canAddBookings && (
                    <button className="bg-green-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-green-800">
                        <PlusIcon />
                        Új foglalás
                    </button>
                )}
            </div>
            <div className="flex-1 mt-4 bg-white rounded-lg border shadow-sm flex items-center justify-center">
                <p className="text-gray-500">A foglalási naptár itt fog megjelenni.</p>
            </div>
        </div>
    );
};

export default FoglalasokApp;