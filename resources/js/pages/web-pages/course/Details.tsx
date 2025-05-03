import WebLayout from '@/layouts/web-layout';
import FAQ from '@/web-component/FAQ';
import RelatedCourseBlog from '@/web-component/RelatedCourseBlog';
import { useRef, useState } from 'react';
import { HiCheckCircle } from 'react-icons/hi';

export default function CourseDetails() {
    const faq = [
        {
            id: 1,
            question: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur laboriosam distinctio magni.',
            answer: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur laboriosam distinctio magni.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur laboriosam distinctio magni.',
        },
        {
            id: 2,
            question: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur laboriosam distinctio magni.',
            answer: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur laboriosam distinctio magni.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur laboriosam distinctio magni.',
        },
        {
            id: 3,
            question: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur laboriosam distinctio magni.',
            answer: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur laboriosam distinctio magni.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur laboriosam distinctio magni.',
        },
        {
            id: 4,
            question: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur laboriosam distinctio magni.',
            answer: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur laboriosam distinctio magni.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur laboriosam distinctio magni.',
        },
        {
            id: 5,
            question: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur laboriosam distinctio magni.',
            answer: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur laboriosam distinctio magni.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur laboriosam distinctio magni.',
        },
    ];
    const courses = [
        {
            title: 'Course Introduction',
            rating: 4.5,
            price: 1200,
            image: '/build/assets/web-assets/course.jpg',
            description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis illo architecto laboriosam? Qui sit, accusantium reiciendis voluptatem ipsum sapiente.',
        },
        {
            title: 'Advanced JavaScript',
            rating: 4.2,
            price: 1500,
            image: '/build/assets/web-assets/course.jpg',
            description: 'Master the advanced concepts of JavaScript including closures, async/await, and prototypes.',
        },
        {
            title: 'React for Beginners',
            rating: 4.8,
            price: 1800,
            image: '/build/assets/web-assets/course.jpg',
            description: 'Start your journey with React by learning components, props, state, and hooks.',
        },
        {
            title: 'Backend with Node.js',
            rating: 4.0,
            price: 1600,
            image: '/build/assets/web-assets/course.jpg',
            description: 'Build powerful backend applications with Node.js, Express, and MongoDB.',
        },
        {
            title: 'UI/UX Design Basics',
            rating: 3.9,
            price: 1300,
            image: '/build/assets/web-assets/course.jpg',
            description: 'Learn the fundamentals of UI/UX design, wireframing, and prototyping with Figma.',
        },
    ];

    const [open, setOpen] = useState<number | null>(null);
    const [showMoreModules, setShowMoreModules] = useState(false);
    const [showMoreSubtopics, setShowMoreSubtopics] = useState<{ [key: number]: boolean }>({});
    const topics = [
        {
            id: 1,
            title: 'Module 1: Introduction',
            subtopics: [
                'Welcome',
                'Overview',
                'Navigation',
                'Instructor',
                'Objectives',
                'FAQs',
                'Support',
                'Policies',
                'Outcomes',
                'Assessment',
                'Bonus Topic 1',
            ],
        },
        {
            id: 2,
            title: 'Module 1: Introduction',
            subtopics: [
                'Welcome',
                'Overview',
                'Navigation',
                'Instructor',
                'Objectives',
                'FAQs',
                'Support',
                'Policies',
                'Outcomes',
                'Assessment',
                'Bonus Topic 1',
            ],
        },
        {
            id: 3,
            title: 'Module 1: Introduction',
            subtopics: [
                'Welcome',
                'Overview',
                'Navigation',
                'Instructor',
                'Objectives',
                'FAQs',
                'Support',
                'Policies',
                'Outcomes',
                'Assessment',
                'Bonus Topic 1',
            ],
        },
        {
            id: 4,
            title: 'Module 1: Introduction',
            subtopics: [
                'Welcome',
                'Overview',
                'Navigation',
                'Instructor',
                'Objectives',
                'FAQs',
                'Support',
                'Policies',
                'Outcomes',
                'Assessment',
                'Bonus Topic 1',
            ],
        },
        {
            id: 5,
            title: 'Module 1: Introduction',
            subtopics: [
                'Welcome',
                'Overview',
                'Navigation',
                'Instructor',
                'Objectives',
                'FAQs',
                'Support',
                'Policies',
                'Outcomes',
                'Assessment',
                'Bonus Topic 1',
            ],
        },
        {
            id: 6,
            title: 'Module 1: Introduction',
            subtopics: [
                'Welcome',
                'Overview',
                'Navigation',
                'Instructor',
                'Objectives',
                'FAQs',
                'Support',
                'Policies',
                'Outcomes',
                'Assessment',
                'Bonus Topic 1',
            ],
        },
        {
            id: 7,
            title: 'Module 1: Introduction',
            subtopics: [
                'Welcome',
                'Overview',
                'Navigation',
                'Instructor',
                'Objectives',
                'FAQs',
                'Support',
                'Policies',
                'Outcomes',
                'Assessment',
                'Bonus Topic 1',
            ],
        },
        {
            id: 8,
            title: 'Module 1: Introduction',
            subtopics: [
                'Welcome',
                'Overview',
                'Navigation',
                'Instructor',
                'Objectives',
                'FAQs',
                'Support',
                'Policies',
                'Outcomes',
                'Assessment',
                'Bonus Topic 1',
            ],
        },
        {
            id: 9,
            title: 'Module 1: Introduction',
            subtopics: [
                'Welcome',
                'Overview',
                'Navigation',
                'Instructor',
                'Objectives',
                'FAQs',
                'Support',
                'Policies',
                'Outcomes',
                'Assessment',
                'Bonus Topic 1',
            ],
        },
        {
            id: 11,
            title: 'Module 1: Introduction',
            subtopics: [
                'Welcome',
                'Overview',
                'Navigation',
                'Instructor',
                'Objectives',
                'FAQs',
                'Support',
                'Policies',
                'Outcomes',
                'Assessment',
                'Bonus Topic 1',
            ],
        },
        {
            id: 12,
            title: 'Module 1: Introduction',
            subtopics: [
                'Welcome',
                'Overview',
                'Navigation',
                'Instructor',
                'Objectives',
                'FAQs',
                'Support',
                'Policies',
                'Outcomes',
                'Assessment',
                'Bonus Topic 1',
            ],
        },
    ];

    const visibleTopics = showMoreModules ? topics : topics.slice(0, 3);

    const toggleAccordion = (id: number) => {
        setOpen(open === id ? null : id);
    };

    const toggleSubtopics = (id: number) => {
        setShowMoreSubtopics((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };
    const items = [
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore recusandae quod non minus alias eos accusantium.',
        'Nostrum voluptate nulla earum debitis quos cupiditate deserunt distinctio at molestias minus rem.',
        'Eligendi tempora sit beatae numquam totam laborum error illum delectus cum fugit.',
        'Impedit repellendus, unde facere ratione similique dolores rem provident officia reprehenderit.',
        'More benefit point can be added here to describe extra features of the course.',
        'Another hidden line to test the show more functionality.',
    ];

    const [showAll, setShowAll] = useState(false);
    // const [open, setOpen] = useState<number | null>(null);
    const [showMoreMap, setShowMoreMap] = useState<{ [key: number]: boolean }>({});
    const [activeVideo, setActiveVideo] = useState<number | null>(null);
    const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

    const visibleItems = showAll ? items : items.slice(0, 4);

    // const toggleAccordion = (id: number) => {
    //     setOpen(open === id ? null : id);
    // };

    const toggleShowMore = (id: number) => {
        setShowMoreMap((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handlePlay = (id: number) => {
        setActiveVideo(id);
        const vid = videoRefs.current[id];
        if (vid) vid.play();
    };

    const handlePause = (id: number) => {
        const vid = videoRefs.current[id];
        if (vid) vid.pause();
    };

    const videoData = [
        {
            id: 1,
            title: 'Course Introduction',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
            videoType: 'normal',
            videoSource: '/build/assets/web-assets/videoc.mp4',
            embedLink: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            thumbnail: '/build/assets/web-assets/course.jpg',
        },
    ];

    return (
        <WebLayout>
            <div className="bg-gray-700">
                <div className="w-full py-16 pt-30">
                    <div className="container">
                        <nav className="flex" aria-label="Breadcrumb">
                            <ol className="mb-4 inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                                <li className="inline-flex items-center">
                                    <a
                                        href="#"
                                        className="ms-1 inline-flex items-center text-sm font-medium text-white hover:text-gray-300 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                                    >
                                        <svg
                                            className="me-2.5 h-3 w-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                        </svg>
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <svg
                                            className="mx-1 h-3 w-3 text-gray-400 rtl:rotate-180"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 6 10"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="m1 9 4-4-4-4"
                                            />
                                        </svg>
                                        <a
                                            href="#"
                                            className="ms-1 text-sm font-medium text-white hover:text-gray-300 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                                        >
                                            Projects
                                        </a>
                                    </div>
                                </li>
                                <li aria-current="page">
                                    <div className="flex items-center">
                                        <svg
                                            className="mx-1 h-3 w-3 text-gray-400 rtl:rotate-180"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 6 10"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="m1 9 4-4-4-4"
                                            />
                                        </svg>
                                        <span className="ms-1 text-sm font-medium text-white hover:text-gray-300 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                                            Flowbite
                                        </span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                        <div className="mx-auto grid grid-cols-12 gap-6 px-4">
                            <div className="col-span-12 lg:col-span-9">
                                <p className="text-4xl font-bold text-white">{videoData[0].title}</p>
                                <p className="text-gray-100">{videoData[0].description}</p>
                            </div>
                            <div className="col-span-12 lg:col-span-3">{/* Sidebar or empty */}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container py-15">
                <div className="mx-auto grid grid-cols-12 gap-6 px-4">
                    <div className="col-span-12 lg:col-span-9">
                        <div className="relative">
                            <p className="course_title mb-4">What we Got For This Course:</p>

                            <div className="relative max-h-[300px] overflow-hidden">
                                <ul className="space-y-3">
                                    {visibleItems.map((item, index) => (
                                        <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                                            <HiCheckCircle className="mt-1 text-green-500" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                {!showAll && (
                                    <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-16 bg-gradient-to-t from-white to-transparent dark:from-gray-900" />
                                )}
                            </div>

                            {items.length > 4 && (
                                <button
                                    onClick={() => setShowAll(!showAll)}
                                    className={`mt-4 rounded-sm p-1 px-3 text-sm text-gray-900 underline dark:text-white`}
                                >
                                    {showAll ? 'Show Less' : 'Show More'}
                                </button>
                            )}
                        </div>
                        <div className="pt-10">
                            <h2 className="course_title mt-4 mb-2">Course Topics</h2>

                            <div className="relative max-h-[auto] transition-all duration-300">
                                {visibleTopics.map((topic) => {
                                    const isOpen = open === topic.id;
                                    const showMore = showMoreSubtopics[topic.id] || false;
                                    const visibleSubtopics = showMore ? topic.subtopics : topic.subtopics.slice(0, 10);

                                    return (
                                        <div key={topic.id} className="mb-4 overflow-hidden rounded-lg border dark:border-gray-700">
                                            <button
                                                onClick={() => toggleAccordion(topic.id)}
                                                className="flex w-full items-center justify-between bg-gray-100 p-4 text-left font-semibold dark:bg-gray-800"
                                            >
                                                {topic.title}
                                                <svg
                                                    className={`h-4 w-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>

                                            {isOpen && (
                                                <div className="px-4 py-2">
                                                    <ul className="ml-5 list-disc space-y-1">
                                                        {visibleSubtopics.map((sub, idx) => (
                                                            <li key={idx}>{sub}</li>
                                                        ))}
                                                    </ul>

                                                    {topic.subtopics.length > 10 && (
                                                        <button
                                                            onClick={() => toggleSubtopics(topic.id)}
                                                            className={`mt-2 rounded-sm p-1 px-3 text-sm underline dark:text-white`}
                                                        >
                                                            {showMore ? 'Show Less' : 'Show More'}
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}

                                {!showMoreModules && (
                                    <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-16 bg-gradient-to-t from-white to-transparent dark:from-gray-900" />
                                )}
                            </div>

                            {topics.length > 3 && (
                                <button
                                    onClick={() => setShowMoreModules(!showMoreModules)}
                                    className={`rounded-sm p-1 px-3 text-sm text-gray-900 underline dark:text-white`}
                                >
                                    {showMoreModules ? 'Show Less' : 'Show More'}
                                </button>
                            )}
                        </div>
                        {/* Corusre content */}
                        <div className="">
                            <p className="course_title mt-4 mb-2">Course Description</p>
                            <p className="text-muted-foreground text-sm">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur laborum ducimus adipisci sequi animi et fugiat
                                molestiae totam voluptatibus dicta dolor numquam aliquid eveniet, amet, debitis soluta autem dolore modi ut nulla. Quo
                                non at exercitationem dolores dolore assumenda. Est iusto esse non ab explicabo asperiores expedita amet
                                necessitatibus, ut accusamus quas dicta et numquam, corrupti temporibus magni. Voluptas nulla nisi fugiat, quisquam
                                doloremque totam ipsa dicta commodi sunt? Possimus commodi voluptates perspiciatis animi voluptatibus quibusdam,
                                architecto doloribus nesciunt a placeat consequuntur corrupti quam odio cum dolorem at perferendis dolor inventore
                                consectetur nostrum tempora fuga fugit reprehenderit! Veritatis, id unde?
                            </p>
                            <p className="text-muted-foreground text-sm">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur harum dolor, facilis officiis dolorem iusto iure
                                qui fuga sapiente id reprehenderit culpa atque corrupti! Laudantium atque autem molestias ut quod.
                            </p>
                            <p className="text-muted-foreground text-sm">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium ipsam perferendis suscipit aliquid modi
                                voluptatem ipsum deserunt eos eum voluptate, vitae aut. Quae aut consectetur incidunt magni doloremque nobis.
                                Doloremque tempora doloribus minus ipsa voluptatem magnam exercitationem placeat qui, voluptatum ipsum amet aliquam?
                                Vel incidunt molestiae laboriosam ipsam, corrupti ipsa minima illo molestias fugit quis aliquid veritatis eveniet
                                voluptatem architecto voluptates beatae itaque eos quos hic pariatur velit nesciunt! Aspernatur, delectus sed adipisci
                                eius quibusdam odio deleniti accusamus voluptates dolores nobis, error iste voluptatum. Vel, voluptatem accusamus
                                possimus eos, quis deserunt magni labore quasi, in omnis repellendus laborum ipsum aliquid aperiam minus asperiores
                                rerum accusantium. Enim ullam, asperiores aut provident blanditiis ipsum beatae quisquam voluptatibus distinctio
                                itaque accusamus, fuga ducimus!
                            </p>
                            <p className="text-muted-foreground text-sm">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur laborum ducimus adipisci sequi animi et fugiat
                                molestiae totam voluptatibus dicta dolor numquam aliquid eveniet, amet, debitis soluta autem dolore modi ut nulla. Quo
                                non at exercitationem dolores dolore assumenda. Est iusto esse non ab explicabo asperiores expedita amet
                                necessitatibus, ut accusamus quas dicta et numquam, corrupti temporibus magni. Voluptas nulla nisi fugiat, quisquam
                                doloremque totam ipsa dicta commodi sunt? Possimus commodi voluptates perspiciatis animi voluptatibus quibusdam,
                                architecto doloribus nesciunt a placeat consequuntur corrupti quam odio cum dolorem at perferendis dolor inventore
                                consectetur nostrum tempora fuga fugit reprehenderit! Veritatis, id unde?
                            </p>
                        </div>
                        <div>
                            <p className="course_title mt-7 mb-7">Related Courses</p>
                            
                            <RelatedCourseBlog course={courses} />

                        </div>
                        <div className="mt-10">
                            <p className="course_title">Frequently Asked Question</p>
                            <FAQ faqs={faq} />
                        </div>
                    </div>
                    <div className="relative sticky top-75 col-span-12 h-fit lg:col-span-3">
                        <div className="absolute top-[-220px] block w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                            {videoData.map((video) => (
                                <div key={video.id} className="">
                                    {video.videoType === 'normal' ? (
                                        <div className="relative">
                                            {activeVideo !== video.id ? (
                                                <div
                                                    className="relative h-48 w-full rounded-lg bg-cover bg-center"
                                                    style={{ backgroundImage: `url(${video.thumbnail})` }}
                                                >
                                                    <button
                                                        className="bg-opacity-50 absolute inset-0 flex items-center justify-center bg-black text-4xl text-white"
                                                        onClick={() => handlePlay(video.id)}
                                                    >
                                                        ▶
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="relative">
                                                    <video
                                                        ref={(el) => (videoRefs.current[video.id] = el)}
                                                        controls
                                                        autoPlay
                                                        className="mb-4 w-full rounded-lg"
                                                    >
                                                        <source src={video.videoSource} type="video/mp4" />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                    <button
                                                        onClick={() => handlePause(video.id)}
                                                        className="bg-opacity-70 absolute top-2 right-2 rounded bg-black px-3 py-1 text-white"
                                                    >
                                                        ❚❚ Pause
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="relative">
                                            {activeVideo !== video.id ? (
                                                <div
                                                    className="relative h-48 w-full rounded-lg bg-cover bg-center"
                                                    style={{ backgroundImage: `url(${video.thumbnail})` }}
                                                >
                                                    <button
                                                        className="bg-opacity-50 absolute inset-0 flex items-center justify-center bg-black text-4xl text-white"
                                                        onClick={() => handlePlay(video.id)}
                                                    >
                                                        ▶
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="aspect-w-16 aspect-h-9 w-full">
                                                    <iframe
                                                        className="h-full w-full rounded-lg"
                                                        src={video.embedLink}
                                                        title="Embedded video player"
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    ></iframe>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="">
                                <p className="text-lg font-bold text-gray-800 dark:text-white">Price: ₹1200</p>
                                <p className="font-medium text-gray-600 dark:text-gray-300">Eligibility: 10th +2</p>
                                <button className="bg-customgreen-600 mt-3 w-full rounded py-2 font-semibold text-white transition hover:bg-blue-700">
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-40"></div>
        </WebLayout>
    );
}
