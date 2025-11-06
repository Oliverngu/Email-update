import React from 'react';
import { Request, User } from '../../../core/models/data';

interface KerelemekAppProps {
    requests: Request[];
    loading: boolean;
    error: string | null;
    currentUser: User;
    canManage: boolean;
}

const KerelemekApp: React.FC<KerelemekAppProps> = ({ requests, loading, error, currentUser, canManage }) => {
    return (
        <div className="p-4 md:p-8">
            <h1 className="text-2xl font-bold">Kérelmek</h1>
            <p className="text-gray-600">Itt tudod kezelni a szabadságkérelmeidet.</p>
        </div>
    );
};

export default KerelemekApp;
