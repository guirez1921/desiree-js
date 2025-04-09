import { StarIcon } from "lucide-react";

interface Testimonial {
    testimonial: {
        id: number;
        text: string;
        avatar?: string | undefined | null;
        rating: number;
        name: string;
        date: string;
    }
}
export default function TestimonialCard(testimonial: Testimonial) {
    // This component is a simple card that displays a testimonial.
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col h-full">
            <div className="flex mb-4">
                {[...Array(5)].map((_, i) => <StarIcon key={i} size={16} className={i < testimonial.testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />)}
            </div>
            <blockquote className="text-gray-700 mb-6 flex-grow">
                "{testimonial.testimonial.text}"
            </blockquote>
            <div className="flex items-center mt-auto">
                <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden mr-3">
                    {testimonial.testimonial.avatar ? <img src={testimonial.testimonial.avatar} alt={testimonial.testimonial.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-azalea-100 text-azalea-600 font-medium">
                        {testimonial.testimonial.name.charAt(0).toUpperCase()}
                    </div>}
                </div>
                <div>
                    <div className="font-medium">{testimonial.testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.testimonial.date}</div>
                </div>
            </div>
        </div>
    );
}