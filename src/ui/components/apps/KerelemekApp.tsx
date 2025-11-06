import React from 'react';
import { Request, User } from '../../../core/models/data';
import PlusIcon from '../icons/PlusIcon';

interface KerelemekAppProps {
    requests: Request[];
    loading: boolean;
    error: string | null;
    currentUser: User;
    canManage: boolean;
}

const KerelemekApp: React.FC<KerelemekAppProps> = ({ requests, loading, error, currentUser, canManage }) => {
    return (
        <div className="p-4 md:p-8 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Szabadságkérelmek</h1>
                    <p className="text-gray-600 mt-1">Itt tudod kezelni a kérelmek teendőket.</p>
                </div>
                <button className="bg-green-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-green-800">
                    <PlusIcon />
                    Új kérelem
                </button>
            </div>
            <div className="flex-1 mt-4 bg-white rounded-lg border shadow-sm flex items-center justify-center">
                <p className="text-gray-500">A kérelmek listája itt fog megjelenni.</p>
            </div>
        </div>
    );
};

export default KerelemekApp;