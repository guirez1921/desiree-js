import React from 'react';

interface WarningModalProps {
    open: boolean;
    onClose: () => void;
    action: 'add' | 'remove';
}

const WarningModal: React.FC<WarningModalProps> = ({ open, onClose, action }) => {
    if (!open) return null;

    const message =
        action === 'add'
            ? "You are adding items to a custom order. This may change the order's price and specifications. Do you want to continue?"
            : "You are removing items from your order. This may affect the order's price and specifications. Do you want to continue?";

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[1000]"
        >
            <div
                className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg"
            >
                <h2 className="text-2xl text-amber-600 mb-4 font-semibold">Warning</h2>
                <p className="mb-6">{message}</p>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WarningModal;