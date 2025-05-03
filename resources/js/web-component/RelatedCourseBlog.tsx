// ✅ Component
import { useState } from 'react';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

export default function RelatedCourseBlog({ course }: { course: any[] }) {
    const [showAll, setShowAll] = useState(false);
    const visibleCourses = showAll ? course.slice(0, 12) : course.slice(0, 4);

    const renderStars = (rating: number) => {
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
            {visibleCourses.map((courseItem, index) => (
                <div
                    key={index}
                    className="mb-4 grid grid-cols-12 gap-3 rounded-md border border-gray-300 shadow-sm hover:shadow-lg"
                >
                    <div className="col-span-2">
                        <img
                            src={courseItem.image}
                            className="h-full w-full rounded-l-md object-cover"
                            alt={courseItem.title}
                        />
                    </div>
                    <div className="col-span-8 p-4">
                        <p className="course_title">{courseItem.title}</p>
                        {courseItem.rating !== undefined && (
                            <div className="mb-2 flex flex-row items-center">
                                <p className="mr-2 text-sm font-semibold">{courseItem.rating} rating:</p>
                                <div className="flex space-x-1">{renderStars(courseItem.rating)}</div>
                            </div>
                        )}
                        <p className="text-muted-foreground text-sm">{courseItem.description}</p>
                    </div>
                    <div className="col-span-2 p-4">
                        <p className="font-bold">Price: ₹{courseItem.price}</p>
                    </div>
                </div>
            ))}

            {course.length > 4 && (
                <div className="mt-4 text-end">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className=" rounded-md px-4 py-2 text-black transition"
                    >
                        {showAll ? 'Show Less' : 'Show More'}
                    </button>
                </div>
            )}
        </>
    );
}
