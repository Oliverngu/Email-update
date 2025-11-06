import React from 'react';
import { User } from '../../../core/models/data';

interface PoziciokAppProps {
    currentUser: User;
}

const PoziciokApp: React.FC<PoziciokAppProps> = (props) => {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800">Pozíciók kezelése</h1>
            <p className="text-gray-600 mt-2">Hozd létre és kezeld a különböző munkaköröket és pozíciókat.</p>
        </div>
    );
};
export default PoziciokApp;
