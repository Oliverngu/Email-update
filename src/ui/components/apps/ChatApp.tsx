import React from 'react';
import { User, Unit } from '../../../core/models/data';

interface ChatAppProps {
    currentUser: User;
    allUsers: User[];
    allUnits: Unit[];
    activeUnitIds: string[];
}

const ChatApp: React.FC<ChatAppProps> = (props) => {
    return (
        <div className="p-4 md:p-8 h-full flex flex-col">
            <h1 className="text-2xl font-bold">Chat</h1>
            <div className="flex-1 mt-4 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Chat felület.</p>
            </div>
        </div>
    );
};

export default ChatApp;
