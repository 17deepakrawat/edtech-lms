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
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Student Login</h2>

                <div className="mb-4">
                    <label className="block mb-1" htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                    {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                </div>

                <div className="mb-6">
                    <label className="block mb-1" htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                    {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
                </div>

                <button type="submit" disabled={processing} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    {processing ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
}
