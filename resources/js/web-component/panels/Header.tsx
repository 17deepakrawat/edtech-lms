import { Link, usePage } from '@inertiajs/react';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState,useRef } from 'react';

export default function Header() {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const [darkMode, setDarkMode] = useState(false);
    const { student_data } = usePage().props;

    // Get initials from student_data
    const getInitial = () => {
        if (!student_data) return '';
        const firstInitial = student_data.first_name?.charAt(0) || '';
        const lastInitial = student_data.last_name?.charAt(0) || '';
        return (firstInitial + lastInitial).toUpperCase();
    };
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    // Load theme from localStorage or system preference
    useEffect(() => {
        const savedMode = localStorage.getItem('theme');
        const isDark = savedMode === 'dark' || (!savedMode && window.matchMedia('(prefers-color-scheme: dark)').matches);
        setDarkMode(isDark);
        document.documentElement.classList.toggle('dark', isDark);
    }, []);

    // Toggle theme
    const toggleTheme = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem('theme', newMode ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', newMode);
    };

    return (
        <nav className="dark:shadow-sm-white fixed top-0 z-100 w-full border-gray-200 bg-white shadow-sm dark:border-b dark:border-b-gray-400 dark:bg-gray-900">
            <div className="container">
                <div className="flex flex-wrap items-center justify-between px-0 py-4">
                    {/* Logo */}
                    <Link href="/" className="flex w-[82px] items-center space-x-3 sm:w-[120px] rtl:space-x-reverse">
                        <img src="/build/assets/web-assets/edtech_logo.png" className="h-8" alt="Logo" />
                    </Link>

                    {/* Right Side Icons */}
                    <div className="flex items-center space-x-1 md:order-2 md:space-x-2 rtl:space-x-reverse">
                        {/* Theme toggle */}
                        <div onClick={toggleTheme} className="cursor-pointer">
                            {darkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-700" />}
                        </div>

                        {/* Student Avatar or Login/Signup */}
                        {/* {student_data ? (
                            student_data.photo ? (
                                <img src={`/${student_data.photo}`} alt="Profile" className="h-10 w-10 rounded-full border-2 border-green-500 object-cover" />
                            ) : ( <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 font-bold text-white"> {getInitial()} </div> )
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="rounded-sm px-2 py-1 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                                >
                                    Login
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-sm bg-[#669c76] px-2 py-1 text-sm font-medium text-white hover:bg-green-900 focus:ring-4 focus:ring-green-300 focus:outline-none dark:bg-green-900 dark:focus:ring-green-800"
                                >
                                    Sign up
                                </Link>
                            </>
                        )} */}
                        <div className="relative">
                            {student_data ? (
                                <div>
                                    {/* Profile Image / Initial */}
                                    <button onClick={() => setOpen(!open)} className="flex items-center focus:outline-none">
                                        {student_data.photo ? (
                                            <img
                                                src={`/${student_data.photo}`}
                                                alt="Profile"
                                                className="h-10 w-10 rounded-full border-2 border-green-500 object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 font-bold text-white">
                                                {getInitial()}
                                            </div>
                                        )}
                                    </button>

                                    {/* Dropdown Menu */}
                                    {open && (
                                        <div className="ring-opacity-5 absolute right-0 z-50 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-gray-300">
                                            <Link href="/student-dashboard" className="block px-4 font-bold py-2 text-sm text-gray-900 hover:bg-gray-100">
                                                Student Dashboard
                                            </Link>
                                            {/* <Link href="/my-learning" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                My Learning
                                            </Link> */}
                                            <Link
                                                href={route('student-logout')}
                                                method="post"
                                                as="button"
                                                className="block w-full px-4 py-2 text-left font-bold text-sm text-red-400 hover:bg-red-50"
                                            >
                                                Logout
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <Link href={route('login')} className="rounded-sm px-2 py-1 text-sm font-medium text-gray-800 hover:bg-gray-50">
                                        Login
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-sm bg-[#669c76] px-2 py-1 text-sm font-medium text-white hover:bg-green-900"
                                    >
                                        Sign up
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile menu toggle */}
                        <button
                            data-collapse-toggle="mega-menu"
                            type="button"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="mega-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation links */}
                    <div id="mega-menu" className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto">
                        <ul className="mt-4 flex flex-col font-medium md:mt-0 md:flex-row md:space-x-8 rtl:space-x-reverse">
                            <li>
                                <Link
                                    href="/about"
                                    className="block px-3 py-2 text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-500"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/course"
                                    className="block px-3 py-2 text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-500"
                                >
                                    Courses
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/blogs"
                                    className="block px-3 py-2 text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-500"
                                >
                                    Blogs
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="block px-3 py-2 text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-500"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}
