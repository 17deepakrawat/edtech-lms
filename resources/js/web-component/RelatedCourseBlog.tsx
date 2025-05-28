import { useState } from 'react';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

type OtherCourse = {
    id: number;
    name: string;
    slug: string;
    image: string | null;
    rating: string | null;
    short_description: string | null;
    price: string | null;
};

export default function RelatedCourseBlog({ courses = [] }: { courses?: OtherCourse[] }) {
    const [showAll, setShowAll] = useState(false);
    // Ensure we always have an array to work with
    const safeCourses = Array.isArray(courses) ? courses : [];
    const visibleCourses = showAll ? safeCourses.slice(0, 12) : safeCourses.slice(0, 4);

    // Convert rating string to number safely
    const renderStars = (ratingStr: string | null) => {
        if (!ratingStr) return null;
        
        const rating = parseFloat(ratingStr);
        if (isNaN(rating)) return null;

        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (rating >= i) {
                stars.push(<FaStar key={i} className="text-yellow-400" />);
            } else if (rating >= i - 0.5) {
                stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-gray-300" />);
            }
        }
        return stars;
    };

    return (
        <>
            {safeCourses.length === 0 ? (
                <p className="text-gray-500">No related courses available</p>
            ) : (
                <>
                    {visibleCourses.map((courseItem) => (
                        <div key={courseItem.id} className="mb-4 grid grid-cols-12 gap-3 rounded-md border border-gray-300 shadow-sm hover:shadow-lg">
                            <div className="col-span-2">
                                <img
                                    src={courseItem.image ? `/storage/${courseItem.image}` : '/default-image.jpg'}
                                    className="h-full w-full rounded-l-md object-cover"
                                    alt={courseItem.name}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/default-image.jpg';
                                    }}
                                />
                            </div>
                            <div className="col-span-8 p-4">
                                <p className="course_title">{courseItem.name}</p>
                                {courseItem.rating && (
                                    <div className="mb-2 flex flex-row items-center">
                                        <p className="mr-2 text-sm font-semibold">{courseItem.rating} rating:</p>
                                        <div className="flex space-x-1">{renderStars(courseItem.rating)}</div>
                                    </div>
                                )}
                                <p className="text-muted-foreground text-sm">
                                    {courseItem.short_description || 'No description available'}
                                </p>
                            </div>
                            <div className="col-span-2 p-4">
                                <p className="font-bold">Price: ₹{courseItem.price || 'N/A'}</p>
                            </div>
                        </div>
                    ))}

                    {safeCourses.length > 4 && (
                        <div className="mt-4 text-end">
                            <button 
                                onClick={() => setShowAll(!showAll)} 
                                className="rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
                            >
                                {showAll ? 'Show Less' : 'Show More'}
                            </button>
                        </div>
                    )}
                </>
            )}
        </>
    );
}