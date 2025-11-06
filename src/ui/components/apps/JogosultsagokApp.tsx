import React from 'react';
import { User } from '../../../core/models/data';

interface JogosultsagokAppProps {
    currentUser: User;
}

const JogosultsagokApp: React.FC<JogosultsagokAppProps> = (props) => {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800">Jogosultságok kezelése</h1>
            <p className="text-gray-600 mt-2">Állítsd be a különböző szerepkörökhöz (Admin, User, stb.) tartozó engedélyeket.</p>
        </div>
    );
};
export default JogosultsagokApp;
