import { useState } from 'react';
type CourseOverview = {
    id: number;
    image: string;
    name: string;
    short_description: string;
    slug: string;
};
export default function LmsCoursePlay({ course_overview }: { course_overview: CourseOverview }) {
    console.log(course_overview);
    const [activeVideo, setActiveVideo] = useState(1);
    const [activeTab, setActiveTab] = useState('overview');

    const course = {
        title: 'React & Laravel Full-Stack Course',
        description: 'Learn to build modern full-stack applications using React, Inertia.js, and Laravel from scratch with real-world projects.',
        videos: [
            {
                id: 1,
                title: 'Introduction to the Course',
                url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                duration: '5:32',
            },
            {
                id: 2,
                title: 'Setting up Laravel & React',
                url: 'https://www.youtube.com/embed/oHg5SJYRHA0',
                duration: '12:45',
            },
            {
                id: 3,
                title: 'Creating the First Component',
                url: 'https://www.youtube.com/embed/3fumBcKC6RE',
                duration: '9:10',
            },
        ],
    };

    const currentVideo = course.videos.find((v) => v.id === activeVideo);

    const tabs = [
        { key: 'playlist', label: 'Playlist', mobileOnly: true },
        { key: 'overview', label: 'Overview' },
        { key: 'query', label: 'Query' },
        { key: 'attachments', label: 'Attachments' },
        { key: 'feedback', label: 'Course Feedback' },
        // Playlist tab only for mobile
    ];
    let parsedCourseKeys: string[] = [];

    try {
        // Step 1: First parse removes the extra quotes & escapes
        const firstParse = JSON.parse(course_overview.course_keys);

        // Step 2: If still a string, parse again to get the array
        parsedCourseKeys = typeof firstParse === 'string' ? JSON.parse(firstParse) : firstParse;
    } catch (e) {
        console.error('Invalid course_keys format', e);
    }
    return (
        <div className="min-h-screen bg-gray-100 p-4 px-6 pt-20 sm:px-10 md:px-16 lg:px-20 xl:px-22">
            {/* Course Title */}
            <h1 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl">{course_overview.name}</h1>
            <div className="grid gap-6 lg:grid-cols-10">
                {/* Video Player Section */}
                <div className="lg:col-span-6 xl:col-span-7">
                    <div className="overflow-hidden rounded-lg bg-black shadow-lg">
                        <iframe
                            className="aspect-video w-full"
                            src={currentVideo?.url}
                            title={currentVideo?.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>

                    {/* Nav Tabs */}
                    <div className="mt-4 border-b border-gray-300">
                        <nav className="flex flex-wrap gap-4 text-sm font-medium text-gray-600">
                            {tabs.map((tab) => {
                                if (tab.mobileOnly && window.innerWidth >= 1024) return null; // Hide on desktop
                                return (
                                    <button
                                        key={tab.key}
                                        onClick={() => setActiveTab(tab.key)}
                                        className={`pb-2 transition ${
                                            activeTab === tab.key ? 'border-b-2 border-blue-600 text-blue-600' : 'hover:text-blue-500'
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="mt-4 rounded-lg bg-white p-4 shadow">
                        {activeTab === 'overview' && (
                            <div>
                                <h2 className="mb-2 text-lg font-semibold md:text-xl">{course_overview.name} Course Overview</h2>

                                {/* Render HTML content from admin editor */}
                                <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: course_overview.content }} />

                                {/* Parse course_keys safely */}
                                {(() => {
                                    let parsedCourseKeys: string[] = [];
                                    try {
                                        const firstParse = JSON.parse(course_overview.course_keys);
                                        parsedCourseKeys = typeof firstParse === 'string' ? JSON.parse(firstParse) : firstParse;
                                    } catch (err) {
                                        console.error('Invalid course_keys format', err);
                                    }

                                    return (
                                        parsedCourseKeys.length > 0 && (
                                            <div className="mt-3">
                                                <h2 className="mb-2 text-lg font-semibold md:text-xl">What we Got For This Course:</h2>

                                                <ul className="list-disc pl-5 text-gray-700">
                                                    {parsedCourseKeys.map((item, index) => (
                                                        <li key={index}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )
                                    );
                                })()}
                            </div>
                        )}

                        {activeTab === 'query' && (
                            <div>
                                <h2 className="mb-2 text-lg font-semibold md:text-xl">Ask a Query</h2>
                                <textarea
                                    placeholder="Type your question..."
                                    className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                />
                                <button className="mt-3 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Submit</button>
                            </div>
                        )}

                        {activeTab === 'attachments' && (
                            <div>
                                <h2 className="mb-2 text-lg font-semibold md:text-xl">Course Attachments</h2>
                                <ul className="list-disc pl-5 text-blue-600">
                                    <li>
                                        <a href="#">Project Starter Files.zip</a>
                                    </li>
                                    <li>
                                        <a href="#">Course Slides.pdf</a>
                                    </li>
                                    <li>
                                        <a href="#">Cheat Sheet.docx</a>
                                    </li>
                                </ul>
                            </div>
                        )}

                        {activeTab === 'feedback' && (
                            <div>
                                <h2 className="mb-2 text-lg font-semibold md:text-xl">Course Feedback</h2>
                                <textarea
                                    placeholder="Write your feedback..."
                                    className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                />
                                <button className="mt-3 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700">Submit Feedback</button>
                            </div>
                        )}

                        {/* Playlist Tab for mobile */}
                        {activeTab === 'playlist' && (
                            <div>
                                <h2 className="mb-2 text-lg font-semibold md:text-xl">Playlist</h2>
                                {course.videos.map((video) => (
                                    <button
                                        key={video.id}
                                        onClick={() => setActiveVideo(video.id)}
                                        className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left transition ${
                                            activeVideo === video.id ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
                                        }`}
                                    >
                                        <span className="font-medium">{video.title}</span>
                                        <span className="text-sm opacity-70">{video.duration}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Playlist Sidebar for desktop */}
                <div className="hidden lg:col-span-4 lg:block xl:col-span-3">
                    <div className="space-y-4 rounded-lg bg-white p-4 shadow-lg">
                        <h3 className="text-lg font-semibold text-gray-800">Course Playlist</h3>
                        {course.videos.map((video) => (
                            <button
                                key={video.id}
                                onClick={() => setActiveVideo(video.id)}
                                className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left transition ${
                                    activeVideo === video.id ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                            >
                                <span className="font-medium">{video.title}</span>
                                <span className="text-sm opacity-70">{video.duration}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
