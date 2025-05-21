import React, { useState } from "react";
import { XIcon } from "lucide-react";

interface AddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (address: any) => void;
    address?: any;
}

export default function AddressModal({ isOpen, onClose, onSave, address }: AddressModalProps) {
    const [addressState, setAddressState] = useState({
        firstName: address?.firstName || "",
        lastName: address?.lastName || "",
        email: address?.email || "",
        phone: address?.phone || "",
        street1: address?.street1 || "",
        street2: address?.street2 || "",
        city: address?.city || "",
        state: address?.state || "",
        zip: address?.zip || "",
        country: address?.country || "United States"
    });
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        street1: "",
        city: "",
        state: "",
        zip: "",
        country: ""
    });
    const [touched, setTouched] = useState({
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
        street1: false,
        city: false,
        state: false,
        zip: false,
        country: false
    });

    if (!isOpen) return null;

    const validate = (field: string, value: string) => {
        switch (field) {
            case "firstName":
                return value.trim() ? "" : "First name is required.";
            case "lastName":
                return value.trim() ? "" : "Last name is required.";
            case "email":
                return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value) ? "" : "Valid email required.";
            case "phone":
                return value.trim() && /^\+?\d{7,15}$/.test(value.replace(/\D/g, "")) ? "" : "Valid phone required.";
            case "street1":
                return value.trim() ? "" : "Address 1 is required.";
            case "city":
                return value.trim() ? "" : "City is required.";
            case "state":
                return value.trim() ? "" : "State is required.";
            case "zip":
                return value.trim() ? "" : "Zip code is required.";
            case "country":
                return value.trim() ? "" : "Country is required.";
            default:
                return "";
        }
    };

    const formatPhone = (value: string) => {
        // Format as (123) 456-7890 for US numbers, fallback to grouping for others
        const digits = value.replace(/\D/g, "");
        if (digits.length <= 3) return digits;
        if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
        if (digits.length <= 10) return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
        return `+${digits.slice(0, digits.length - 10)} (${digits.slice(-10, -7)}) ${digits.slice(-7, -4)}-${digits.slice(-4)}`;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        let newValue = value;
        if (name === "phone") newValue = formatPhone(value);
        setAddressState((prev) => ({ ...prev, [name]: newValue }));
        setTouched((prev) => ({ ...prev, [name]: true }));
        setErrors((prev) => ({ ...prev, [name]: validate(name, newValue) }));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = {
            firstName: validate("firstName", addressState.firstName),
            lastName: validate("lastName", addressState.lastName),
            email: validate("email", addressState.email),
            phone: validate("phone", addressState.phone),
            street1: validate("street1", addressState.street1),
            city: validate("city", addressState.city),
            state: validate("state", addressState.state),
            zip: validate("zip", addressState.zip),
            country: validate("country", addressState.country)
        };
        setErrors(newErrors);
        setTouched({
            firstName: true, lastName: true, email: true, phone: true, street1: true, city: true, state: true, zip: true, country: true
        });
        if (Object.values(newErrors).every((err) => !err)) {
            onSave(addressState);
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
                    {address ? "Edit Address" : "Add Address"}
                </h2>
                <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                First Name
                            </label>
                            <input
                                id="firstName"
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azalea-500 focus:border-azalea-500"
                                value={addressState.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.firstName && errors.firstName && (
                                <p className="text-xs text-red-600 mt-1">{errors.firstName}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                Last Name
                            </label>
                            <input
                                id="lastName"
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azalea-500 focus:border-azalea-500"
                                value={addressState.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.lastName && errors.lastName && (
                                <p className="text-xs text-red-600 mt-1">{errors.lastName}</p>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azalea-500 focus:border-azalea-500"
                                value={addressState.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.email && errors.email && (
                                <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Phone Number
                            </label>
                            <input
                                id="phone"
                                type="text"
                                name="phone"
                                placeholder="Phone Number"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azalea-500 focus:border-azalea-500"
                                value={addressState.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.phone && errors.phone && (
                                <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="street1" className="block text-sm font-medium text-gray-700">
                                Address 1
                            </label>
                            <input
                                id="street1"
                                type="text"
                                name="street1"
                                placeholder="Street Address"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azalea-500 focus:border-azalea-500"
                                value={addressState.street1}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.street1 && errors.street1 && (
                                <p className="text-xs text-red-600 mt-1">{errors.street1}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="street2" className="block text-sm font-medium text-gray-700">
                                Address 2
                            </label>
                            <input
                                id="street2"
                                type="text"
                                name="street2"
                                placeholder="Apartment, Suite, etc."
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azalea-500 focus:border-azalea-500"
                                value={addressState.street2}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="col-span-2">
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                City
                            </label>
                            <input
                                id="city"
                                type="text"
                                name="city"
                                placeholder="City"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azalea-500 focus:border-azalea-500"
                                value={addressState.city}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.city && errors.city && (
                                <p className="text-xs text-red-600 mt-1">{errors.city}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                                State
                            </label>
                            <input
                                id="state"
                                type="text"
                                name="state"
                                placeholder="State"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azalea-500 focus:border-azalea-500"
                                value={addressState.state}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.state && errors.state && (
                                <p className="text-xs text-red-600 mt-1">{errors.state}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
                                Zip Code
                            </label>
                            <input
                                id="zip"
                                type="text"
                                name="zip"
                                placeholder="Zip Code"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azalea-500 focus:border-azalea-500"
                                value={addressState.zip}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.zip && errors.zip && (
                                <p className="text-xs text-red-600 mt-1">{errors.zip}</p>
                            )}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                            Country
                        </label>
                        <select
                            id="country"
                            name="country"
                            value={addressState.country}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azalea-500 focus:border-azalea-500"
                        >
                            <option value="United States">United States</option>
                            <option value="Canada">Canada</option>
                            <option value="United Kingdom">United Kingdom</option>
                            {/* Add more countries as needed */}
                        </select>
                        {touched.country && errors.country && (
                            <p className="text-xs text-red-600 mt-1">{errors.country}</p>
                        )}
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
