import React from 'react';
import { User, Unit, Feedback } from '../../../core/models/data';

interface VelemenyekAppProps {
    currentUser: User;
    allUnits: Unit[];
    activeUnitIds: string[];
    feedbackList: Feedback[];
}

const VelemenyekApp: React.FC<VelemenyekAppProps> = (props) => {
    return (
        <div className="p-4 md:p-8">
            <h1 className="text-2xl font-bold">Vélemények</h1>
            <p className="text-gray-600">Névtelen visszajelzések.</p>
        </div>
    );
};

export default VelemenyekApp;
