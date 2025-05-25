import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage, router } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Users, GraduationCap, Settings, FileText } from 'lucide-react';
import AppLogo from './app-logo';
import { PageProps } from '@inertiajs/core';

interface AppPageProps extends PageProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            avatar?: string;
        };
        roles: string[];
        permissions: string[];
    };
}

const adminNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Webpage',
        icon: Users,
        children: [
            {
                title: 'Home Components',
                icon: Users,
                children: [
                    {
                        title: 'Home Banner',
                        href: '/banner',
                        icon: Users,
                    },
                    {
                        title: 'Feedback',
                        href: '/feedback',
                        icon: Users,
                    },
                    {
                        title: 'University Partner',
                        href: '/universitypartner',
                        icon: Users,
                    },
                    {
                        title: 'What We Offer',
                        href: '/weoffers',
                        icon: Users,
                    },
                    {
                        title: 'Course Plans',
                        href: '/plans',
                        icon: Users,
                    },
                ],
            },
            {
                title: 'Courses',
                icon: Users,
                children: [
                    {
                        title: 'Departments',
                        href: '/department',
                        icon: Users,
                    },
                    {
                        title: 'Programs',
                        href: '/programs',
                        icon: Users,
                    },
                    {
                        title: 'Courses',
                        href: '/courses',
                        icon: Users,
                    },
                    {
                        title: 'Units',
                        href: '/units',
                        icon: Users,
                    },
                    {
                        title: 'Topics',
                        href: '/topics',
                        icon: Users,
                    },
                     {
                        title: 'Course Video',
                        href: '/videos',
                        icon: Users,
                    },
                     
                ],
            },
            {
                title: 'Blog',
                icon: Users,
                children: [
                    {
                        title: 'Blog Category',
                        href: '/blogcategories',
                        icon: Users,
                    },
                    {
                        title: 'Blog',
                        href: '/adminblogs',
                        icon: Users,
                    },
                ],
            },           
        ],
    },
];

const mentorNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'My Courses',
        href: '/my-courses',
        icon: FileText,
    },
    {
        title: 'Students',
        href: '/students',
        icon: GraduationCap,
    },
];

const studentNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'My Learning',
        href: '/my-learning',
        icon: GraduationCap,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { auth } = usePage<AppPageProps>().props;
    const userRoles = auth.roles || [];

    console.log('User roles:', userRoles);

    const getNavItems = () => {
        if (userRoles.includes('admin')) {
            return adminNavItems;
        } else if (userRoles.includes('mentor')) {
            return mentorNavItems;
        } else {
            return studentNavItems;
        }
    };

    return (
        <Sidebar 
            collapsible="icon" 
            variant="inset"
            className="h-screen overflow-y-auto scrollbar-none"
        >
            <SidebarHeader className="sticky top-0 z-10 bg-background">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="flex-1 overflow-y-auto scrollbar-none">
                <NavMain items={getNavItems()} />
            </SidebarContent>

            <SidebarFooter className="sticky bottom-0 z-10 bg-background">
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
