import React from 'react';
import { User, Unit } from '../../../core/models/data';

interface MeghivokAppProps {
    currentUser: User;
    allUnits: Unit[];
}

const MeghivokApp: React.FC<MeghivokAppProps> = (props) => {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800">Meghívók kezelése</h1>
            <p className="text-gray-600 mt-2">Generálj és kezelj regisztrációs kódokat új felhasználók számára.</p>
        </div>
    );
};
export default MeghivokApp;
