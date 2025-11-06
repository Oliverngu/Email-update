import React, { useState, useEffect } from 'react';
import { User, Poll } from '../../../core/models/data';
import { useUnitContext } from '../../context/UnitContext';
import PollList from '../polls/PollList';
import PollDetail from '../polls/PollDetail';
import CreatePoll from '../polls/CreatePoll';
import PlusIcon from '../icons/PlusIcon';

interface PollsAppProps {
    currentUser: User;
    canCreatePolls: boolean;
    polls: Poll[];
}

const PollsApp: React.FC<PollsAppProps> = ({ currentUser, canCreatePolls, polls }) => {
    const { selectedUnits } = useUnitContext();
    const [view, setView] = useState<'list' | 'create' | 'detail'>('list');
    const [selectedPollId, setSelectedPollId] = useState<string | null>(null);

    const filteredPolls = polls.filter(poll => selectedUnits.includes(poll.unitId));
    
    useEffect(() => {
        setView('list');
        setSelectedPollId(null);
    }, [selectedUnits]);

    const handleSelectPoll = (pollId: string) => {
        setSelectedPollId(pollId);
        setView('detail');
    };

    const renderContent = () => {
        switch (view) {
            case 'create':
                return <CreatePoll currentUser={currentUser} onPollCreated={() => setView('list')} />;
            case 'detail':
                return <PollDetail pollId={selectedPollId!} currentUser={currentUser} onBack={() => setView('list')} />;
            case 'list':
            default:
                return <PollList currentUser={currentUser} polls={filteredPolls} onSelectPoll={handleSelectPoll} />;
        }
    };
    
    return (
        <div className="p-4 md:p-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Szavazások</h1>
                    <p className="text-gray-600 mt-1">Itt tudod kezelni a szavazások teendőket.</p>
                </div>
                {view === 'list' && canCreatePolls && (
                    <button onClick={() => setView('create')} className="bg-green-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-green-800">
                        <PlusIcon />
                        Új szavazás
                    </button>
                )}
            </div>
            {renderContent()}
        </div>
    );
};
export default PollsApp;