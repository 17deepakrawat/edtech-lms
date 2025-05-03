import WebLayout from '@/layouts/web-layout';
import FAQ from '@/web-component/FAQ';
import OtherBlogs from '@/web-component/OtherBlogs';

const details = [
    {
        id: 1,
        img: '/build/assets/web-assets/course.jpg',
        category: 'Traimer',
        createdat: '28-04-25',
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam aut, autem deleniti enim nihil minima?',
        content:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit... (truncated for brevity)Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta recusandae inventore optio id illo tempore praesentium impedit quisquam perspiciatis, fugiat molestiae possimus voluptate eligendi repudiandae voluptas dolores quidem magnam obcaecati expedita nesciunt omnis? Commodi quas corporis iste eos optio autem dolorem eveniet excepturi rerum modi inventore eaque magnam, animi consequuntur rem labore illum repudiandae, at quia distinctio explicabo accusantium quae. Assumenda, debitis saepe perspiciatis inventore fugiat labore minima deserunt sapiente, accusamus veniam quam iusto tempora doloribus voluptates itaque possimus consequatur at amet a. Voluptate, labore provident, ut ipsam eos quam suscipit officia corporis molestiae officiis consequuntur ex. Doloremque dolore architecto unde omnis magnam veniam, facilis voluptatibus aspernatur eligendi ut quasi saepe dolores provident consectetur commodi ex, dignissimos itaque quas, cupiditate veritatis animi laboriosam pariatur. Dolores nobis rem beatae mollitia optio perspiciatis obcaecati eos in voluptate. Laudantium adipisci sint sequi tempora consectetur iure atque repellat, nihil nesciunt neque! Sapiente iure fugiat ratione dolor laborum quisquam eveniet architecto veritatis natus aperiam in perferendis quod quae id et labore qui, hic minima. Accusantium eveniet cumque similique nulla ducimus ipsa magni distinctio maiores porro. Provident minus unde veniam quos, reprehenderit facere repellat molestias, architecto corporis a quia suscipit alias rerum non eos. Sunt sint rem quo soluta harum quasi voluptates iure, sequi dolores excepturi perferendis ducimus itaque amet praesentium vel recusandae vitae fugit asperiores nam ullam est. Molestiae est cupiditate hic cumque quis earum fugit omnis animi, dolorem possimus vel culpa aperiam reprehenderit, dignissimos fugiat sequi pariatur voluptate! Rem minus architecto quisquam dolores error itaque ipsam, aspernatur odio minima possimus quaerat eaque quidem soluta corrupti modi ab fugiat ipsum totam labore at in. Laboriosam ullam hic nulla incidunt quis voluptatibus cum vitae ut nesciunt sed adipisci ipsam illum porro accusantium dignissimos sapiente amet animi odio excepturi labore minus, error quae quisquam est! Quod odio assumenda cum earum quisquam, mollitia, unde pariatur natus deserunt sapiente, repellendus veritatis consequuntur praesentium maiores officia eum ex nisi? Accusamus, voluptatem sequi temporibus itaque velit, rem saepe assumenda nam eos similique cumque. Asperiores sunt corporis ex earum eaque, expedita eius dolorem! Veniam temporibus eius minima asperiores dolorum odio atque provident ea voluptatem possimus qui tempore quo nam, enim soluta. Dignissimos impedit molestias voluptatibus eaque eius, assumenda ab repellat iure, aut harum voluptate commodi ducimus. Distinctio eaque quam consequuntur ipsum possimus accusamus harum error et sit vel magnam necessitatibus quaerat facere ab excepturi, perferendis sapiente maxime minima quas delectus reprehenderit adipisci nostrum, aut debitis. Aliquam, itaque nihil impedit, corporis blanditiis maiores odio sunt veritatis quidem delectus ullam dolores? Provident esse aliquid nisi est, reprehenderit, nulla reiciendis optio dolores beatae deserunt porro consequatur id veritatis, doloremque voluptates suscipit in vel? Rem, ea inventore? Asperiores, fuga laboriosam! Doloribus molestiae voluptatem illum ipsam! Aliquam atque a eos odio vero magnam ullam quasi enim, quas ad voluptatem, illum animi adipisci veritatis amet. Similique voluptas explicabo dicta veritatis, iure molestias maxime accusamus blanditiis dolorem, ipsum nulla! Illum exercitationem quis modi tenetur eligendi natus officia, sed doloribus quae eveniet, animi cum quisquam illo nam blanditiis, voluptas laudantium.',
    },
];
const otherBlogs = [
    {
        id: 1,
        img: '/build/assets/web-assets/course.jpg',
        category: 'Technology',
        title: 'Understanding AI in Everyday Life',
        published: '23-05-2025',
    },
    {
        id: 2,
        img: '/build/assets/web-assets/course.jpg',
        category: 'Education',
        title: 'Top 5 Online Learning Platforms in 2025',
        published: '21-05-2025',
    },
    {
        id: 3,
        img: '/build/assets/web-assets/course.jpg',
        category: 'Career',
        title: 'How to Build a Career in Data Science',
        published: '19-05-2025',
    },
    {
        id: 4,
        img: '/build/assets/web-assets/course.jpg',
        category: 'Design',
        title: 'UI/UX Principles Every Designer Should Know',
        published: '17-05-2025',
    },
    {
        id: 5,
        img: '/build/assets/web-assets/course.jpg',
        category: 'Development',
        title: 'JavaScript Trends to Watch in 2025',
        published: '16-05-2025',
    },
    {
        id: 6,
        img: '/build/assets/web-assets/course.jpg',
        category: 'Marketing',
        title: 'SEO Basics for Beginners in 2025',
        published: '15-05-2025',
    },
    {
        id: 7,
        img: '/build/assets/web-assets/course.jpg',
        category: 'Business',
        title: 'Launching Your First Startup: A Beginner’s Guide',
        published: '13-05-2025',
    },
    {
        id: 8,
        img: '/build/assets/web-assets/course.jpg',
        category: 'Health',
        title: 'Work-Life Balance for Remote Workers',
        published: '11-05-2025',
    },
    {
        id: 9,
        img: '/build/assets/web-assets/course.jpg',
        category: 'Productivity',
        title: 'Top 10 Productivity Tools for 2025',
        published: '10-05-2025',
    },
    {
        id: 10,
        img: '/build/assets/web-assets/course.jpg',
        category: 'Inspiration',
        title: 'How to Stay Motivated While Working Alone',
        published: '09-05-2025',
    },
];
const blogfaq = [
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
export default function BlogDetails() {
    return (
        <WebLayout>
            {/* Breadcrumb */}
            <div className="container">
                <div className="pb-5">
                    {details.map((blog) => (
                        <div className="" key={blog.id}>
                            <img src={blog.img} alt="Blog banner" className="mt-18 h-[700px] w-full rounded-md object-cover" />
                            <div className="pt-2">
                                <nav className="flex" aria-label="Breadcrumb">
                                    <ol className="mb-4 inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                                        <li className="inline-flex items-center">
                                            <a
                                                href="#"
                                                className="ms-1 inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                                            >
                                                <svg className="me-2.5 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                                </svg>
                                                Home
                                            </a>
                                        </li>
                                        <li>
                                            <div className="flex items-center">
                                                <svg className="mx-1 h-3 w-3 text-gray-400 rtl:rotate-180" fill="none" viewBox="0 0 6 10">
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="m1 9 4-4-4-4"
                                                    />
                                                </svg>
                                                <a
                                                    href="#"
                                                    className="ms-1 text-sm font-medium text-gray-600 hover:text-gray-900 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                                                >
                                                    Projects
                                                </a>
                                            </div>
                                        </li>
                                        <li aria-current="page">
                                            <div className="flex items-center">
                                                <svg className="mx-1 h-3 w-3 text-gray-400 rtl:rotate-180" fill="none" viewBox="0 0 6 10">
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="m1 9 4-4-4-4"
                                                    />
                                                </svg>
                                                <span className="ms-1 text-sm font-medium text-gray-600 md:ms-2 dark:text-gray-400">Blog</span>
                                            </div>
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="grid grid-cols-6 gap-8">
                                <div className="col-span-6 space-y-6 md:col-span-4">
                                    <p className="mb-0.5 w-[max-content] rounded-sm bg-gray-900 px-3 py-0.5 text-white">{blog.category}</p>
                                    <h1 className="mb-1 text-2xl font-semibold text-gray-800">{blog.title}</h1>
                                    <div className="text-sm text-gray-500">Published- {blog.createdat}</div>
                                    <p className="text-base leading-relaxed whitespace-pre-line text-gray-700">{blog.content}</p>
                                </div>
                                <div className="col-span-6 md:col-span-2">
                                    <div className="sticky top-28 space-y-4">
                                        <div className="rounded-md bg-gray-100 p-4 text-gray-700 shadow-sm">
                                            {otherBlogs.slice(0, 5).map((otherBlogs) => (
                                                <OtherBlogs key={otherBlogs.id} blogs={otherBlogs} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className=" mt-10">
                        <p className="course_title">Frequently Asked Question</p>
                        <FAQ faqs={blogfaq} />
                    </div>
                </div>
            </div>
        </WebLayout>
    );
}
