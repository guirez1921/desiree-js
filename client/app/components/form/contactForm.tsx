import { useRef, useState, useEffect } from "react";

interface ContactFormProps {
    onSuccess: () => void;
    onFailure: () => void;
    onClose: () => void;
}

export default function ContactForm({ onSuccess, onFailure, onClose }: ContactFormProps) {
    const form = useRef<HTMLFormElement>(null);

    const [formData, setFormData] = useState({
        name: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        address2: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
        ip_address: '',
        user_id: ''
    });

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

    const handleFormSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        try {
            const response = await fetch("https://desiree-server.vercel.app/api/contact-email", {
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
    };

    return (
        <form onSubmit={handleFormSubmit} className="space-y-3 md:space-y-6" ref={form}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:hidden">
                    <label htmlFor="name" className="block md:text-sm text-xs font-medium text-gray-700 md:mb-1 mb-0.5">
                        Name
                    </label>
                    <input id="name" name="name" type="text" value={formData.name} onChange={e => setFormData({
                        ...formData,
                        name: e.target.value
                    })} className="mt-1 block w-full border border-gray-300 rounded-md text-sm md:text-base shadow-sm md:py-2 md:px-3 focus:outline-none focus:ring-azalea-500 focus:border-azalea-500" />
                </div>
                <div className="md:block hidden">
                    <label htmlFor="firstName" className="block md:text-sm text-xs font-medium text-gray-700 md:mb-1 mb-0.5">
                        First Name
                    </label>
                    <input id="firstName" name="firstName" type="text" value={formData.firstName} onChange={e => setFormData({
                        ...formData,
                        firstName: e.target.value
                    })} className="mt-1 block w-full border border-gray-300 rounded-md text-sm md:text-base shadow-sm md:py-2 md:px-3 focus:outline-none focus:ring-azalea-500 focus:border-azalea-500" />
                </div>
                <div className="md:block hidden">
                    <label htmlFor="lastName" className="block md:text-sm text-xs font-medium text-gray-700 md:mb-1 mb-0.5">
                        Last Name
                    </label>
                    <input id="lastName" name="lastName" type="text" value={formData.lastName} onChange={e => setFormData({
                        ...formData,
                        lastName: e.target.value
                    })} className="mt-1 block w-full border border-gray-300 rounded-md text-sm md:text-base shadow-sm md:py-2 md:px-3 focus:outline-none focus:ring-azalea-500 focus:border-azalea-500" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="email" className="block md:text-sm text-xs font-medium text-gray-700 md:mb-1 mb-0.5">
                        Email
                    </label>
                    <input id="email" name="email" type="email" required value={formData.email} onChange={e => setFormData({
                        ...formData,
                        email: e.target.value
                    })} className="mt-1 block w-full border border-gray-300 rounded-md text-sm md:text-base shadow-sm md:py-2 md:px-3 focus:outline-none focus:ring-azalea-500 focus:border-azalea-500" />
                </div>
                <div>
                    <label htmlFor="phone" className="text-xs md:text-sm font-medium text-gray-700 md:mb-1 mb-0.5 flex items-center">
                        Phone <span className="text-gray-400 text-xs md:text-sm ml-1">(optional)</span>
                    </label>
                    <input id="phone" name="phone" type="tel" value={formData.phone} onChange={e => setFormData({
                        ...formData,
                        phone: e.target.value
                    })} className="mt-1 block w-full border border-gray-300 rounded-md text-sm md:text-base shadow-sm md:py-2 md:px-3 focus:outline-none focus:ring-azalea-500 focus:border-azalea-500" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="address" className="block md:text-sm text-xs font-medium text-gray-700 md:mb-1 mb-0.5">
                        Address 1
                    </label>
                    <input id="address" name="address" type="text" required value={formData.address} onChange={e => setFormData({
                        ...formData,
                        address: e.target.value
                    })} className="mt-1 block w-full border border-gray-300 rounded-md text-sm md:text-base shadow-sm md:py-2 md:px-3 focus:outline-none focus:ring-azalea-500 focus:border-azalea-500" />
                </div>
                <div>
                    <label htmlFor="address2" className=" text-xs md:text-sm font-medium text-gray-700 md:mb-1 mb-0.5 flex items-center">
                        Address 2 <span className="text-gray-400 text-xs md:text-sm ml-1">(optional)</span>
                    </label>
                    <input id="address2" name="address2" type="text" value={formData.address2} onChange={e => setFormData({
                        ...formData,
                        address2: e.target.value
                    })} className="mt-1 block w-full border border-gray-300 rounded-md text-sm md:text-base shadow-sm md:py-2 md:px-3 focus:outline-none focus:ring-azalea-500 focus:border-azalea-500" />
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="col-span-2">
                    <label htmlFor="city" className="block md:text-sm text-xs font-medium text-gray-700 md:mb-1 mb-0.5">
                        City
                    </label>
                    <input id="city" name="city" type="text" required value={formData.city} onChange={e => setFormData({
                        ...formData,
                        city: e.target.value
                    })} className="mt-1 block w-full border border-gray-300 rounded-md text-sm md:text-base shadow-sm md:py-2 md:px-3 focus:outline-none focus:ring-azalea-500 focus:border-azalea-500" />
                </div>
                <div>
                    <label htmlFor="state" className="block md:text-sm text-xs font-medium text-gray-700 md:mb-1 mb-0.5">
                        State
                    </label>
                    <input id="state" name="state" type="text" required value={formData.state} onChange={e => setFormData({
                        ...formData,
                        state: e.target.value
                    })} className="mt-1 block w-full border border-gray-300 rounded-md text-sm md:text-base shadow-sm md:py-2 md:px-3 focus:outline-none focus:ring-azalea-500 focus:border-azalea-500" />
                </div>
                <div>
                    <label htmlFor="zipCode" className="block md:text-sm text-xs font-medium text-gray-700 md:mb-1 mb-0.5">
                        ZIP Code
                    </label>
                    <input id="zipCode" name="zipCode" type="text" required value={formData.zipCode} onChange={e => setFormData({
                        ...formData,
                        zipCode: e.target.value
                    })} className="mt-1 block w-full border border-gray-300 rounded-md text-sm md:text-base shadow-sm md:py-2 md:px-3 focus:outline-none focus:ring-azalea-500 focus:border-azalea-500" />
                </div>
            </div>
            <div>
                <label htmlFor="country" className="block md:text-sm text-xs font-medium text-gray-700 md:mb-1 mb-0.5">
                    Country
                </label>
                <select id="country" name="country" value={formData.country} onChange={e => setFormData({
                    ...formData,
                    country: e.target.value
                })} className="mt-1 block w-full border border-gray-300 rounded-md text-sm md:text-base shadow-sm md:py-2 md:px-3 focus:outline-none focus:ring-azalea-500 focus:border-azalea-500">
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="Austria">Austria</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Bulgaria">Bulgaria</option>
                    <option value="Croatia">Croatia</option>
                    <option value="Republic of Cyprus">Republic of Cyprus</option>
                    <option value="Czech Republic">Czech Republic</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Estonia">Estonia</option>
                    <option value="Finland">Finland</option>
                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                    <option value="Greece">Greece</option>
                    <option value="Hungary">Hungary</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Italy">Italy</option>
                    <option value="Latvia">Latvia</option>
                    <option value="Lithuania">Lithuania</option>
                    <option value="Luxembourg">Luxembourg</option>
                    <option value="Malta">Malta</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Poland">Poland</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Romania">Romania</option>
                    <option value="Slovakia">Slovakia</option>
                    <option value="Slovenia">Slovenia</option>
                    <option value="Spain">Spain</option>
                    <option value="Sweden">Sweden</option>
                </select>
            </div>

            <input type="hidden" id="ip_address" name="ip_address" value={formData.ip_address} />
            <input type="hidden" id="user_id" name="user_id" value={localStorage.getItem("user_id") || ""} />

            <div className="flex justify-end space-x-4">
                <button type="button" onClick={onClose} className="px-3 md:px-6 text-sm md:text-base py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                    Cancel
                </button>
                <button type="submit" className="px-3 md:px-6 text-sm md:text-xs py-2 bg-azalea-600 text-white rounded-md hover:bg-azalea-700">
                    Continue to Payment
                </button>
            </div>
        </form>
    );
}
