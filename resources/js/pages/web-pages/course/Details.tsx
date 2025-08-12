import WebLayout from '@/layouts/web-layout';
import Enroll from '@/web-component/enroll/Enroll';
import FAQ from '@/web-component/FAQ';
import RelatedCourseBlog from '@/web-component/RelatedCourseBlog';
import { usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { HiCheckCircle } from 'react-icons/hi';

type Course = {
    id: number;
    name: string;
    short_description: string | null;
    duration: string | null;
    price: string | null;
    rating: string | null;
    image: string | null;
    modes: string | null;
    videoid: number | null;
    video_type: string | null;
    content: string | null;
    course_keys: string[] | null;
    video_name: string | null;
    video_path: string | null;
    embed_url: string | null;
    video_duration: string | null;
    faq: { question: string; answer: string }[];
};

type OtherCourse = {
    id: number;
    name: string;
    slug: string;
    image: string | null;
    rating: string | null;
    short_description: string | null;
    price: string | null;
};

type TopicType = {
    id: number;
    title: string;
    subtopics: string[];
};

type UnitType = {
    id: number;
    title: string;
    topics: TopicType[];
};

export default function CourseDetails({
    course,
    other_courses = [],
    units = [],
    enroll_status,
}: {
    course: Course;
    other_courses?: OtherCourse[];
    units: UnitType[];
    enroll_status: any;
}) {
    // const enroll_status = usePage().props?.payment_status?.status ?? 'null';
    // console.log(enroll_status);
    const renderStars = (ratingInput: string | number | null) => {
        if (ratingInput == null) return null;

        const rating = typeof ratingInput === 'string' ? parseFloat(ratingInput) : ratingInput;

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
    const [openUnitId, setOpenUnitId] = useState<number | null>(null);
    const [showMoreUnits, setShowMoreUnits] = useState(false);
    const [showMoreSubtopics, setShowMoreSubtopics] = useState<{ [key: number]: boolean }>({});
    const [showAllFeatures, setShowAllFeatures] = useState(false);
    const [activeVideo, setActiveVideo] = useState<number | null>(null);
    const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
    const toggleUnit = (unitId: number) => {
        setOpenUnitId(openUnitId === unitId ? null : unitId);
    };
    const toggleSubtopicsVisibility = (unitId: number) => {
        setShowMoreSubtopics((prev) => ({
            ...prev,
            [unitId]: !prev[unitId],
        }));
    };
    const handlePlay = (id: number | null) => {
        if (id == null) return;
        setActiveVideo(id);
        const vid = videoRefs.current[id];
        if (vid) vid.play();
    };
    const handlePause = (id: number | null) => {
        if (id == null) return;
        setActiveVideo(null);
        const vid = videoRefs.current[id];
        if (vid) vid.pause();
    };
    // Process course keys
    const keysRaw = course.course_keys;
    const items = Array.isArray(keysRaw) ? keysRaw : typeof keysRaw === 'string' ? JSON.parse(keysRaw) : [];
    const visibleItems = showAllFeatures ? items : items.slice(0, 4);
    // Handle units visibility - ensure units is always treated as an array
    const safeUnits = units['units'];
    const visibleUnits = showMoreUnits ? safeUnits : safeUnits.slice(0, 3);
    return (
        <WebLayout>
            <div className="bg-gray-700">
                <div className="w-full py-16 pt-30">
                    <div className="container">
                        {/* Breadcrumb */}
                        <nav className="flex" aria-label="Breadcrumb">
                            <ol className="mb-4 inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                                <li className="inline-flex items-center">
                                    <a href="#" className="flex items-center text-sm font-medium text-white hover:text-gray-300">
                                        <svg className="me-2.5 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                        </svg>
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <svg className="mx-1 h-3 w-3 text-gray-400" fill="none" viewBox="0 0 6 10">
                                            <path d="m1 9 4-4-4-4" stroke="currentColor" strokeWidth={2} />
                                        </svg>
                                        <a href="#" className="text-sm font-medium text-white hover:text-gray-300">
                                            Courses
                                        </a>
                                    </div>
                                </li>
                                <li aria-current="page">
                                    <div className="flex items-center">
                                        <svg className="mx-1 h-3 w-3 text-gray-400" fill="none" viewBox="0 0 6 10">
                                            <path d="m1 9 4-4-4-4" stroke="currentColor" strokeWidth={2} />
                                        </svg>
                                        <span className="text-sm font-medium text-white">{course.name}</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>

                        <div className="grid grid-cols-12 gap-6 px-4">
                            <div className="col-span-12 lg:col-span-9">
                                <p className="text-4xl font-bold text-white">{course.name}</p>
                                {course.rating !== null && (
                                    <div className="mb-2 flex flex-row items-center">
                                        <p className="mr-2 text-sm font-semibold text-white">{course.rating} rating:</p>
                                        <div className="flex space-x-1">{renderStars(course.rating)}</div>
                                    </div>
                                )}

                                <p className="text-gray-100">{course.short_description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container pb-15">
                <div className="grid grid-cols-12 gap-6 px-4">
                    <div className="col-span-12 pt-15 lg:col-span-9">
                        {/* Features */}
                        <section className="mb-10">
                            <p className="course_title mb-4">What we Got For This Course:</p>
                            <ul className="relative max-h-[300px] space-y-3 overflow-hidden">
                                {visibleItems.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                                        <HiCheckCircle className="mt-1 text-green-500" />
                                        {item}
                                    </li>
                                ))}
                                {!showAllFeatures && items.length > 4 && (
                                    <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-16 bg-gradient-to-t from-white to-transparent dark:from-gray-900" />
                                )}
                            </ul>
                            {items.length > 4 && (
                                <button onClick={() => setShowAllFeatures(!showAllFeatures)} className="mt-4 text-sm underline dark:text-white">
                                    {showAllFeatures ? 'Show Less' : 'Show More'}
                                </button>
                            )}
                        </section>

                        {/* Topics */}
                        <section>
                            <h2 className="course_title mt-4 mb-2">Course Topics</h2>

                            {visibleUnits.length > 0 ? (
                                visibleUnits.map((unit) => {
                                    const isOpen = openUnitId === unit.id;
                                    const hasUnitVideos = Array.isArray(unit.videos) && unit.videos.length > 0;

                                    // Filter unit-only videos (exclude topic videos)
                                    const unitOnlyVideos = unit.videos?.filter(
                                        (uv) => !unit.topics.some((topic) => topic.videos?.some((tv) => tv.id === uv.id)),
                                    );

                                    return (
                                        <div key={unit.id} className="mb-4 rounded-lg border dark:border-gray-700">
                                            <button
                                                onClick={() => toggleUnit(unit.id)}
                                                className="flex w-full justify-between bg-gray-100 p-4 font-semibold dark:bg-gray-800"
                                            >
                                                <span className="flex flex-wrap items-center gap-2">
                                                    {unit.title}
                                                    {unitOnlyVideos.length > 0 && (
                                                        <span className="ml-2 flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                                            {unitOnlyVideos.map((v, i) => (
                                                                <span key={i} className="flex items-center gap-1">
                                                                    <i className="ri-video-line text-base" /> {v.duration}
                                                                </span>
                                                            ))}
                                                        </span>
                                                    )}
                                                </span>
                                                <svg
                                                    className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth={2} />
                                                </svg>
                                            </button>

                                            {isOpen && (
                                                <div className="px-4 py-2">
                                                    {unit.topics.length === 0 ? (
                                                        <p className="text-gray-500 italic">No topics available</p>
                                                    ) : (
                                                        unit.topics.map((topic) => {
                                                            const showMore = showMoreSubtopics[topic.id] || false;
                                                            const visibleSubtopics = showMore
                                                                ? topic.subtopics || []
                                                                : (topic.subtopics || []).slice(0, 10);

                                                            const topicVideos = topic.videos || [];

                                                            return (
                                                                <div key={topic.id} className="mb-3">
                                                                    <h3 className="flex flex-wrap items-center gap-2 font-semibold">
                                                                        {topic.name}
                                                                        {topicVideos.length > 0 && (
                                                                            <span className="ml-2 flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                                                                {topicVideos.map((v, i) => (
                                                                                    <span key={i} className="flex items-center gap-1">
                                                                                        <i className="ri-video-line text-base" /> {v.duration}
                                                                                    </span>
                                                                                ))}
                                                                            </span>
                                                                        )}
                                                                    </h3>

                                                                    {Array.isArray(topic.subtopics) && topic.subtopics.length > 0 && (
                                                                        <>
                                                                            <ul className="ml-5 list-disc space-y-1">
                                                                                {visibleSubtopics.map((sub, idx) => (
                                                                                    <li key={sub.id || idx}>{sub.name}</li>
                                                                                ))}
                                                                            </ul>
                                                                            {topic.subtopics.length > 10 && (
                                                                                <button
                                                                                    onClick={() => toggleSubtopicsVisibility(topic.id)}
                                                                                    className="mt-1 text-sm underline dark:text-white"
                                                                                >
                                                                                    {showMore ? 'Show Less' : 'Show More'}
                                                                                </button>
                                                                            )}
                                                                        </>
                                                                    )}
                                                                </div>
                                                            );
                                                        })
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="text-gray-500">No course units available</p>
                            )}

                            {safeUnits.length > 3 && (
                                <button onClick={() => setShowMoreUnits(!showMoreUnits)} className="text-sm underline dark:text-white">
                                    {showMoreUnits ? 'Show Less' : 'Show More'}
                                </button>
                            )}
                        </section>

                        {/* Description */}
                        <section className="mt-6">
                            <p className="course_title">Course Description</p>
                            <div className="text-muted-foreground text-sm" dangerouslySetInnerHTML={{ __html: course.content || '' }} />
                        </section>

                        {/* Related Courses */}
                        <section className="mt-7">
                            <p className="course_title mb-7">Related Courses</p>
                            <RelatedCourseBlog courses={other_courses} />
                        </section>

                        {/* FAQ */}
                        {}
                        {course.faqs && course.faqs.length > 0 && (
                            <section className="mt-10">
                                <p className="course_title">Frequently Asked Questions</p>

                                <FAQ faqs={course.faqs} />
                            </section>
                        )}
                    </div>

                    <div className="relative sticky top-18 col-span-12 mt-4 h-fit lg:col-span-3">
                        {course.video_path && (
                            <div className="w-full rounded-lg border bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                {activeVideo !== course.videoid ? (
                                    <div
                                        className="relative h-48 w-full rounded-lg bg-cover bg-center"
                                        style={{ backgroundImage: `url(${course.image || '/placeholder.jpg'})` }}
                                    >
                                        <button
                                            onClick={() => handlePlay(course.videoid)}
                                            className="bg-opacity-50 absolute inset-0 flex items-center justify-center bg-black text-4xl text-white"
                                        >
                                            ▶
                                        </button>
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <video
                                            ref={(el) => {
                                                if (course.videoid) {
                                                    videoRefs.current[course.videoid] = el;
                                                }
                                            }}
                                            controls
                                            autoPlay
                                            className="mb-4 w-full rounded-lg"
                                        >
                                            <source src={`/storage/${course.video_path}`} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                        <button
                                            onClick={() => handlePause(course.videoid)}
                                            className="bg-opacity-70 absolute top-2 right-2 rounded bg-black px-3 py-1 text-white"
                                        >
                                            ❚❚ Pause
                                        </button>
                                    </div>
                                )}
                                <ul className="mt-4 space-y-2">
                                    <li>
                                        <span className="mb-0 text-xl font-bold">{course.name || 'N/A'}</span>
                                    </li>
                                    <li>
                                        <span className="text-sm">{course.video_name || 'N/A'}</span>
                                    </li>
                                    <li>
                                        <span className="text-sm">Duration: {course.video_duration || 'N/A'}</span>
                                    </li>
                                </ul>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-lg font-bold text-gray-800 dark:text-gray-200">
                                        {course.price ? `$${course.price}` : 'Free'}
                                    </span>
                                    <Enroll
                                        enrollCourse={{
                                            price: course.price,
                                            image: course.image,
                                            name: course.name,
                                            short_description: course.short_description,
                                            id: course.id,
                                            duration: course.duration,
                                            video_duration: course.video_duration,
                                        }}
                                         enrollStatus={enroll_status}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </WebLayout>
    );
}
