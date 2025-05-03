import { NavFooter } from '@/components/nav-footer';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { PageProps } from '@inertiajs/core';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, FileText, Folder, GraduationCap, LayoutGrid } from 'lucide-react';
import { useState } from 'react';
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
        title: 'Web',
        icon: Folder,
        children: [
            {
                title: 'Home Components',
                href: '/home-components',
                icon: LayoutGrid,
            },
            {
                title: 'Menus',
                href: '/web/menus',
                icon: LayoutGrid,
            },
            {
                title: 'Sections',
                href: '/web/sections',
                icon: LayoutGrid,
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
    const [openAccordion, setOpenAccordion] = useState<number | null>(null);

    const getNavItems = () => {
        if (userRoles.includes('admin')) {
            return adminNavItems;
        } else if (userRoles.includes('mentor')) {
            return mentorNavItems;
        } else {
            return studentNavItems;
        }
    };

    const toggleAccordion = (index: number) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
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

            <SidebarContent>
                <SidebarMenu>
                    {getNavItems().map((item, index) => {
                        if (item.title === 'Web' && item.children) {
                            return (
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton onClick={() => toggleAccordion(index)} className="group relative flex items-center">
                                        {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                                        {item.title}
                                    </SidebarMenuButton>

                                    {openAccordion === index && (
                                        <div className="accordion ms-4 mt-2 space-y-1">
                                            {item.children.map((child, i) => (
                                                <Link
                                                    key={i}
                                                    href={child.href}
                                                    className="flex items-center text-sm text-gray-700 hover:text-black dark:text-white dark:hover:text-gray-100"
                                                >
                                                    {child.icon && <child.icon className="mr-2 h-4 w-4" />}
                                                    {child.title}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </SidebarMenuItem>
                            );
                        }

                        return (
                            <SidebarMenuItem key={index}>
                                <SidebarMenuButton className="flex items-center">
                                    {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                                    <Link href={item.href || '#'}>{item.title}</Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
