import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    const [openItems, setOpenItems] = useState<string[]>([]);

    // Function to find parent items of a given path
    const findParentItems = (items: NavItem[], targetPath: string, parents: string[] = []): string[] => {
        for (const item of items) {
            if (item.children) {
                if (item.children.some((child: NavItem) => child.href === targetPath)) {
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

    // Update open items when URL changes
    useEffect(() => {
        const currentPath = page.url;
        const parentItems = findParentItems(items, currentPath);
        setOpenItems(parentItems);
    }, [page.url, items]);

    const toggleItem = (title: string) => {
        setOpenItems(prev => 
            prev.includes(title) 
                ? prev.filter(item => item !== title)
                : [...prev, title]
        );
    };

    const renderNavItem = (item: NavItem, level: number = 0) => {
        if (item.children) {
            return (
                <>
                    <SidebarMenuButton
                        onClick={() => toggleItem(item.title)}
                        className="w-full"
                    >
                        {item.icon && <item.icon className="h-5 w-5" />}
                        <span>{item.title}</span>
                        <ChevronDown 
                            className={cn(
                                "ml-auto h-4 w-4 transition-transform duration-200",
                                openItems.includes(item.title) ? "rotate-180" : ""
                            )} 
                        />
                    </SidebarMenuButton>
                    <div 
                        className={cn(
                            "overflow-hidden transition-all duration-200 ease-in-out",
                            openItems.includes(item.title) ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                        )}
                    >
                        <div className={cn(
                            "space-y-1",
                            level === 0 ? "ml-4" : "ml-6"
                        )}>
                            {item.children.map((child: NavItem) => (
                                <div key={child.title} className="py-1">
                                    {renderNavItem(child, level + 1)}
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            );
        }

        return (
            <SidebarMenuButton
                asChild
                isActive={item.href === page.url}
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
                    <SidebarMenuItem key={item.title}>
                        {renderNavItem(item)}
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
