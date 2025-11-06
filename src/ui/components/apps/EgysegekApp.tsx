import React from 'react';
import { User, Unit } from '../../../core/models/data';

interface EgysegekAppProps {
    currentUser: User;
    allUnits: Unit[];
}

const EgysegekApp: React.FC<EgysegekAppProps> = (props) => {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800">Üzletek (Egységek) kezelése</h1>
            <p className="text-gray-600 mt-2">Hozd létre és szerkeszd a vállalkozásod üzleti egységeit.</p>
        </div>
    );
};
export default EgysegekApp;
