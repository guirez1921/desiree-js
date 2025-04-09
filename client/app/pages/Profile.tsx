import { ClockIcon, CreditCardIcon, MapPinIcon, UserIcon } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import AddressModal from "../components/ui/AddressModal";
import CardModal from "../components/ui/CardModal";
import { useNavigate } from "react-router";

const cards = [
    { id: 1, name: "John Doe", number: "**** **** **** 4242", expiry: "12/24", cvv: "123" },
    { id: 2, name: "Jane Smith", number: "**** **** **** 5678", expiry: "11/25", cvv: "456" },
    { id: 3, name: "Alice Johnson", number: "**** **** **** 9012", expiry: "10/26", cvv: "789" },
];
const addresses = [
    { id: 1, name: "Home", street: "123 Main St", city: "New York", state: "NY", zip: "10001" },
    { id: 2, name: "Work", street: "456 Elm St", city: "Los Angeles", state: "CA", zip: "90001" },
    { id: 3, name: "Vacation", street: "789 Oak St", city: "Miami", state: "FL", zip: "33101" },
]

export default function Profile() {
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("auth");
        if (!auth) {
            navigate("/auth/register", { replace: true });
        }
    }, [navigate]);

    // Refs for each section
    const profileRef = useRef<HTMLDivElement>(null);
    const addressesRef = useRef<HTMLDivElement>(null);
    const paymentRef = useRef<HTMLDivElement>(null);
    const ordersRef = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState("profile");
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [isCardModalOpen, setIsCardModalOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [addressList, setAddressList] = useState(addresses);
    const [cardList, setCardList] = useState(cards);

    const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    const openAddressModal = (address: Address | null = null) => {
        setSelectedAddress(address);
        setIsAddressModalOpen(true);
    };

    const openCardModal = (card: Card | null = null) => {
        setSelectedCard(card);
        setIsCardModalOpen(true);
    };

    interface Address {
        id: number;
        name: string;
        street: string;
        city: string;
        state: string;
        zip: string;
    }

    const deleteAddress = (addressId: number) => {
        setAddressList((prev: Address[]) => prev.filter((address) => address.id !== addressId));
    };

    interface Card {
        id: number;
        name: string;
        number: string;
        expiry: string;
        cvv: string;
    }

    const deleteCard = (cardId: number) => {
        setCardList((prev: Card[]) => prev.filter((card) => card.id !== cardId));
    };

    interface NewAddress {
        name: string;
        street: string;
        city: string;
        state: string;
        zip: string;
    }

    const saveAddress = (newAddress: NewAddress) => {
        if (selectedAddress) {
            setAddressList((prev: Address[]) =>
                prev.map((address: Address) =>
                    address.id === selectedAddress.id ? { ...address, ...newAddress } : address
                )
            );
        } else {
            setAddressList((prev: Address[]) => [...prev, { id: Date.now(), ...newAddress }]);
        }
    };

    interface NewCard {
        name: string;
        number: string;
        expiry: string;
        cvv: string;
    }

    const saveCard = (newCard: NewCard) => {
        if (selectedCard) {
            setCardList((prev: Card[]) =>
                prev.map((card: Card) =>
                    card.id === selectedCard.id ? { ...card, ...newCard } : card
                )
            );
        } else {
            setCardList((prev: Card[]) => [...prev, { id: Date.now(), ...newCard }]);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections = [
                { ref: profileRef, name: "profile" },
                { ref: addressesRef, name: "addresses" },
                { ref: paymentRef, name: "payment" },
                { ref: ordersRef, name: "orders" },
            ];

            for (const section of sections) {
                const element = section.ref.current;
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const parentHeight = window.innerHeight;
                    const elementHeight = rect.height;
                    const elementTop = rect.top;
                    if (Math.abs((parentHeight - elementHeight)/2 - (elementTop)) <= elementHeight) {
                        setActiveTab(section.name);
                        break;
                    } else if (elementTop < 0) {
                        setActiveTab("profile");
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <AddressModal
                isOpen={isAddressModalOpen}
                onClose={() => setIsAddressModalOpen(false)}
                onSave={saveAddress}
                address={selectedAddress}
            />
            <CardModal
                isOpen={isCardModalOpen}
                onClose={() => setIsCardModalOpen(false)}
                onSave={saveCard}
                card={selectedCard}
            />
            <div className="bg-azalea-50 min-h-screen py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-bold text-azalea-600 mb-8">My Account</h1>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {/* Sidebar */}
                        <div className="md:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
                                <nav className="space-y-2">
                                    <button
                                        onClick={() => scrollToSection(profileRef)}
                                        className={`w-full flex items-center space-x-2 px-4 py-2 rounded-md ${
                                            activeTab === "profile"
                                                ? "bg-azalea-100 text-azalea-600"
                                                : "text-azalea-600 hover:bg-azalea-100"
                                        }`}
                                    >
                                        <UserIcon size={20} />
                                        <span>Profile</span>
                                    </button>
                                    <button
                                        onClick={() => scrollToSection(addressesRef)}
                                        className={`w-full flex items-center space-x-2 px-4 py-2 rounded-md ${
                                            activeTab === "addresses"
                                                ? "bg-azalea-100 text-azalea-600"
                                                : "text-azalea-600 hover:bg-azalea-100"
                                        }`}
                                    >
                                        <MapPinIcon size={20} />
                                        <span>Addresses</span>
                                    </button>
                                    <button
                                        onClick={() => scrollToSection(paymentRef)}
                                        className={`w-full flex items-center space-x-2 px-4 py-2 rounded-md ${
                                            activeTab === "payment"
                                                ? "bg-azalea-100 text-azalea-600"
                                                : "text-azalea-600 hover:bg-azalea-100"
                                        }`}
                                    >
                                        <CreditCardIcon size={20} />
                                        <span>Payment Methods</span>
                                    </button>
                                    <button
                                        onClick={() => scrollToSection(ordersRef)}
                                        className={`w-full flex items-center space-x-2 px-4 py-2 rounded-md ${
                                            activeTab === "orders"
                                                ? "bg-azalea-100 text-azalea-600"
                                                : "text-azalea-600 hover:bg-azalea-100"
                                        }`}
                                    >
                                        <ClockIcon size={20} />
                                        <span>Order History</span>
                                    </button>
                                </nav>
                            </div>
                        </div>
                        {/* Main Content */}
                        <div className="md:col-span-3 space-y-12">
                            <div ref={profileRef} className="bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-xl font-semibold text-azalea-600 mb-6">Profile Information</h2>
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                First Name
                                            </label>
                                            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azalea-500 focus:border-azalea-500" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Last Name
                                            </label>
                                            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azalea-500 focus:border-azalea-500" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Email
                                        </label>
                                        <input type="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azalea-500 focus:border-azalea-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Phone
                                        </label>
                                        <input type="tel" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-azalea-500 focus:border-azalea-500" />
                                    </div>
                                    <div className="flex justify-end">
                                        <button type="submit" className="bg-azalea-600 text-white py-2 px-4 rounded-md hover:bg-azalea-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-azalea-500">
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div ref={addressesRef} className="bg-white rounded-lg shadow-sm p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-semibold text-azalea-600">Saved Addresses</h2>
                                    <button
                                        onClick={() => openAddressModal()}
                                        className="bg-azalea-600 text-white py-2 px-4 rounded-md hover:bg-azalea-700 flex items-center space-x-2"
                                    >
                                        <MapPinIcon size={20} className="text-white" />
                                        <span>Add New Address</span>
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {addressList.map((address) => (
                                        <div key={address.id} className="border border-gray-200 rounded-lg p-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-medium">{address.name}</h3>
                                                    <p className="text-gray-600">{address.street}</p>
                                                    <p className="text-gray-600">{address.city}, {address.state} {address.zip}</p>
                                                </div>
                                                <div className="space-x-2">
                                                    <button
                                                        onClick={() => openAddressModal(address)}
                                                        className="text-azalea-600 hover:text-azalea-700"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => deleteAddress(address.id)}
                                                        className="text-gray-600 hover:text-gray-700"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div ref={paymentRef} className="bg-white rounded-lg shadow-sm p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-semibold text-azalea-600">Payment Methods</h2>
                                    <button
                                        onClick={() => openCardModal()}
                                        className="bg-azalea-600 text-white py-2 px-4 rounded-md hover:bg-azalea-700 flex items-center space-x-2"
                                    >
                                        <CreditCardIcon size={20} className="text-white" />
                                        <span>Add New Card</span>
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {cardList.map((card) => (
                                        <div key={card.id} className="border border-gray-200 rounded-lg p-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-medium">Visa ending in {card.number.slice(-4)}</h3>
                                                    <p className="text-gray-600">{card.name}</p>
                                                    <p className="text-gray-600">Expires {card.expiry}</p>
                                                </div>
                                                <div className="space-x-2">
                                                    <button
                                                        onClick={() => openCardModal(card)}
                                                        className="text-azalea-600 hover:text-azalea-700"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => deleteCard(card.id)}
                                                        className="text-gray-600 hover:text-gray-700"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div ref={ordersRef} className="bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-xl font-semibold text-azalea-600 mb-6">Order History</h2>
                                <div className="space-y-4">
                                    <div className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-medium">Order #12345</h3>
                                                <p className="text-gray-600">
                                                    Placed on March 15, 2024
                                                </p>
                                                <p className="text-gray-600">Total:$129.99</p>
                                                <p className="text-sm text-green-600">Delivered</p>
                                            </div>
                                            <button className="text-azalea-600 hover:text-azalea-700">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}