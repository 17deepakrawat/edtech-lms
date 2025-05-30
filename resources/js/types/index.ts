export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface PageProps {
    auth: {
        user: User;
    };
}

export interface NavItem {
    title: string;
    href?: string;
    icon: React.ComponentType<{ className?: string }>;
    children?: NavItem[];
} 