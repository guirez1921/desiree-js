import { ChevronLeftIcon, ChevronRightIcon, HeartIcon, ShieldIcon, ShoppingCartIcon, StarIcon, TruckIcon, ThumbsUpIcon } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";
import ProductCard from "~/components/product/ProductCard";
import { allProducts } from "~/data/mockData";
import type { Product } from "~/data/types";

export default function ProductDetails() {
    const {
        id
    } = useParams();
    const product: Product = allProducts.find(p => p.id === id) as Product || allProducts[0]; // Fallback to first product if not found
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : null);
    const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : null);
    const [customText, setCustomText] = useState('');
    const [isCustomizing, setIsCustomizing] = useState(false);
    // Get related products (same category)
    const relatedProducts = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
    const handleAddToCart = () => {
        // Retrieve existing cart from localStorage
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        // Check if the product already exists in the cart
        const existingProduct = cart.find((item: any) => item.id === product.id);

        if (existingProduct) {
            // Increment the quantity if the product exists
            existingProduct.quantity += quantity;
            toast.success(`${product.name} is now ${existingProduct.quantity} in cart`, {
                icon: <ThumbsUpIcon size={16} className="text-azalea-600 hidden" />,
                style: {
                    color: '#eb1750',
                    textAlign: 'center',
                }
            });
        } else {
            // Add the current product to the cart if it doesn't exist
            cart.push({
                id: product.id,
                quantity,
                product,
                color: selectedColor,
                size: selectedSize,
                customText: customText.trim() || null
            });
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
    };
    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumbs */}
                <div className="text-sm text-gray-500 mb-6">
                    <a href="/" className="hover:text-purple-600">
                        Home
                    </a>{' '}
                    /
                    <a href="/shop" className="hover:text-purple-600">
                        {' '}
                        Shop
                    </a>{' '}
                    /<span className="text-gray-900"> {product.name}</span>
                </div>
                {/* Product Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {/* Product Images */}
                    <div>
                        <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4 aspect-square">
                            <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
                            {product.images.length > 1 && <>
                                <button onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : product.images.length - 1)} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-azalea-100">
                                    <ChevronLeftIcon size={20} />
                                </button>
                                <button onClick={() => setSelectedImage(prev => prev < product.images.length - 1 ? prev + 1 : 0)} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-azalea-100">
                                    <ChevronRightIcon size={20} />
                                </button>
                            </>}
                        </div>
                        {product.images.length > 1 && <div className="grid grid-cols-5 gap-2">
                            {product.images.map((img, idx) => <div key={idx} className={`cursor-pointer rounded-lg overflow-hidden border-2 ${selectedImage === idx ? 'border-purple-600' : 'border-transparent'}`} onClick={() => setSelectedImage(idx)}>
                                <img src={img} alt={`${product.name} - view ${idx + 1}`} className="w-full h-full object-cover aspect-square" />
                            </div>)}
                        </div>}
                    </div>
                    {/* Product Info */}
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                        {/* Rating */}
                        <div className="flex items-center mb-4">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => <StarIcon key={i} size={18} className={i < product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />)}
                            </div>
                            <span className="ml-2 text-gray-600">
                                {product.reviewCount} reviews
                            </span>
                        </div>
                        {/* Price */}
                        <div className="text-2xl font-bold mb-6">
                            ${product.price.toFixed(2)}
                        </div>
                        {/* Description */}
                        <p className="text-gray-700 mb-6">{product.description}</p>
                        {/* Color Selection */}
                        {product.colors && <div className="mb-6">
                            <h3 className="font-medium mb-2">Color</h3>
                            <div className="w-10 h-10 rounded-full" style={{ backgroundColor: product.colors }}></div>
                        </div>}
                        {/* Size Selection */}
                        {product.sizes && <div className="mb-6">
                            <h3 className="font-medium mb-2">Size</h3>
                            <div className="flex flex-wrap gap-2">
                                {product.sizes.map(size => <button key={size} onClick={() => setSelectedSize(size)} className={`px-4 py-2 border rounded-md ${selectedSize === size ? 'border-purple-600 bg-purple-50 text-purple-600' : 'border-gray-300 text-gray-700 hover:border-gray-400'}`}>
                                    {size}
                                </button>)}
                            </div>
                        </div>}
                        {/* Customization */}
                        {product.customizable && <div className="mb-6">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-medium">Personalization</h3>
                                <button onClick={() => setIsCustomizing(!isCustomizing)} className="text-sm text-purple-600 hover:text-purple-700">
                                    {isCustomizing ? 'Cancel' : 'Add Custom Engraving'}
                                </button>
                            </div>
                            {isCustomizing && <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                <p className="text-sm text-gray-600 mb-2">
                                    Add a custom message (up to 20 characters)
                                </p>
                                <input type="text" value={customText} onChange={e => setCustomText(e.target.value.slice(0, 20))} placeholder="Enter your text here" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" />
                                <div className="flex justify-between mt-2 text-sm">
                                    <span>Characters: {customText.length}/20</span>
                                    <span className="text-purple-600">+$10.00</span>
                                </div>
                            </div>}
                        </div>}
                        {/* Quantity */}
                        <div className="mb-6">
                            <h3 className="font-medium mb-2">Quantity</h3>
                            <div className="flex items-center border border-gray-300 rounded-md w-32">
                                <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))} className="px-3 py-1 text-gray-600 hover:text-gray-800">
                                    -
                                </button>
                                <input type="number" min="1" value={quantity} onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="w-full text-center border-0 focus:ring-0" />
                                <button onClick={() => setQuantity(prev => prev + 1)} className="px-3 py-1 text-gray-600 hover:text-gray-800">
                                    +
                                </button>
                            </div>
                        </div>
                        {/* Add to Cart */}
                        <div className="flex flex-col sm:flex-row gap-3 mb-8">
                            <button onClick={handleAddToCart} className="flex-1 bg-azalea-600 hover:bg-azalea-700 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center transition">
                                <ShoppingCartIcon size={20} className="mr-2" />
                                Add to Cart
                            </button>
                            <button className="sm:w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center text-gray-600 hover:text-azalea-600 hover:border-azalea-600 transition">
                                <HeartIcon size={20} />
                            </button>
                        </div>
                        {/* Product Details */}
                        <div className="border-t border-gray-200 pt-6">
                            <div className="mb-4 flex items-start space-x-3">
                                <TruckIcon size={20} className="text-gray-500 mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-medium">Discreet Shipping</h4>
                                    <p className="text-sm text-gray-600">
                                        Plain packaging with no branding or identifying information
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <ShieldIcon size={20} className="text-gray-500 mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-medium">Body-Safe Materials</h4>
                                    <p className="text-sm text-gray-600">
                                        Made with premium, non-toxic, body-safe materials
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Product Details Tabs */}
                <div className="mb-16">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
                            <a href="#" className="border-b-2 border-azalea-600 py-4 px-1 text-sm font-medium text-azalea-600">
                                Description
                            </a>
                            <a href="#" className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                                Specifications
                            </a>
                            <a href="#" className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                                Reviews ({product.reviewCount})
                            </a>
                        </nav>
                    </div>
                    <div className="py-6">
                        <h3 className="text-lg font-medium mb-4">Product Description</h3>
                        <div className="prose max-w-none text-gray-700">
                            <p className="mb-4">
                                {product.fullDescription?.trim() || product.description}
                            </p>
                            <h4 className="font-medium text-lg mb-2">Features:</h4>
                            <ul className="list-disc pl-5 space-y-2 mb-4">
                                {product.features?.map((feature, idx) =>
                                    <li key={idx}>{feature}</li>) || <>
                                        <li>Premium body-safe materials</li>
                                        <li>Waterproof design for versatile use</li>
                                        <li>Rechargeable battery with long life</li>
                                        <li>Multiple intensity settings</li>
                                        <li>Easy to clean and maintain</li>
                                    </>
                                }
                            </ul>
                            <h4 className="font-medium text-lg mb-2">Care Instructions:</h4>
                            <p>
                                Clean thoroughly before and after each use with warm water and
                                mild soap or a specialized toy cleaner. Store in a cool, dry
                                place away from direct sunlight.
                            </p>
                        </div>
                    </div>
                </div>
                {/* Related Products */}
                <div>
                    <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedProducts.map(product => <ProductCard key={product.id} product={product} customizable />)}
                    </div>
                </div>
            </div>
        </div>
    );
}