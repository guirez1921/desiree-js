import { HeartIcon, ShoppingBagIcon, ShoppingCartIcon, StarIcon, ThumbsUpIcon } from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";
import { useState } from "react";

export default function ProductCard({ product, customizable, onUpdate }: { product: any, customizable?: boolean, onUpdate?: () => void }) {
    const [isAnimating, setIsAnimating] = useState(false);

    function handleAddToCart(e: React.MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        setIsAnimating(true);

        // Retrieve existing cart from localStorage
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        // Check if the product already exists in the cart
        const existingProduct = cart.find((item: any) => item.id === product.id);

        if (existingProduct) {
            // Increment the quantity if the product exists
            existingProduct.quantity += 1;
            toast.success(`${product.name} is now ${existingProduct.quantity} in cart`, {
            icon: <ThumbsUpIcon size={16} className="text-azalea-600 hidden" />,
            style: {
                color: '#eb1750',
                textAlign: 'center',
            }
            });
        } else {
            // Add the current product to the cart if it doesn't exist
            cart.push({ id: product.id, quantity: 1, product: product });
            toast.success(`${product.name} added to cart!`, {
            icon: <ThumbsUpIcon size={16} className="text-azalea-600 hidden" />,
            style: {
                color: '#eb1750',
                textAlign: 'center',
            }
            });
        }

        // Save the updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        setTimeout(() => {setIsAnimating(false)}, 300); // Reset animation after 300ms
        if (onUpdate) onUpdate(); // Call the onUpdate function if provided
    }

    return (
        <Link to={`/product/${product.id}`} className="group">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition h-full">
                <div className="relative aspect-square bg-azalea-100">
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    {product.isNew && <div className="absolute top-2 left-2 bg-azalea-600 text-white text-xs font-bold px-2 py-1 rounded">
                        NEW
                    </div>}
                    {product.discount > 0 && <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        {product.discount}% OFF
                    </div>}
                    <button 
                        onClick={handleAddToCart} 
                        className={`absolute bottom-0 left-0 right-0 bg-azalea-600 text-white py-2 flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-opacity ${isAnimating ? 'animate-bounce' : ''}`}>
                        <ShoppingCartIcon size={18} className="mr-2" />
                        Add to Cart
                    </button>
                </div>
                <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                    <div className="flex items-center mb-2">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => <StarIcon key={i} size={14} className={i < product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />)}
                        </div>
                        <span className="ml-1 text-xs text-gray-500">
                            ({product.reviewCount})
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            {product.originalPrice > product.price ? <div className="flex items-center">
                                <span className="text-gray-500 line-through text-sm mr-2">
                                    ${product.originalPrice.toFixed(2)}
                                </span>
                                <span className="font-bold text-red-600">
                                    ${product.price.toFixed(2)}
                                </span>
                            </div> : <span className="font-bold">${product.price.toFixed(2)}</span>}
                        </div>
                        {(product.customizable && customizable) && <span className="text-xs bg-azalea-100 text-azalea-800 px-2 py-1 rounded">
                            Customizable
                        </span>}
                    </div>
                </div>
            </div>
        </Link>
    );
}