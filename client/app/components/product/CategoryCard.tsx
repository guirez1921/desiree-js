import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router";

interface Category {
    id: string;
    name: string;
    image: string;
    productCount: number;
}

export default function CategoryCard({ category }: { category: Category }) {
    return (
        <Link to={`/shop?category=${category.id}`} className="group">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition h-full">
                <div className="relative aspect-square bg-azalea-100">
                    <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-azalea-600/60 to-transparent flex items-end">
                        <div className="p-4 text-white">
                            <h3 className="font-bold text-lg">{category.name}</h3>
                            <p className="text-sm opacity-90">
                                {category.productCount} products
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-3 flex justify-between items-center">
                    <span className="text-sm font-medium text-azalea-600">View Collection</span>
                    <ArrowRightIcon size={16} className="text-azalea-600 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </Link>
    );
}