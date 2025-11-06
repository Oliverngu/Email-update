import React from 'react';
import { Todo, User } from '../../../core/models/data';
import PlusIcon from '../icons/PlusIcon';

interface AdminTodoAppProps {
    todos: Todo[];
    loading: boolean;
    error: string | null;
    currentUser: User;
}

const AdminTodoApp: React.FC<AdminTodoAppProps> = (props) => {
    return (
        <div className="p-4 md:p-8 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Vezetői Teendők</h1>
                    <p className="text-gray-600 mt-1">Központi, vezetői szintű feladatok listája.</p>
                </div>
                 <button className="bg-green-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-green-800">
                    <PlusIcon />
                    Új feladat
                </button>
            </div>
            <div className="flex-1 mt-4 bg-white rounded-lg border shadow-sm flex items-center justify-center">
                <p className="text-gray-500">A vezetői teendők listája itt fog megjelenni.</p>
            </div>
        </div>
    );
};

export default AdminTodoApp;