import { Button } from '@/components/ui/button';
import { Dialog } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { X } from 'lucide-react';
import { useState } from 'react';

interface EnrollProps {
    enrollCourse: {
        id: number;
        price: string;
        name: string;
        slug: string;
        image: string;
    };
    gateway?: any; // optional, if you pass gateway config
}

export default function Enroll({ enrollCourse }: EnrollProps) {
    // console.log(gateway);
    const [isOpen, setIsOpen] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        course_id: enrollCourse.id,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('enroll.submit'), {
            preserveScroll: true,
            onSuccess: () => {
                setIsOpen(false);
            },
        });
    };

    return (
        <>
            <Button className="bg-white text-green-600 hover:bg-green-100" size="sm" onClick={() => setIsOpen(true)}>
                Enroll
            </Button>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="relative w-full max-w-4xl rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
                        <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-red-600"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="mb-2 text-2xl font-bold text-gray-800 dark:text-white">{enrollCourse.name}</h2>

                        <img src={`/storage/${enrollCourse.image}`} alt="" className="mb-4 max-h-[300px] w-full object-cover" />

                        <p className="mb-4 text-lg font-semibold text-green-600">Price: ₹{enrollCourse.price}</p>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="mt-4 md:col-span-2">
                                <Button type="submit" className="w-full bg-green-600 py-3 text-white" disabled={processing}>
                                    Submit & Pay
                                </Button>
                            </div>
                        </form>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    );
}
