export default function LeadForm() {
    return (
        <>
            <div className="absolute bottom-[-60px] w-full z-50">
                <div className="z-100 container">
                    <div className="mx-auto rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
                        <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">Get in Touch</h2>
                        <form className="grid grid-cols-1 justify-center space-x-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                            <div className="mr-0 sm:mr-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <div className="mr-0 md:mr-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <div className="mr-0">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                                <input
                                    type="tel"
                                    placeholder="1234567890"
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                        </form>
                        <div className="w-full text-end sm:text-center">
                            <button
                                type="submit"
                                className="bg-customgreen-600 mt-2 rounded-md px-4 py-2 font-semibold text-white transition duration-300 hover:bg-blue-700"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
