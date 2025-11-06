import React from 'react';
import { User, Unit } from '../../../core/models/data';
import PlusIcon from '../icons/PlusIcon';

interface FelhasznalokAppProps {
    currentUser: User;
    allUnits: Unit[];
}

const FelhasznalokApp: React.FC<FelhasznalokAppProps> = (props) => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Felhasználók kezelése</h1>
                    <p className="text-gray-600 mt-1">Fiókok, jogosultságok és egységekhez való hozzárendelések kezelése.</p>
                </div>
                <button className="bg-green-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-green-800">
                    <PlusIcon />
                    Új felhasználó
                </button>
            </div>
            <div className="mt-4 bg-white rounded-lg border shadow-sm flex items-center justify-center p-10">
                <p className="text-gray-500">A felhasználók listája itt fog megjelenni.</p>
            </div>
        </div>
    );
};
export default FelhasznalokApp;