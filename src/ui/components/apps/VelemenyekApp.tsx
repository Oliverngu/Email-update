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
        <div className="p-4 md:p-8 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Névtelen Visszajelzések</h1>
                    <p className="text-gray-600 mt-1">A munkatársak által beküldött anonim vélemények és javaslatok.</p>
                </div>
            </div>
            <div className="flex-1 mt-4 bg-white rounded-lg border shadow-sm flex items-center justify-center">
                <p className="text-gray-500">A visszajelzések listája itt fog megjelenni.</p>
            </div>
        </div>
    );
};

export default VelemenyekApp;