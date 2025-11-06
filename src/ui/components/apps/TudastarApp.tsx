import React from 'react';
import { User, Unit } from '../../../core/models/data';

interface TudastarAppProps {
    currentUser: User;
    allUnits: Unit[];
    activeUnitIds: string[];
}

const TudastarApp: React.FC<TudastarAppProps> = (props) => {
    return (
        <div className="p-4 md:p-8">
            <h1 className="text-2xl font-bold">Tudástár</h1>
            <p className="text-gray-600">Tudásbázis és dokumentumok.</p>
        </div>
    );
};

export default TudastarApp;
