import { Button } from '@/components/ui/button';
import { Dialog } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { X } from 'lucide-react';
import { useState } from 'react';
interface EnrollProps {
    enrollCourse: {
        id: number;
        price: string;
        name: string;
        slug?: string;
        image: string;
        duration?: string;
        short_description?: string;
    };
    enrollStatus?: number;
}

export default function Enroll({ enrollCourse, enrollStatus }: EnrollProps) {
    const [paymentLink, setPaymentLink] = useState<string | null>(null);
    const [showRedirectModal, setShowRedirectModal] = useState(false);
    const { student_data } = usePage().props;

    const [isOpen, setIsOpen] = useState(false);

    const fullname = [student_data.first_name, student_data.middle_name, student_data.last_name].filter(Boolean).join(' ');

    const { data, setData, post, processing } = useForm({
        student_id: student_data.id,
        course_id: enrollCourse.id,
        price: enrollCourse.price,
        course_name: enrollCourse.name,
        mobile_no: student_data.mobile,
        email: student_data.email,
        name: fullname,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(route('payment.submit'), data);

            if (response.data.payment_link) {
                setPaymentLink(response.data.payment_link);
                setShowRedirectModal(true);
            } else {
                alert('Payment link not found.');
            }
        } catch (error) {
            console.error(error);
            alert('Something went wrong while initiating the payment.');
        }
    };
    return (
        <>
            {enrollStatus == 0 ? (
                <Button className="bg-green-600 text-white" size="sm" onClick={() => setIsOpen(true)}>
                    Enroll
                </Button>
            ) : (
                <Button className="text-gray bg-white shadow-none hover:bg-white" size="sm">
                    Enrolled
                </Button>
            )}

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="relative w-full max-w-3xl rounded-xl bg-white p-6 shadow-xl dark:bg-gray-900">
                        <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-red-600"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close"
                        >
                            <X size={22} />
                        </button>

                        <div className="flex flex-col items-start space-y-4 text-start">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{enrollCourse.name}</h2>

                            <img src={`/storage/${enrollCourse.image}`} alt={enrollCourse.name} className="max-h-64 w-full rounded-lg object-cover" />

                            <p className="mb-0 text-lg font-semibold text-gray-800">Price: ₹ {enrollCourse.price}</p>
                            {enrollCourse.duration && (
                                <p className="mb-0 text-sm text-black dark:text-gray-300">Course Duration: {enrollCourse.duration}</p>
                            )}
                            {enrollCourse.short_description && <p className="text-gray-600 dark:text-gray-300">{enrollCourse.short_description}</p>}
                        </div>

                        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                            <Button
                                type="submit"
                                className="w-full rounded-lg bg-green-600 py-3 text-lg font-medium text-white hover:bg-green-700"
                                disabled={processing}
                            >
                                {processing ? 'Processing...' : 'Submit & Buy Course'}
                            </Button>
                        </form>
                    </Dialog.Panel>
                </div>
            </Dialog>
            {showRedirectModal && paymentLink && (
                <Dialog open={true} onClose={() => setShowRedirectModal(false)} className="relative z-50">
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg dark:bg-gray-900">
                            <h2 className="mb-4 text-center text-2xl font-bold text-gray-900 dark:text-white">Ready to Pay</h2>
                            <p className="mb-6 text-center text-gray-600 dark:text-gray-300">
                                You will now be redirected to Easebuzz to complete your payment.
                            </p>
                            <div className="flex justify-center gap-4">
                                <Button variant="outline" onClick={() => setShowRedirectModal(false)}>
                                    Cancel
                                </Button>
                                <Button
                                    className="bg-green-600 text-white"
                                    onClick={() => {
                                        window.location.href = paymentLink; // ✅ open in same tab
                                    }}
                                >
                                    Continue to Payment
                                </Button>
                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            )}
        </>
    );
}
