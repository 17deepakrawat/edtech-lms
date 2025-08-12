import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { PageProps } from '@inertiajs/core';
import { Link, usePage } from '@inertiajs/react';
import { FileText, GraduationCap, LayoutGrid, Users, Video } from 'lucide-react';
import AppLogo from './app-logo';

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
        title: 'Role/Permission',
        icon: Users,
        permissions: 'view role permision',
        children: [
            {
                title: 'Permissions',
                href: '/permissions',
                icon: Users,
                permissions: 'view permision',
            },
            {
                title: 'Roles ',
                href: 'roles',
                icon: Users,
                permissions: 'view role',
            },
            {
                title: 'Users',
                href: 'users',
                icon: Users,
                permissions: 'view user',
            },
            {
                title: 'Mentor',
                href: 'mentors',
                icon: Users,
                permissions: 'view course mentor',
            },
        ],
    },
    {
        title: 'Webpage',
        icon: Users,
        permissions: 'view web',
        children: [
            {
                title: 'Home Components',
                icon: Users,
                permissions: 'view home component',

                children: [
                    {
                        title: 'Home Banner',
                        href: '/banner',
                        icon: Users,
                        permissions: 'view banner',
                    },
                    {
                        title: 'Feedback',
                        href: '/feedback',
                        icon: Users,
                        permissions: 'view feedback',
                    },
                    {
                        title: 'University Partner',
                        href: '/universitypartner',
                        icon: Users,
                        permissions: 'view university partner',
                    },
                    {
                        title: 'What We Offer',
                        href: '/weoffers',
                        icon: Users,
                        permissions: 'view offer',
                    },
                    {
                        title: 'Course Plans',
                        href: '/plans',
                        icon: Users,
                        permissions: 'view course plans',
                    },
                ],
            },
            {
                title: 'Academic Content',
                icon: Users,
                permissions: 'view academic',
                children: [
                    {
                        title: 'Departments',
                        href: '/department',
                        icon: Users,
                        permissions: 'view department',
                    },
                    {
                        title: 'Programs',
                        href: '/programs',
                        icon: Users,
                        permissions: 'view program',
                    },
                    {
                        title: 'Courses',
                        href: '/courses',
                        icon: Users,
                        permissions: 'view course',
                    },
                    {
                        title: 'Units',
                        href: '/units',
                        icon: Users,
                        permissions: 'view unit',
                    },
                    {
                        title: 'Topics',
                        href: '/topics',
                        icon: Users,
                        permissions: 'view topics',
                    },
                    {
                        title: 'Course Video',
                        href: '/videos',
                        icon: Users,
                        permissions: 'view course video',
                    },
                ],
            },
            {
                title: 'Blog',
                icon: Users,
                permissions: 'view blogs module',
                children: [
                    {
                        title: 'Blog Category',
                        href: '/blogcategories',
                        icon: Users,
                        permissions: 'view blogs category',
                    },
                    {
                        title: 'Blog',
                        href: '/adminblogs',
                        icon: Users,
                        permissions: 'view blogs',
                    },
                ],
            },
            {
                title: 'Leads',
                href: '/leads',
                icon: Users,
                permissions: 'view lead',
            },
        ],
    },
    {
        title: 'Payments',
        icon: Users,
        // permissions: 'view role permision',
        children: [
            {
                title: 'Payment Gateway',
                href: 'payment-gateways',
                icon: Users,
                // permissions: 'view permision',
            },
             {
                title: 'Payment History',
                href: '/payments',
                icon: Users,
                // permissions: 'view permision',
            },
        ],
    },
     {
        title: 'Academics',
        icon: Users,
        // permissions: 'view role permision',
        children: [
            {
                title: 'Students',
                href: 'students',
                icon: Users,
                // permissions: 'view permision',
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
        href: '/student-dashboard',
        icon: LayoutGrid,
        permissions: 'view dashboard',
    },
    {
        title: 'My Learning',
        href: '/my-learning',
        icon: GraduationCap,
        permissions: 'view my-learning',
    },
    {
        title: 'My Courses',
        href: '/my-courses',
        icon: Video,
        permissions: 'view my-courses',
    },
    {
        title: 'Certificates',
        href: '/certificates',
        icon: GraduationCap,
        permissions: 'view my-certificates',

    },
     {
        title: 'Support',
        href: '/support',
        icon: GraduationCap,
        permissions: 'view my-support',

    },

];
const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    const { auth } = usePage<AppPageProps>().props;
    const userRoles = auth.roles || [];

    const getNavItems = () => {
        if (userRoles.includes('admin')) {
            return adminNavItems;
        } else if (userRoles.includes('mentor')) {
            return mentorNavItems;
        } else {
            // console.log(userRoles);
            return studentNavItems;
        }
    };

    return (
        <Sidebar collapsible="icon" variant="inset" className="scrollbar-none h-screen overflow-y-auto">
            <SidebarHeader className="bg-background sticky top-0 z-10">
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

            <SidebarContent className="scrollbar-none flex-1 overflow-y-auto">
                <NavMain items={getNavItems()} />
            </SidebarContent>

            <SidebarFooter className="bg-background sticky bottom-0 z-10">
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
