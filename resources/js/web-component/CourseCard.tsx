import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { FaRegStar, FaRupeeSign, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import Lead from '@/web-component/lead/Lead';

export default function CourseCard({ courses }: { courses: any }) {
    const renderStars = (rating: number) => {
        const stars = [];
        if (rating !== 0) {
            for (let i = 1; i <= 5; i++) {
                if (rating >= i) {
                    stars.push(<FaStar key={i} className="text-yellow-400" />);
                } else if (rating >= i - 0.5) {
                    stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
                } else {
                    stars.push(<FaRegStar key={i} className="text-gray-300" />);
                }
            }
        }
        return stars;
    };

    return (
        <div className="rounded-lg bg-white pt-0 text-gray-800 transition-all duration-300 hover:shadow-lg dark:bg-gray-900 dark:text-gray-100">
            <Card className="relative shadow-md transition-all duration-300 hover:shadow-xl min-h-[360px] pt-0">
                <img
                    src={`/storage/${courses.image}`}
                    alt="Course Banner"
                    className="h-[200px] w-full rounded-t-lg object-cover"
                />
                <CardHeader className="mt-3 space-y-2">
                    {courses.rating !== undefined && (
                        <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold">{courses.rating} rating:</p>
                            <div className="flex space-x-1">{renderStars(courses.rating)}</div>
                        </div>
                    )}
                    <CardTitle className="text-xl font-semibold">{courses.name}</CardTitle>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                        {courses.courseDescription?.substring(0, 25)}...
                    </p>
                    <div className="mt-2 flex items-center justify-between text-lg font-semibold">
                        <div className="flex items-center gap-1">
                            <FaRupeeSign />
                            <p>{courses.price}</p>
                        </div>
                        <Lead slug={courses.slug} /> {/* Optional: Pass course ID if needed */}
                    </div>
                </CardHeader>
            </Card>
        </div>
    );
}
