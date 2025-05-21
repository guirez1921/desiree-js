import { SearchIcon, SlidersIcon, XIcon } from "lucide-react";
import { useState } from "react";
import ProductCard from "~/components/product/ProductCard";
import { allProducts, categories } from "~/data/mockData";

export default function Shop() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [priceRange, setPriceRange] = useState([0, 200]);
    const [sortBy, setSortBy] = useState('featured');
    const [showFilters, setShowFilters] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    // Filter products based on selected filters
    const filteredProducts = allProducts.filter(product => {
        // Filter by category
        if (selectedCategory !== 'all' && product.category !== selectedCategory) {
            return false;
        }
        // Filter by price
        if (product.price < priceRange[0] || product.price > priceRange[1]) {
            return false;
        }
        // Filter by search query
        if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }
        return true;
    });
    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === 'price-low') {
            return a.price - b.price;
        } else if (sortBy === 'price-high') {
            return b.price - a.price;
        } else if (sortBy === 'rating') {
            return (Number(b.rating) || 0) - (Number(a.rating) || 0);
        }
        // Default: featured/newest
        return 0;
    });
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Shop All Products</h1>
                    <p className="text-gray-600">
                        Discover our collection of premium intimate products
                    </p>
                </div>
                {/* Search and Filter Bar - Mobile */}
                <div className="flex items-center justify-between mb-6 md:hidden">
                    <div className="relative flex-grow mr-2">
                        <input type="text" placeholder="Search products..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-azalea-600" />
                        <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <button onClick={() => setShowFilters(!showFilters)} className="bg-purple-600 text-white p-2 rounded-lg flex items-center justify-center">
                        <SlidersIcon size={20} />
                    </button>
                </div>
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Filters - Desktop */}
                    <div className="hidden md:block w-64 bg-white p-6 rounded-lg shadow-sm sticky top-24 self-start">
                        <div className="mb-6">
                            <h3 className="font-semibold mb-3">Categories</h3>
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <input type="radio" id="category-all" name="category" checked={selectedCategory === 'all'} onChange={() => setSelectedCategory('all')} className="mr-2 text-azalea-600 focus:ring-azalea-500" />
                                    <label htmlFor="category-all">All Categories</label>
                                </div>
                                {categories.map(category => <div key={category.id} className="flex items-center">
                                    <input type="radio" id={`category-${category.id}`} name="category" checked={selectedCategory === category.id} onChange={() => setSelectedCategory(category.id)} className="mr-2 text-azalea-600 focus:ring-azalea-500" />
                                    <label htmlFor={`category-${category.id}`}>
                                        {category.name}
                                    </label>
                                </div>)}
                            </div>
                        </div>
                        <div className="mb-6">
                            <h3 className="font-semibold mb-3">Price Range</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span>${priceRange[0]}</span>
                                    <span>${priceRange[1]}</span>
                                </div>
                                <input type="range" min="0" max="200" value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-azalea-600" />
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-3">Sort By</h3>
                            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600">
                                <option value="featured">Featured</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Highest Rated</option>
                            </select>
                        </div>
                    </div>
                    {/* Mobile Filter Sidebar */}
                    {showFilters && <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 md:hidden">
                        <div className="absolute right-0 top-0 h-full w-4/5 max-w-xs bg-white p-6 overflow-y-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-semibold text-lg">Filters</h3>
                                <button onClick={() => setShowFilters(false)} className="text-gray-500 hover:text-gray-700">
                                    <XIcon size={24} />
                                </button>
                            </div>
                            <div className="mb-6">
                                <h3 className="font-semibold mb-3">Categories</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <input type="radio" id="mobile-category-all" name="mobile-category" checked={selectedCategory === 'all'} onChange={() => setSelectedCategory('all')} className="mr-2 text-azalea-600 focus:ring-azalea-500" />
                                        <label htmlFor="mobile-category-all">
                                            All Categories
                                        </label>
                                    </div>
                                    {categories.map(category => <div key={category.id} className="flex items-center">
                                        <input type="radio" id={`mobile-category-${category.id}`} name="mobile-category" checked={selectedCategory === category.id} onChange={() => setSelectedCategory(category.id)} className="mr-2 text-azalea-600 focus:ring-azalea-500" />
                                        <label htmlFor={`mobile-category-${category.id}`}>
                                            {category.name}
                                        </label>
                                    </div>)}
                                </div>
                            </div>
                            <div className="mb-6">
                                <h3 className="font-semibold mb-3">Price Range</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span>${priceRange[0]}</span>
                                        <span>${priceRange[1]}</span>
                                    </div>
                                    <input type="range" min="0" max="200" value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-azalea-600" />
                                </div>
                            </div>
                            <div className="mb-6">
                                <h3 className="font-semibold mb-3">Sort By</h3>
                                <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600">
                                    <option value="featured">Featured</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">Highest Rated</option>
                                </select>
                            </div>
                            <button onClick={() => setShowFilters(false)} className="w-full bg-azalea-600 text-white py-2 rounded-lg hover:bg-azalea-700 transition">
                                Apply Filters
                            </button>
                        </div>
                    </div>}
                    {/* Product Grid */}
                    <div className="flex-1">
                        {/* Search and Sort - Desktop */}
                        <div className="hidden md:flex items-center justify-between mb-6">
                            <div className="relative w-64">
                                <input type="text" placeholder="Search products..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-azalea-600" />
                                <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                            <div className="flex items-center">
                                <span className="mr-2 text-gray-600">Sort by:</span>
                                <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600">
                                    <option value="featured">Featured</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">Highest Rated</option>
                                </select>
                            </div>
                        </div>
                        {/* Results Count */}
                        <p className="text-gray-600 mb-6">
                            Showing {sortedProducts.length}{' '}
                            {sortedProducts.length === 1 ? 'product' : 'products'}
                        </p>
                        {/* Product Grid */}
                        {sortedProducts.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-1 gap-6">
                            {sortedProducts.map(product => <ProductCard key={product.id} product={product} />)}
                        </div> : <div className="text-center py-12">
                            <p className="text-lg text-gray-600">
                                No products found matching your criteria.
                            </p>
                            <button onClick={() => {
                                setSelectedCategory('all');
                                setPriceRange([0, 200]);
                                setSearchQuery('');
                            }} className="mt-4 text-purple-600 hover:text-purple-700 font-medium">
                                Clear all filters
                            </button>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    );
}