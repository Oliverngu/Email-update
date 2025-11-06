import React from 'react';
import { User } from '../../../core/models/data';

interface ContactsAppProps {
    currentUser: User;
    canManage: boolean;
    canViewAll: boolean;
}

const ContactsApp: React.FC<ContactsAppProps> = (props) => {
    return (
        <div className="p-4 md:p-8">
            <h1 className="text-2xl font-bold">Elérhetőségek</h1>
            <p className="text-gray-600">Itt tudod kezelni a kontaktokat.</p>
        </div>
    );
};

export default ContactsApp;
