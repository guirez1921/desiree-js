export type Product = {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    rating: number;
    reviewCount: number;
    images: string[];
    category: string;
    isNew: boolean;
    discount: number;
    customizable: boolean;
    colors?: string; // Optional, as some products may not have colors
    sizes?: string[]; // Optional, as some products may not have sizes
    description?: string; // Optional, if needed
    fullDescription?: string; // Optional, if needed
    features?: string[]; // Optional, if needed
};

export type CartItem = {
    id: string;
    quantity: number;
    color?: string | null; // Optional, if the product has color options
    size?: string | null; // Optional, if the product has size options
    customText?: string | null; // Optional, if the product has custom text options
    product: Product | undefined; // Reference to the product
};