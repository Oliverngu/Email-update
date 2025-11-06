import React from 'react';

interface ExportModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Exportálás</h2>
                    <button onClick={onClose} className="p-2">&times;</button>
                </div>
                <div className="mt-4">
                    <p>Exportálási beállítások itt.</p>
                </div>
            </div>
        </div>
    );
};

export default ExportModal;
