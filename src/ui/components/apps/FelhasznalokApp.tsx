import React from 'react';
import { User, Unit } from '../../../core/models/data';

interface FelhasznalokAppProps {
    currentUser: User;
    allUnits: Unit[];
}

const FelhasznalokApp: React.FC<FelhasznalokAppProps> = (props) => {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800">Felhasználók kezelése</h1>
            <p className="text-gray-600 mt-2">Itt tudod kezelni a felhasználói fiókokat, jogosultságokat és egységekhez való hozzárendeléseket.</p>
        </div>
    );
};
export default FelhasznalokApp;
