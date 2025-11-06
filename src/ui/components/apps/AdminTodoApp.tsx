import React from 'react';
import { Todo, User } from '../../../core/models/data';

interface AdminTodoAppProps {
    todos: Todo[];
    loading: boolean;
    error: string | null;
    currentUser: User;
}

const AdminTodoApp: React.FC<AdminTodoAppProps> = (props) => {
    return (
        <div className="p-4 md:p-8">
            <h1 className="text-2xl font-bold">Vezetői Teendők</h1>
            <p className="text-gray-600">Itt tudod kezelni a vezetői teendőket.</p>
        </div>
    );
};

export default AdminTodoApp;
