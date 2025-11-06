import React from 'react';
import { Poll, User } from '../../../core/models/data';

interface PollListProps {
  currentUser: User;
  polls: Poll[];
  onSelectPoll: (pollId: string) => void;
}

const PollList: React.FC<PollListProps> = ({ polls, onSelectPoll }) => {
  return (
    <div className="space-y-4">
      {polls.length > 0 ? polls.map(poll => {
        const isClosed = poll.closesAt && poll.closesAt.toDate() < new Date();
        return (
            <div 
                key={poll.id} 
                onClick={() => onSelectPoll(poll.id)} 
                className="p-4 bg-white rounded-lg shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
            >
                <div className="flex justify-between items-center">
                    <p className="font-semibold text-lg text-gray-800">{poll.question}</p>
                    {isClosed && <span className="text-xs font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">Lezárva</span>}
                </div>
                <p className="text-sm text-gray-500 mt-1">Lezárul: {poll.closesAt ? poll.closesAt.toDate().toLocaleString('hu-HU') : 'Nincs határidő'}</p>
            </div>
        )
      }) : (
        <div className="text-center py-10 bg-white rounded-lg border">
            <p className="text-gray-600">Nincsenek szavazások a kiválasztott egység(ek)ben.</p>
        </div>
      )}
    </div>
  );
};

export default PollList;
