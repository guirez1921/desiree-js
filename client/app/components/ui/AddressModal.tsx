import React from "react";
import { XIcon } from "lucide-react";

interface AddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (address: any) => void;
    address?: any;
}

export default function AddressModal({ isOpen, onClose, onSave, address }: AddressModalProps) {
    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const newAddress = {
            name: formData.get("name"),
            street: formData.get("street"),
            city: formData.get("city"),
            state: formData.get("state"),
            zip: formData.get("zip"),
            country: formData.get("country"),
            phone: formData.get("phone"),
        };
        onSave(newAddress);
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
                    {address ? "Edit Address" : "Add Address"}
                </h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                First Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="First Name"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azalea-500 focus:border-azalea-500"
                                defaultValue={address?.name || ""}
                            />
                        </div>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Last Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Last Name"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azalea-500 focus:border-azalea-500"
                                defaultValue={address?.name || ""}
                            />
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
                                defaultValue={address?.email || ""}
                            />
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
                                defaultValue={address?.phone || ""}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                                Address 1
                            </label>
                            <input
                                id="street"
                                type="text"
                                name="street"
                                placeholder="Street Address"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azalea-500 focus:border-azalea-500"
                                defaultValue={address?.street || ""}
                            />
                        </div>
                        <div>
                            <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                                Address 2
                            </label>
                            <input
                                id="street"
                                type="text"
                                name="street"
                                placeholder="Apartment, Suite, etc."
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azalea-500 focus:border-azalea-500"
                                defaultValue={address?.street || ""}
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
                                defaultValue={address?.city || ""}
                            />
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
                                defaultValue={address?.state || ""}
                            />
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
                                defaultValue={address?.zip || ""}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                            Country
                        </label>
                        <select id="country" defaultValue={address?.country || ""} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azalea-500 focus:border-azalea-500">
                            <option value="United States">United States</option>
                            <option value="Canada">Canada</option>
                            <option value="United Kingdom">United Kingdom</option>
                            {/* Add more countries as needed */}
                        </select>
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
