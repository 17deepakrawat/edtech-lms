import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { Head } from '@inertiajs/react';

interface BreadcrumbItem {
    title: string;
    href: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home Components',
        href: '/home-components',
    },
];

export default function HomeComponents({ auth }: PageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Home Components" />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Home Components</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Add your home components here */}
                </div>
            </div>
        </AppLayout>
    );
}
