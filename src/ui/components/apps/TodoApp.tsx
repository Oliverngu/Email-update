import React from 'react';
import { Todo, User, Unit } from '../../../core/models/data';

interface TodoAppProps {
    todos: Todo[];
    loading: boolean;
    error: string | null;
    currentUser: User;
    allUsers: User[];
    allUnits: Unit[];
    activeUnitIds: string[];
}

const TodoApp: React.FC<TodoAppProps> = (props) => {
    return (
        <div className="p-4 md:p-8">
            <h1 className="text-2xl font-bold">Teendők</h1>
            <p className="text-gray-600">Itt tudod kezelni a teendőket.</p>
        </div>
    );
};

export default TodoApp;
