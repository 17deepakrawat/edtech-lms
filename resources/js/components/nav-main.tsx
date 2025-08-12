import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    const userPermissions: string[] = page.props.auth.permissions;
    const [openItems, setOpenItems] = useState<string[]>([]);

    const toggleItem = (title: string) => {
        setOpenItems((prev) =>
            prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]
        );
    };

    // Recursively find parent titles of the active route
    const findParentItems = (
        items: NavItem[],
        targetPath: string,
        parents: string[] = []
    ): string[] => {
        for (const item of items) {
            if (item.children) {
                if (item.children.some((child) => child.href === targetPath)) {
                    return [...parents, item.title];
                }
                const found = findParentItems(item.children, targetPath, [...parents, item.title]);
                if (found.length > 0) {
                    return found;
                }
            }
        }
        return [];
    };

    // Recursively check if the user has permission for an item or any of its children
    const hasAnyPermission = (item: NavItem): boolean => {
        if (!item.permissions) return true;

        const hasDirect =
            Array.isArray(item.permissions)
                ? item.permissions.some((p) => userPermissions.includes(p))
                : userPermissions.includes(item.permissions);

        if (hasDirect) return true;

        if (item.children) {
            return item.children.some((child) => hasAnyPermission(child));
        }

        return false;
    };

    useEffect(() => {
        const currentPath = page.url;
        const parentItems = findParentItems(items, currentPath);
        setOpenItems(parentItems);
    }, [page.url, items]);

    const renderNavItem = (item: NavItem, level = 0) => {
        if (!hasAnyPermission(item)) return null;

        const isActive = page.url === item.href;

        if (item.children && item.children.length > 0) {
            return (
                <div key={item.title}>
                    <SidebarMenuButton onClick={() => toggleItem(item.title)} className="w-full">
                        {item.icon && <item.icon className="h-5 w-5" />}
                        <span>{item.title}</span>
                        <ChevronDown
                            className={cn(
                                'ml-auto h-4 w-4 transition-transform duration-200',
                                openItems.includes(item.title) ? 'rotate-180' : ''
                            )}
                        />
                    </SidebarMenuButton>

                    <div
                        className={cn(
                            'overflow-hidden transition-all duration-200 ease-in-out',
                            openItems.includes(item.title)
                                ? 'max-h-[500px] opacity-100'
                                : 'max-h-0 opacity-0'
                        )}
                    >
                        <div className={cn('space-y-1', level === 0 ? 'ml-4' : 'ml-6')}>
                            {item.children.map((child) => renderNavItem(child, level + 1))}
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <SidebarMenuButton
                asChild
                key={item.title}
                isActive={isActive}
                tooltip={{ children: item.title }}
                className="w-full"
            >
                <Link href={item.href} prefetch>
                    {item.icon && <item.icon className="h-5 w-5" />}
                    <span>{item.title}</span>
                </Link>
            </SidebarMenuButton>
        );
    };

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu className="space-y-1">
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>{renderNavItem(item)}</SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
