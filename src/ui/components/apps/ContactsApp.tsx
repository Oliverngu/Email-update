import React from 'react';
import { User } from '../../../core/models/data';
import PlusIcon from '../icons/PlusIcon';

interface ContactsAppProps {
    currentUser: User;
    canManage: boolean;
    canViewAll: boolean;
}

const ContactsApp: React.FC<ContactsAppProps> = (props) => {
    return (
        <div className="p-4 md:p-8 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Elérhetőségek</h1>
                    <p className="text-gray-600 mt-1">Itt tudod kezelni a kontaktok teendőket.</p>
                </div>
                {props.canManage && (
                    <button className="bg-green-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-green-800">
                        <PlusIcon />
                        Új kontakt
                    </button>
                )}
            </div>
            <div className="flex-1 mt-4 bg-white rounded-lg border shadow-sm flex items-center justify-center">
                <p className="text-gray-500">A kontaktok listája itt fog megjelenni.</p>
            </div>
        </div>
    );
};

export default ContactsApp;