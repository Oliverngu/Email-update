import React, { useState } from 'react';
import { createPoll } from '../../../core/api/pollService';
import { PollOption, User } from '../../../core/models/data';
import { Timestamp } from '../../../core/firebase/config';
import TrashIcon from '../icons/TrashIcon';
import PlusIcon from '../icons/PlusIcon';

interface CreatePollProps {
  currentUser: User;
  onPollCreated: () => void;
}

const CreatePoll: React.FC<CreatePollProps> = ({ currentUser, onPollCreated }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<PollOption[]>([
    { id: String(Date.now() + 1), label: '' },
    { id: String(Date.now() + 2), label: '' },
  ]);
  const [multipleChoice, setMultipleChoice] = useState(false);
  const [closesAt, setClosesAt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index].label = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, { id: String(Date.now()), label: '' }]);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (question.trim() === '' || options.some(opt => opt.label.trim() === '')) {
      setError('A kérdést és az összes opciót ki kell tölteni.');
      return;
    }
    if (!currentUser.unitIds || currentUser.unitIds.length === 0) {
        setError('Nincs egységhez rendelve, nem hozhatsz létre szavazást.');
        return;
    }

    setIsLoading(true);
    try {
      await createPoll({
        question,
        options,
        multipleChoice,
        unitId: currentUser.unitIds[0], // Default to first unit
        closesAt: closesAt ? Timestamp.fromDate(new Date(closesAt)) : null,
      });
      onPollCreated();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Új szavazás létrehozása</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-semibold text-gray-700">Kérdés</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>
        <div>
          <label className="font-semibold text-gray-700">Opciók</label>
          {options.map((option, index) => (
            <div key={option.id} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={option.label}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                required
              />
              <button
                type="button"
                onClick={() => removeOption(index)}
                disabled={options.length <= 2}
                className="p-2 bg-red-100 text-red-600 rounded-md disabled:bg-gray-200 disabled:text-gray-500 hover:bg-red-200"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          ))}
          <button type="button" onClick={addOption} className="p-2 bg-blue-100 text-blue-700 rounded-md font-semibold text-sm flex items-center gap-1 hover:bg-blue-200">
            <PlusIcon className="h-5 w-5" />
            Opció hozzáadása
          </button>
        </div>
        <div>
          <label className="flex items-center gap-2 font-medium text-gray-700">
            <input
              type="checkbox"
              checked={multipleChoice}
              onChange={(e) => setMultipleChoice(e.target.checked)}
              className="h-4 w-4 rounded text-green-600 focus:ring-green-500"
            />
            Több válaszlehetőség engedélyezése
          </label>
        </div>
        <div>
          <label className="font-semibold text-gray-700">Lezárás időpontja (opcionális)</label>
          <input
            type="datetime-local"
            value={closesAt}
            onChange={(e) => setClosesAt(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        {error && <p className="text-red-500 font-semibold">{error}</p>}
        <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onPollCreated} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300">Mégse</button>
            <button type="submit" disabled={isLoading} className="bg-green-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-800 disabled:bg-gray-400">
                {isLoading ? 'Létrehozás...' : 'Szavazás létrehozása'}
            </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePoll;
