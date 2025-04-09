import { HeartIcon, ShieldIcon, TruckIcon } from "lucide-react";

export default function About() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="bg-azalea-600 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">About Discreet Delights</h1>
                    <p className="text-xl max-w-3xl mx-auto opacity-90">
                        We believe everyone deserves pleasure without judgment. Our mission
                        is to provide premium intimate products with the utmost respect for
                        your privacy.
                    </p>
                </div>
            </section>
            {/* Our Story */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <img src="https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Our team" className="rounded-lg shadow-lg" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                            <p className="text-gray-700 mb-4">
                                Discreet Delights was founded in 2018 with a simple mission: to
                                destigmatize pleasure and provide high-quality intimate products
                                in the most discreet manner possible.
                            </p>
                            <p className="text-gray-700 mb-4">
                                What began as a small online boutique has grown into a trusted
                                destination for those seeking premium intimate products with
                                personalization options that make each item uniquely yours.
                            </p>
                            <p className="text-gray-700 mb-4">
                                We believe that pleasure is personal, and your shopping
                                experience should be too. That's why we've built our brand
                                around discretion, quality, and customization.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Our Values */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                            <div className="bg-azalea-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ShieldIcon size={32} className="text-azalea-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Privacy & Discretion</h3>
                            <p className="text-gray-700">
                                We prioritize your privacy at every step, from discreet
                                packaging to secure payment processing and data protection.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                            <div className="bg-azalea-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <HeartIcon size={32} className="text-azalea-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Quality & Safety</h3>
                            <p className="text-gray-700">
                                We source only the highest quality, body-safe materials for our
                                products, ensuring they're safe, durable, and pleasurable.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                            <div className="bg-azalea-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <TruckIcon size={32} className="text-azalea-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Exceptional Service</h3>
                            <p className="text-gray-700">
                                From browsing to delivery, we strive to provide a seamless,
                                respectful experience with responsive customer support.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* FAQ */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-12 text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="max-w-3xl mx-auto">
                        <div className="space-y-6">
                            <div className="border-b border-gray-200 pb-6">
                                <h3 className="text-xl font-bold mb-2">
                                    How discreet is your packaging?
                                </h3>
                                <p className="text-gray-700">
                                    All orders are shipped in plain, unmarked boxes with no
                                    indication of the contents or our company name. The shipping
                                    label contains only the necessary delivery information with a
                                    discreet sender name.
                                </p>
                            </div>
                            <div className="border-b border-gray-200 pb-6">
                                <h3 className="text-xl font-bold mb-2">
                                    What materials are your products made from?
                                </h3>
                                <p className="text-gray-700">
                                    We prioritize body-safe materials like medical-grade silicone,
                                    ABS plastic, and other non-porous, phthalate-free materials.
                                    Each product page specifies the exact materials used.
                                </p>
                            </div>
                            <div className="border-b border-gray-200 pb-6">
                                <h3 className="text-xl font-bold mb-2">
                                    How does the customization process work?
                                </h3>
                                <p className="text-gray-700">
                                    For customizable products, you can add personalization during
                                    the checkout process. You'll be able to preview your
                                    customization before finalizing your order. Custom orders
                                    typically take 2-3 additional business days to process.
                                </p>
                            </div>
                            <div className="border-b border-gray-200 pb-6">
                                <h3 className="text-xl font-bold mb-2">
                                    What appears on my credit card statement?
                                </h3>
                                <p className="text-gray-700">
                                    Your purchase will appear as "DD Retail" on your credit card
                                    statement, providing privacy while still allowing you to
                                    identify the charge.
                                </p>
                            </div>
                            <div className="border-b border-gray-200 pb-6">
                                <h3 className="text-xl font-bold mb-2">
                                    Do you offer international shipping?
                                </h3>
                                <p className="text-gray-700">
                                    Yes, we ship to most countries worldwide. International
                                    shipping times vary by location, and customs fees may apply
                                    depending on your country's regulations.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">
                                    How do I clean and care for my products?
                                </h3>
                                <p className="text-gray-700">
                                    We recommend cleaning all products before and after use with
                                    warm water and mild soap or a specialized toy cleaner.
                                    Detailed care instructions are included with each product and
                                    can also be found on the product pages.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Contact CTA */}
            <section className="py-16 bg-azalea-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
                    <p className="text-xl max-w-2xl mx-auto mb-8 opacity-90">
                        Our customer service team is here to help with any questions or
                        concerns you might have.
                    </p>
                    <a href="/contact" className="bg-white text-azalea-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium inline-block transition">
                        Contact Us
                    </a>
                </div>
            </section>
        </div>
    );
}