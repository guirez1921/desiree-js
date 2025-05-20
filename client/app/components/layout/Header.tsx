import { MenuIcon, SearchIcon, ShoppingCartIcon, UserIcon, XIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { allProducts, cartItems } from "~/data/mockData";
import type { CartItem, Product } from "~/data/types";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<Product[]>([]);

    const loadData = () => {
        const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]'); // Retrieve cart from localStorage
        setCartItems(cart); // Update state with retrieved cart items
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30);
        };
        loadData();
        window.addEventListener("scroll", handleScroll);
        const interval = setInterval(() => {
            loadData(); // reload every 5 seconds
        }, 5000);

        return () => {clearInterval(interval); window.removeEventListener("scroll", handleScroll);}; // Cleanup function to remove event listener and interval
    }, []);

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setSearchResults([]);
            return;
        }
        // Ensure all products have numeric rating for type safety
        const normalizedProducts = allProducts.map(product => ({
            ...product,
            rating: typeof product.rating === "string" ? parseFloat(product.rating) : product.rating,
        }));
        const results = normalizedProducts.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(results);
    }, [searchQuery]);

    const recommendedProducts: Product[] = allProducts
        .map(product => ({
            ...product,
            rating: typeof product.rating === "string" ? parseFloat(product.rating) : product.rating,
        }))
        .slice(0, 6); // Fetch first 6 products


    return (
        <header
            className={`${isScrolled ? "bg-white text-azalea-600" : "bg-azalea-600 text-white"
                } shadow-sm sticky top-0 z-50 transition-colors duration-300`}
        >
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center space-x-2">
                        <img
                            src={isScrolled ? "/assets/logo/noBgColor.png" : "/assets/logo/noBgWhite.png"}
                            alt="Discreet Delights Logo"
                            className="h-8 w-auto"
                        />
                    </Link>
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="hover:text-azalea-200 transition">
                            Home
                        </Link>
                        <Link to="/shop" className="hover:text-azalea-200 transition">
                            Shop
                        </Link>
                        <Link to="/about" className="hover:text-azalea-200 transition">
                            About
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            className="hidden md:block hover:text-azalea-200 transition"
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                        >
                            <SearchIcon size={20} />
                        </button>
                        <Link to="/cart" className="hover:text-azalea-200 transition relative">
                            <ShoppingCartIcon size={20} />
                            <span className="absolute -top-2 -right-2 bg-white text-azalea-600 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {cartItems.length}
                            </span>
                        </Link>
                        <Link to="/profile" className="hidden md:block hover:text-azalea-200 transition">
                            <UserIcon size={20} />
                        </Link>
                        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
                        </button>
                    </div>
                </div>
            </div>
            {/* Floating search bar */}
            {isSearchOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center">
                    <div className="bg-white rounded-lg w-full max-w-lg md:max-w-xl lg:max-w-2xl mx-4 p-4 mt-[15%] relative">
                        <button
                            onClick={() => setIsSearchOpen(false)}
                            className="right-4 top-4 absolute text-gray-500 hover:text-gray-700"
                        >
                            <XIcon size={24} />
                        </button>
                        <div className="relative mt-10">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full py-2 pl-10 pr-4 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-azalea-600 focus:border-transparent"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                autoFocus
                            />
                            <SearchIcon
                                size={18}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            />
                        </div>
                        {/* Live search results */}
                        {searchQuery && (
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold text-gray-700 mb-4">Search Results</h3>
                                {searchResults.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {searchResults.map((product) => (
                                            <div key={product.id} className="flex items-center space-x-4">
                                                <img
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    className="w-12 h-12 rounded-md"
                                                />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-700">{product.name}</p>
                                                    <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500">No products found.</p>
                                )}
                            </div>
                        )}
                        {/* Recommended products (if no search) */}
                        {!searchQuery && (
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold text-gray-700 mb-4">Recommended Products</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {recommendedProducts.map((product) => (
                                        <div key={product.id} className="flex items-center space-x-4">
                                            <img
                                                src={product.images[0]}
                                                alt={product.name}
                                                className="w-12 h-12 rounded-md"
                                            />
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">{product.name}</p>
                                                <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 py-4">
                    <div className="container mx-auto px-4 flex flex-col space-y-4">
                        <Link to="/" className="text-gray-700 hover:text-azalea-600 transition py-2" onClick={() => setIsMenuOpen(false)}>
                            Home
                        </Link>
                        <Link to="/shop" className="text-gray-700 hover:text-azalea-600 transition py-2" onClick={() => setIsMenuOpen(false)}>
                            Shop
                        </Link>
                        <Link to="/about" className="text-gray-700 hover:text-azalea-600 transition py-2" onClick={() => setIsMenuOpen(false)}>
                            About
                        </Link>
                        <Link to="/profile" className="text-gray-700 hover:text-azalea-600 transition py-2" onClick={() => setIsMenuOpen(false)}>
                            My Account
                        </Link>
                        <div className="relative mt-2">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-azalea-600 focus:border-transparent"
                            />
                            <SearchIcon
                                size={18}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            />
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}