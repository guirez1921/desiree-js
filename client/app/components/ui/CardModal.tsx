import React, { useState } from "react";
import { XIcon } from "lucide-react";

function luhnCheck(cardNumber: string) {
    let sum = 0;
    let shouldDouble = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber[i]);
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
}

interface CardModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (card: any) => void;
    card?: any;
}

export default function CardModal({ isOpen, onClose, onSave, card }: CardModalProps) {
    const [cardState, setCardState] = useState({
        name: card?.name || "",
        number: card?.number || "",
        expiry: card?.expiry || "",
        cvv: card?.cvv || ""
    });
    const [errors, setErrors] = useState({
        name: "",
        number: "",
        expiry: "",
        cvv: ""
    });
    const [touched, setTouched] = useState({
        name: false,
        number: false,
        expiry: false,
        cvv: false
    });

    if (!isOpen) return null;

    const formatCardNumber = (value: string) => {
        return value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
    };

    const validate = (field: string, value: string) => {
        switch (field) {
            case "name":
                return value.trim() ? "" : "Cardholder name is required.";
            case "number": {
                const digits = value.replace(/\s/g, "");
                if (!digits) return "Card number is required.";
                if (!/^\d{16}$/.test(digits)) return "Card number must be 16 digits.";
                if (!luhnCheck(digits)) return "Invalid card number.";
                return "";
            }
            case "expiry":
                if (!value) return "Expiration date is required.";
                if (!/^(0[1-9]|1[0-2])\/(\d{2})$/.test(value)) return "Format MM/YY.";
                // Check if expired
                const [month, year] = value.split("/").map(Number);
                const now = new Date();
                const exp = new Date(2000 + year, month - 1, 1);
                if (exp < new Date(now.getFullYear(), now.getMonth(), 1)) return "Card expired.";
                return "";
            case "cvv":
                if (!value) return "CVV is required.";
                if (!/^\d{3,4}$/.test(value)) return "CVV must be 3 or 4 digits.";
                return "";
            default:
                return "";
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let newValue = value;
        if (name === "number") newValue = formatCardNumber(value);
        if (name === "expiry") newValue = value.replace(/[^\d/]/g, "").replace(/^(\d{2})(\d{1,2})/, "$1/$2").slice(0, 5);
        setCardState((prev) => ({ ...prev, [name]: newValue }));
        setTouched((prev) => ({ ...prev, [name]: true }));
        setErrors((prev) => ({ ...prev, [name]: validate(name, newValue) }));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = {
            name: validate("name", cardState.name),
            number: validate("number", cardState.number),
            expiry: validate("expiry", cardState.expiry),
            cvv: validate("cvv", cardState.cvv)
        };
        setErrors(newErrors);
        setTouched({ name: true, number: true, expiry: true, cvv: true });
        if (Object.values(newErrors).every((err) => !err)) {
            onSave(cardState);
            onClose();
        }
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
                <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
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
                            value={cardState.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.name && errors.name && (
                            <p className="text-xs text-red-600 mt-1">{errors.name}</p>
                        )}
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
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azalea-500 focus:border-azalea-500 tracking-widest"
                            value={cardState.number}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            maxLength={19}
                        />
                        {touched.number && errors.number && (
                            <p className="text-xs text-red-600 mt-1">{errors.number}</p>
                        )}
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
                                placeholder="MM/YY"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azalea-500 focus:border-azalea-500"
                                value={cardState.expiry}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                maxLength={5}
                            />
                            {touched.expiry && errors.expiry && (
                                <p className="text-xs text-red-600 mt-1">{errors.expiry}</p>
                            )}
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
                                value={cardState.cvv}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                maxLength={4}
                            />
                            {touched.cvv && errors.cvv && (
                                <p className="text-xs text-red-600 mt-1">{errors.cvv}</p>
                            )}
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
