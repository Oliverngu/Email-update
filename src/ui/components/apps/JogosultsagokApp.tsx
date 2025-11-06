import React from 'react';
import { User } from '../../../core/models/data';

interface JogosultsagokAppProps {
    currentUser: User;
}

const JogosultsagokApp: React.FC<JogosultsagokAppProps> = (props) => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                 <div>
                    <h1 className="text-2xl font-bold text-gray-800">Jogosultságok kezelése</h1>
                    <p className="text-gray-600 mt-1">Itt tudod kezelni a jogosultságok teendőket.</p>
                </div>
                 <button className="bg-green-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-800">
                    Mentés
                </button>
            </div>
            <div className="mt-4 bg-white rounded-lg border shadow-sm flex items-center justify-center p-10">
                <p className="text-gray-500">A jogosultsági mátrix itt fog megjelenni.</p>
            </div>
        </div>
    );
};
export default JogosultsagokApp;