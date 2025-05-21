import { ArrowRightIcon, HeartIcon, ShieldIcon, StarIcon, TruckIcon } from "lucide-react";
import { Link } from "react-router";
import { featuredProducts, categories, testimonials } from 'app/data/mockData'; // Assuming you have mock data in a separate file
import CategoryCard from "~/components/product/CategoryCard";
import ProductCard from "~/components/product/ProductCard";
import TestimonialCard from "~/components/ui/TestimonialCard";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-azalea-600 to-azalea-400 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Discover Your Pleasure, <br />
                Delivered Discreetly
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                Premium intimate products with customization options for a
                personalized experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/shop" className="bg-white text-azalea-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium flex items-center justify-center transition">
                  Shop Now
                  <ArrowRightIcon size={18} className="ml-2" />
                </Link>
                <Link to="/about" className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium flex items-center justify-center transition">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2215&q=80" alt="Elegant product display" className="rounded-lg shadow-xl w-full object-cover h-96" />
            </div>
          </div>
        </div>
      </section>
      {/* Trust Indicators */}
      <section className="bg-white py-8 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <TruckIcon className="text-azalea-600" size={24} />
              <div>
                <h3 className="font-medium">Discreet Shipping</h3>
                <p className="text-sm text-gray-600">
                  Plain packaging, no branding
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <ShieldIcon className="text-azalea-600" size={24} />
              <div>
                <h3 className="font-medium">Privacy Guaranteed</h3>
                <p className="text-sm text-gray-600">
                  Your data is always protected
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <HeartIcon className="text-azalea-600" size={24} />
              <div>
                <h3 className="font-medium">Body-Safe Materials</h3>
                <p className="text-sm text-gray-600">
                  Premium quality products
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop By Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our curated collection of premium products designed for
              pleasure and satisfaction.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map(category => <CategoryCard key={category.id} category={category} />)}
          </div>
        </div>
      </section>
      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">
              Featured Products
            </h2>
            <Link to="/shop" className="text-purple-600 hover:text-purple-700 flex items-center font-medium">
              View All
              <ArrowRightIcon size={18} className="ml-2" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 8).map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>
      {/* Customization Highlight */}
      <section className="py-16 bg-azalea-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Customization options" className="rounded-lg shadow-lg" />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Make It Yours</h2>
              <p className="text-lg text-gray-700">
                Add a personal touch with our customization options. Engrave a
                name, message, or choose custom colors to create a truly unique
                experience.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-azalea-100 p-1 rounded-full mr-3 mt-1">
                    <StarIcon size={16} className="text-azalea-600" />
                  </div>
                  <span>Custom engraving available on select products</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-azalea-100 p-1 rounded-full mr-3 mt-1">
                    <StarIcon size={16} className="text-azalea-600" />
                  </div>
                  <span>Choose from multiple fonts and styles</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-azalea-100 p-1 rounded-full mr-3 mt-1">
                    <StarIcon size={16} className="text-azalea-600" />
                  </div>
                  <span>Preview your customization before ordering</span>
                </li>
              </ul>
              <Link to="/shop" className="bg-azalea-600 text-white hover:bg-azalea-700 px-6 py-3 rounded-lg font-medium inline-block transition">
                Explore Customizable Products
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real experiences from satisfied customers who value our discretion
              and quality.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(testimonial => <TestimonialCard key={testimonial.id} testimonial={testimonial} />)}
          </div>
        </div>
      </section>
      {/* Newsletter Section */}
      <section className="py-16 bg-azalea-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="mb-8 opacity-90">
              Subscribe to our newsletter for exclusive offers, new product
              announcements, and discreet updates.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
              <input type="email" placeholder="Enter your email for updates" className="px-4 py-3 rounded-lg flex-grow text-azalea-900 focus:outline-none border border-azalea-400" />
              <button type="submit" className="bg-white text-azalea-600 hover:bg-azalea-600 hover:text-white px-6 py-3 rounded-lg font-medium transition border border-azalea-400 cursor-pointer">
                Subscribe
              </button>
            </form>
            <p className="mt-4 text-sm opacity-80">
              We respect your privacy. Your information will never be shared.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}