import React from "react";
import { XIcon } from "lucide-react";

interface CardModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (card: any) => void;
    card?: any;
}

export default function CardModal({ isOpen, onClose, onSave, card }: CardModalProps) {
    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const newCard = {
            name: formData.get("name"),
            number: formData.get("number"),
            expiry: formData.get("expiry"),
            cvv: formData.get("cvv"),
        };
        onSave(newCard);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-3xl flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl relative mx-auto">
                <button
                    type="button"
                    className="flex justify-end w-full text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    <XIcon size={24} />
                </button>
                <h2 className="text-xl font-semibold mb-4">
                    {card ? "Edit Card" : "Add Card"}
                </h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Cardholder Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Cardholder Name"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azalea-500 focus:border-azalea-500"
                            defaultValue={card?.name || ""}
                        />
                    </div>
                    <div>
                        <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                            Card Number
                        </label>
                        <input
                            id="number"
                            type="text"
                            name="number"
                            placeholder="Card Number"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azalea-500 focus:border-azalea-500"
                            defaultValue={card?.number || ""}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">
                                Expiration Date
                            </label>
                            <input
                                id="expiry"
                                type="text"
                                name="expiry"
                                placeholder="Expiration Date"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azalea-500 focus:border-azalea-500"
                                defaultValue={card?.expiry || ""}
                            />
                        </div>
                        <div>
                            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                                CVV
                            </label>
                            <input
                                id="cvv"
                                type="text"
                                name="cvv"
                                placeholder="CVV"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azalea-500 focus:border-azalea-500"
                                defaultValue={card?.cvv || ""}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-azalea-600 text-white py-2 px-4 rounded-md"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
