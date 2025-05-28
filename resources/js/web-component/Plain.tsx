import { Head } from '@inertiajs/react';
import { CheckCircle, XCircle } from 'lucide-react';

interface Plan {
    id: number;
    title: string;
    price: number;
    frequency: string;
    features: string[];
    disabled_features: string[];
    status: boolean;
}

interface PlansProps {
    plans: Plan[];
}

export default function Plans({ plans }: PlansProps) {
    return (       
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        Select the perfect plan for your learning journey
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
                        >
                            <div className="p-6">
                                <h2 className="text-2xl font-bold mb-2">{plan.title}</h2>
                                <div className="mb-4">
                                    <span className="text-4xl font-bold">${plan.price}</span>
                                    <span className="text-gray-600 dark:text-gray-300">
                                        /{plan.frequency}
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    {plan.features?.map((feature, index) => (
                                        <div key={index} className="flex items-center">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                    {plan.disabled_features?.map((feature, index) => (
                                        <div key={index} className="flex items-center text-gray-400">
                                            <XCircle className="h-5 w-5 mr-2" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200">
                                    Get Started
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
       
    );
} 