import React from 'react';

interface AddBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddBookingModal: React.FC<AddBookingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Új foglalás</h2>
          <button onClick={onClose} className="p-2">&times;</button>
        </div>
        <div className="mt-4">
          <p>Új foglalás hozzáadása űrlap itt.</p>
        </div>
      </div>
    </div>
  );
};

export default AddBookingModal;
