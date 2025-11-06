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
        <div className="h-full flex">
            {/* Sidebar for conversations */}
            <aside className="w-1/3 bg-white border-r flex flex-col">
                <div className="p-4 border-b">
                    <input type="text" placeholder="Keresés..." className="w-full p-2 border rounded-lg" />
                </div>
                <div className="flex-1 overflow-y-auto">
                    {/* Placeholder for conversation list */}
                    <div className="p-4 hover:bg-gray-100 cursor-pointer border-b">
                        <p className="font-semibold">Általános Csatorna</p>
                        <p className="text-sm text-gray-500 truncate">Szia, mindenki! Hogy telt a hétvége?</p>
                    </div>
                     <div className="p-4 hover:bg-gray-100 cursor-pointer border-b">
                        <p className="font-semibold">Teszt Eszter</p>
                        <p className="text-sm text-gray-500 truncate">Rendben, köszi!</p>
                    </div>
                </div>
            </aside>
            {/* Main chat window */}
            <main className="w-2/3 flex flex-col">
                <header className="p-4 border-b bg-white flex items-center">
                    <h2 className="text-xl font-bold text-gray-800">Általános Csatorna</h2>
                </header>
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                    {/* Placeholder for messages */}
                    <div className="text-center text-gray-400">A beszélgetések itt jelennek meg.</div>
                </div>
                <footer className="p-4 bg-white border-t">
                    <input type="text" placeholder="Írj üzenetet..." className="w-full p-2 border rounded-lg" />
                </footer>
            </main>
        </div>
    );
};

export default ChatApp;