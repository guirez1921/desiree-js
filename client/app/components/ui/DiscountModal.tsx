import React from "react";

interface DiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  discounter: string;
}

const DiscountModal: React.FC<DiscountModalProps> = ({ isOpen, onClose, amount, discounter }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <div className="text-center">
          <div className="mb-4">
            <span className="inline-block bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm font-semibold">
              Payment Received
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-2">${amount.toFixed(2)} Paid by {discounter}!</h2>
          <p className="text-gray-700 mb-6">
            Good news! Another user, <span className="font-semibold text-azalea-600">{discounter}</span>, has paid <span className="font-semibold">${amount.toFixed(2)}</span> towards your order.<br />
            Shop away and enjoy your discount!
          </p>
          <button
            className="bg-azalea-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-azalea-700 transition"
            onClick={onClose}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscountModal;
