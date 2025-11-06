import React from 'react';
import { User } from '../../../core/models/data';
import PlusIcon from '../icons/PlusIcon';

interface PoziciokAppProps {
    currentUser: User;
}

const PoziciokApp: React.FC<PoziciokAppProps> = (props) => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Pozíciók kezelése</h1>
                    <p className="text-gray-600 mt-1">Hozd létre és kezeld a különböző munkaköröket és pozíciókat.</p>
                </div>
                <button className="bg-green-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-green-800">
                    <PlusIcon />
                    Új pozíció
                </button>
            </div>
            <div className="mt-4 bg-white rounded-lg border shadow-sm flex items-center justify-center p-10">
                <p className="text-gray-500">A pozíciók listája itt fog megjelenni.</p>
            </div>
        </div>
    );
};
export default PoziciokApp;