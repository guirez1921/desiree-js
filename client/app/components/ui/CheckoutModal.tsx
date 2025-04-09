import { XIcon } from "lucide-react";
import { useState } from "react";
import type { CartItem } from "~/data/types";
import { toast } from "sonner"; // Import sonner for toast notifications
import ContactForm from "../form/contactForm"; // Import ContactForm
import CardForm from "../form/cardForm"; // Import CardForm

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    cart: CartItem[];
    shipping: number;
    tax: number;
}

export default function CheckoutModal({ isOpen, onClose, onSubmit, cart, shipping, tax }: CheckoutModalProps) {
    const [isOrderSummaryVisible, setIsOrderSummaryVisible] = useState(false);
    const [isCardInfoVisible, setIsCardInfoVisible] = useState(false);
    const [isPaymentUnsuccessful, setIsPaymentUnsuccessful] = useState(false);

    const handleBackToShipping = () => {
        setIsOrderSummaryVisible(false);
    };

    const handleProceedToPayment = () => {
        setIsCardInfoVisible(true);
    };

    const handleBackToOrderSummary = () => {
        setIsCardInfoVisible(false);
    };

    const handlePaymentFailure = () => {
        setIsPaymentUnsuccessful(true);
    };

    const handleTryAgain = () => {
        setIsPaymentUnsuccessful(false);
        setIsCardInfoVisible(true);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-2xl z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg w-full max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto relative">
                <button className="flex justify-end w-full text-gray-500 hover:text-gray-700 md:mt-4 md:pr-4 mt-2 pr-2">
                    <XIcon size={24} onClick={onClose} />
                </button>
                {isPaymentUnsuccessful ? (
                    <div className="md:p-6 p-4" id="payment-unsuccessful">
                        <h2 className="text-base md:text-lg font-bold mb-4 text-red-600">Payment Unsuccessful</h2>
                        <p className="text-gray-700 mb-6">Unfortunately, your payment could not be processed. Please try again.</p>
                        <div className="flex justify-end">
                            <button type="button" onClick={handleTryAgain} className="px-3 md:px-6 text-sm md:text-xs py-2 bg-azalea-600 text-white rounded-md hover:bg-azalea-700">
                                Try Again
                            </button>
                        </div>
                    </div>
                ) : isCardInfoVisible ? (
                    <div className="md:p-6 p-4" id="order-summary">
                        <h2 className="text-base md:text-lg font-bold mb-4">Payment Information</h2>
                        <CardForm
                            onBack={handleBackToOrderSummary}
                            onSuccess={() => {
                                toast.success("Payment submitted successfully!");
                                setIsCardInfoVisible(false);
                            }}
                            onFailure={handlePaymentFailure}
                            onClose={handleBackToOrderSummary}
                        />
                    </div>
                ) : isOrderSummaryVisible ? (
                    <div className="md:p-6 p-4" id="order-summary">
                        <h2 className="text-base md:text-lg font-bold mb-4">Order Summary</h2>
                        <div className="bg-gray-50 p-4 rounded-md shadow-sm">
                            <ul className="space-y-4">
                                {cart.map((item, index) => (
                                    <li key={index} className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium text-gray-800">{item.product?.name || 'Unknown Product'}</p>
                                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                        </div>
                                        <p className="font-medium text-gray-800">${((item.product?.price ?? 0) * item.quantity).toFixed(2)}</p>
                                    </li>
                                ))}
                                <li className="flex justify-between items-center">
                                    <p className="font-medium text-gray-800">Shipping</p>
                                    <p className="font-medium text-gray-800">${shipping.toFixed(2)}</p>
                                </li>
                                <li className="flex justify-between items-center">
                                    <p className="font-medium text-gray-800">Tax</p>
                                    <p className="font-medium text-gray-800">${tax.toFixed(2)}</p>
                                </li>
                                <li className="flex justify-between items-center border-t border-gray-300 pt-4">
                                    <p className="font-bold text-gray-800">Total</p>
                                    <p className="font-bold text-gray-800">
                                        ${(
                                            cart.reduce((total, item) => total + ((item.product?.price ?? 0) * item.quantity), 0) +
                                            shipping +
                                            tax
                                        ).toFixed(2)}
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <div className="flex justify-end space-x-4 mt-6">
                            <button type="button" onClick={handleBackToShipping} className="px-3 md:px-6 text-sm md:text-base py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                                Back
                            </button>
                            <button type="button" onClick={handleProceedToPayment} className="px-3 md:px-6 text-sm md:text-xs py-2 bg-azalea-600 text-white rounded-md hover:bg-azalea-700">
                                Proceed to Payment
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="md:p-6 p-4" id="order-summary">
                        <h2 className="text-base md:text-lg font-bold mb-4">Shipping Information</h2>
                        <ContactForm
                            onSuccess={() => {
                                toast.success("Shipping details submitted successfully!");
                                setIsOrderSummaryVisible(true);
                            }}
                            onFailure={() => toast.error("Failed to submit shipping details. Please try again.")}
                            onClose={onClose}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}