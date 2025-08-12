import { useForm } from '@inertiajs/react';
import React from 'react';

export default function StudentLogin() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/student/logins');
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
            {/* Background with overlay */}
            <div className="custom_bg"></div>

            {/* Foreground content */}
            <div className="relative z-10 m-4 w-full max-w-[1000px] rounded-2xl bg-white p-8 shadow-lg">
               <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-2 gap-10">
                    <div className="">
                        <img src="/build/assets/web-assets/student_loginhero.jpg" className='student_login_hero' alt="" />
                    </div>
                    <div className="">
                        <h2 className="mb-6 text-center text-3xl font-bold text-blue-700">Student Login</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    placeholder="Enter your email"
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    placeholder="Enter your password"
                                />
                                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white transition duration-200 hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {processing ? 'Logging in...' : 'Login'}
                                </button>
                            </div>
                        </form>
                        <div className="mt-6 text-center text-sm text-gray-600">
                            Don&apos;t have an account?{' '}
                            <a href="/student/register" className="text-blue-600 hover:underline">
                                Register here
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
