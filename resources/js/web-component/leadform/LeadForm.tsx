import React from 'react';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';

export default function LeadForm() {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        email: '',
        phone: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('leads.store'), {
            onSuccess: () => {
                toast.success('Lead created successfully');
                reset();
            },
            onError: () => {
                toast.error('Failed to create Lead');
            },
        });
    };

    return (
        <div className="absolute bottom-[-60px] z-50 w-full">
            <div className="z-100 container">
                <div className="mx-auto rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
                    <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">Get in Touch</h2>
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 items-end justify-center space-x-7 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6"
                    >
                        <div className="col-span-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Your Name"
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                                {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="your@email.com"
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                                <input
                                    type="tel"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    placeholder="1234567890"
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                                {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                            </div>
                        </div>
                        <div className="col-span-1 flex items-end justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-customgreen-600 mt-4 rounded-md px-4 py-2 font-semibold text-white transition duration-300 hover:bg-blue-700 disabled:opacity-50"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
