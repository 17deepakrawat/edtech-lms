import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { FaRegStar, FaRupeeSign, FaStar, FaStarHalfAlt } from 'react-icons/fa';

export default function CourseCard({ courses }: { courses: any }) {
    const renderStars = (rating: number) => {
        const stars = [];
        if (rating !== 0) {
            for (let i = 1; i <= 5; i++) {
                if (rating >= i) {
                    // Full Star
                    stars.push(<FaStar key={i} className="text-yellow-400" />);
                } else if (rating >= i - 0.5) {
                    // Half Star (also yellow colored)
                    stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
                } else {
                    // Empty Star
                    stars.push(<FaRegStar key={i} className="text-gray-300" />);
                }
            }
        }
        return stars;
    };

    return (
        <div className="mt-0 rounded-lg bg-white pt-0 text-gray-800 transition-all duration-300 hover:shadow-lg dark:bg-gray-900 dark:text-gray-100">
            <Card className="relative gap-3 pt-0 pb-0 shadow-md transition-all duration-300 hover:shadow-xl" style={{ minHeight: '360px' }}>
                {/* <img src="{{ asset('storage/' . $courses->image) }}" alt="Course Banner" className="h-[200px] w-full rounded-t-lg object-cover" /> */}
                <img src={`/storage/${courses.image}`} alt="Course Banner" className="h-[200px] w-full rounded-t-lg object-cover" />
                <CardHeader className="mt-0">
                    {/* Only render rating section if courses.rating exists */}
                    {courses.rating !== undefined && (
                        <div className="mb-2 flex flex-row items-center">
                            <p className="mr-2 text-sm font-semibold">{courses.rating} rating:</p>
                            <div className="flex space-x-1">{renderStars(courses.rating)}</div>
                        </div>
                    )}

                    <CardTitle className="text-xl font-semibold">{courses.name}</CardTitle>
                    <p className="pb-1 text-sm text-gray-500 dark:text-gray-300">
                        {courses.courseDescription ? courses.courseDescription.substring(0, 25) + '...' : ''}
                    </p>
                    <div className="mt-2 flex items-center justify-end text-lg font-semibold">
                        <FaRupeeSign className="" />
                        <p>{courses.price}</p>
                    </div>
                </CardHeader>
            </Card>
        </div>
    );
}
