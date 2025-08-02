import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

export const usePermission = () => {
    const page = usePage<PageProps>();
    const userPermissions: string[] = page.props.auth.permissions;

    const hasPermission = (perm: string | string[]) => {
        if (Array.isArray(perm)) {
            return perm.some((p) => userPermissions.includes(p));
        }
        return userPermissions.includes(perm);
    };

    return { hasPermission };
};
