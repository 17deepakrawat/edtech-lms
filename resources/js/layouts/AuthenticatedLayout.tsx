import { ReactNode } from 'react';
import { User } from '@/types';

interface Props {
    user: User;
    children: ReactNode;
    header?: ReactNode;
}

export default function AuthenticatedLayout({ user, header, children }: Props) {
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <a href="/" className="text-xl font-bold">
                                    Your Logo
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="ml-3 relative">
                                <span className="text-gray-800">{user.name}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
} 