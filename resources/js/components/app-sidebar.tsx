import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { PageProps } from '@inertiajs/core';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, FileText, Folder, GraduationCap, LayoutGrid, Users } from 'lucide-react';
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
        children: [
             {
                title: 'Permissions',
                href: '/permissions',
                icon: Users,
            },
            {
                title: 'Roles ',
                href: 'roles',
                icon: Users,
            },
            {
                title: 'Users',
                href: 'users',
                icon: Users,
            },          
           
        ],
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
            {
                title: 'Leads',
                href: '/leads',
                icon: Users,
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
    
];

export function AppSidebar() {
    const { auth } = usePage<AppPageProps>().props;
    const userRoles = auth.roles || [];

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
