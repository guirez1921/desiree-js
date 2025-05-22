import { ArrowRightIcon, LockIcon, ShoppingCartIcon, TrashIcon } from "lucide-react";
import { useState, useRef } from "react"; // Add useRef import
import { Link } from "react-router";
import ProductCard from "~/components/product/ProductCard";
import CheckoutModal from "~/components/ui/CheckoutModal";
import DiscountModal from "~/components/ui/DiscountModal";
import { allProducts, cartItems } from "~/data/mockData"; // Import allProduct
import type { CartItem, Product } from "~/data/types"; // Import Product type
import { useEffect } from "react";
import { useLocation } from "react-router";

export default function CartIndex() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const checkoutButtonRef = useRef<HTMLButtonElement>(null); // Create a ref for the checkout button
    const location = useLocation();
    const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
    const [discountAmount, setDiscountAmount] = useState<number | null>(null);
    const [discounter, setDiscounter] = useState<string | null>(null);

    const loadData = () => {
        const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]'); // Retrieve cart from localStorage
        setCart(cart); // Update state with retrieved cart items
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        // Parse query params
        const params = new URLSearchParams(location.search);
        const req = params.get('req');
        const id = params.get('id');
        if (req && id) {
            setDiscounter(req.charAt(0).toUpperCase() + req.slice(1));
            setDiscountAmount(Number(id)/1763528);
            setIsDiscountModalOpen(true);
        }
    }, [location.search]);

    const handleQuantityChange = (id: string, delta: number) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            );
            localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
            return updatedCart;
        });
    };

    const handleRemoveItem = (id: string) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.filter((item) => item.id !== id);
            localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
            return updatedCart;
        });
    };

    const subtotal = cart.reduce((sum, item) => sum + (item.product?.price ?? 0) * item.quantity, 0);
    const taxRate = 0.1; // Define tax rate

    // Calculate discounted subtotal if discount is present
    const hasDiscount = discountAmount && discounter;
    const discountedSubtotal = hasDiscount ? Math.max(0, subtotal - discountAmount) : subtotal;
    const shipping = discountedSubtotal > 100 ? 0 : 9.99;
    const tax = discountedSubtotal * taxRate;
    const total = discountedSubtotal + shipping + tax;

    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
    const recommendedProducts: Product[] = allProducts
        .map((product) => ({
            ...product,
            rating: typeof product.rating === 'string' ? parseFloat(product.rating) : product.rating,
            description: product.description === null ? undefined : product.description,
            fullDescription: product.fullDescription === null ? undefined : product.fullDescription,
            sizes: product.sizes === null ? undefined : product.sizes,
            colors: product.colors === null ? undefined : product.colors,
        }))
        .slice(0, 8); // Pick only the first 8 products

    function handleCheckout(data: any) {
        console.log('Checkout data:', data);
        setIsCheckoutModalOpen(false);
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-2xl font-bold mb-8">Your Cart</h1>
                {cart.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                                <div className="p-6">
                                    <h2 className="text-lg font-semibold mb-4">
                                        Cart Items ({cart.length})
                                    </h2>
                                    <div className="divide-y divide-gray-200">
                                        {cart.map((item) => (
                                            <div key={item.id} className="py-6 flex flex-col sm:flex-row">
                                                <div className="flex-shrink-0 w-full sm:w-24 h-24 bg-gray-100 rounded-md overflow-hidden mb-4 sm:mb-0">
                                                    {item.product && (
                                                        <img
                                                            src={item.product.images[0]}
                                                            alt={item.product.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex-1 sm:ml-6 flex flex-col">
                                                    <div className="flex justify-between">
                                                        <div>
                                                            <h3 className="text-base font-medium">
                                                                {item.product?.name ?? 'Unknown Product'}
                                                            </h3>
                                                            <p className="mt-1 text-sm text-gray-500">
                                                                Color: {item.color}
                                                            </p>
                                                            {item.customText && (
                                                                <p className="mt-1 text-sm text-gray-500">
                                                                    Custom Text: "{item.customText}"
                                                                </p>
                                                            )}
                                                        </div>
                                                        <p className="text-base font-medium">
                                                            ${((item.product?.price ?? 0)  * item.quantity).toFixed(2)}
                                                        </p>
                                                    </div>
                                                    <div className="mt-4 flex justify-between items-center">
                                                        <div className="flex items-center border border-gray-300 rounded-md w-24">
                                                            <button
                                                                className="px-2 py-1 text-gray-600 hover:text-gray-800"
                                                                onClick={() => handleQuantityChange(item.id, -1)}
                                                            >
                                                                -
                                                            </button>
                                                            <input
                                                                type="number"
                                                                min="1"
                                                                value={item.quantity}
                                                                className="w-full text-center border-0 focus:ring-0"
                                                                readOnly
                                                            />
                                                            <button
                                                                className="px-2 py-1 text-gray-600 hover:text-gray-800"
                                                                onClick={() => handleQuantityChange(item.id, 1)}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                        <button
                                                            className="text-red-600 hover:text-red-700 flex items-center cursor-pointer"
                                                            onClick={() => handleRemoveItem(item.id)} // Use handleRemoveItem
                                                        >
                                                            <TrashIcon size={18} className="mr-1" />
                                                            <span className="text-sm">Remove</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                                    <Link
                                        to="/shop"
                                        className="text-azalea-600 hover:text-azalea-700 font-medium flex items-center"
                                    >
                                        Continue Shopping
                                    </Link>
                                </div>
                            </div>
                            {/* Recommended Products */}
                            <div className="p-6">
                                <h2 className="text-lg font-semibold mb-4">Recommended for You</h2>
                                <div className="flex overflow-x-auto">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-[200vw] gap-6">
                                        {recommendedProducts.map((product) => (
                                            <ProductCard key={product.id} product={product} onUpdate={loadData} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Cart Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-24">
                                <div className="p-6">
                                    <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Subtotal</span>
                                            <span>${subtotal.toFixed(2)}</span>
                                        </div>
                                        {hasDiscount && (
                                            <div className="flex justify-between text-green-700">
                                                <span className="text-gray-600">Discount ({discounter})</span>
                                                <span>- ${discountAmount?.toFixed(2)}</span>
                                            </div>
                                        )}
                                        {hasDiscount && (<div className="flex justify-between font-semibold">
                                            <span className="text-gray-600">Subtotal After Discount</span>
                                            <span>${discountedSubtotal.toFixed(2)}</span>
                                        </div>)}
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Shipping</span>
                                            <span>
                                                {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Tax</span>
                                            <span>${tax.toFixed(2)}</span>
                                        </div>
                                        
                                        {shipping > 0 && <div className="text-sm text-gray-500 italic">
                                            Free shipping on orders over $100
                                        </div>}
                                        <div className="border-t border-gray-200 pt-4 flex justify-between font-semibold">
                                            <span>Total</span>
                                            <span>${total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <button
                                            ref={checkoutButtonRef} // Attach ref to the "Proceed to Checkout" button
                                            onClick={() => setIsCheckoutModalOpen(true)}
                                            className="w-full bg-azalea-600 text-white py-3 px-4 rounded-lg hover:bg-azalea-700 flex items-center justify-center font-medium transition"
                                        >
                                            Proceed to Checkout
                                            <ArrowRightIcon size={18} className="ml-2" />
                                        </button>
                                        <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                                            <LockIcon size={14} className="mr-1" />
                                            Secure checkout
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <h3 className="font-medium mb-2">We Accept</h3>
                                        <div className="flex space-x-2">
                                            <img
                                                src="https://static-00.iconduck.com/assets.00/visa-icon-256x79-nikia4dp.png"
                                                alt="Visa icon"
                                                className="w-12 h-8 object-contain"
                                            />
                                            <img
                                                src="https://static-00.iconduck.com/assets.00/discover-icon-256x164-eqyou03m.png"
                                                alt="Discover icon"
                                                className="w-12 h-8 object-contain"
                                            />
                                            <img
                                                src="https://static-00.iconduck.com/assets.00/mastercard-icon-256x153-5rbua5wm.png"
                                                alt="MasterCard icon"
                                                className="w-12 h-8 object-contain"
                                            />
                                            <img
                                                src="https://static-00.iconduck.com/assets.00/paypal-icon-256x69-ly7uqri4.png"
                                                alt="PayPal icon"
                                                className="w-12 h-8 object-contain"
                                            />
                                            <img
                                                src="https://static-00.iconduck.com/assets.00/verve-icon-512x322-zfukxtct.png"
                                                alt="PayPal icon"
                                                className="w-12 h-8 object-contain"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                        <div className="mb-6">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
                        <p className="text-gray-600 mb-8">
                            Looks like you haven't added any products to your cart yet.
                        </p>
                        <Link to="/shop" className="bg-purple-600 text-white hover:bg-purple-700 px-6 py-3 rounded-lg font-medium inline-block transition">
                            Start Shopping
                        </Link>
                    </div>
                )}
            </div>
            {/* Floating button for mobile view */}
            <button
                className="fixed bottom-4 right-4 bg-azalea-600 text-white p-4 rounded-full shadow-lg lg:hidden"
                onClick={() => checkoutButtonRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })} // Scroll to the checkout button
            >
                <ShoppingCartIcon size={24} />
            </button>
            <CheckoutModal
                isOpen={isCheckoutModalOpen}
                onClose={() => setIsCheckoutModalOpen(false)}
                onSubmit={handleCheckout}
                cart={cart}
                shipping={shipping}
                tax={tax} // Pass tax to CheckoutModal
                discounter={discounter || ''}
                discountAmount={discountAmount || 0} // Pass discountAmount to CheckoutModal
            />
            {isDiscountModalOpen && (
                <DiscountModal
                    isOpen={isDiscountModalOpen}
                    onClose={() => setIsDiscountModalOpen(false)}
                    amount={discountAmount || 0}
                    discounter={discounter || ''}
                />
            )}
        </div>
    );
}