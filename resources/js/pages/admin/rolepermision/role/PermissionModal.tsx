import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';

interface PermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: {
    id: number;
    name: string;
  } | null;
  allPermissions: string[];
  assignedPermissions: string[];
}

export default function PermissionModal({
  isOpen,
  onClose,
  role,
  allPermissions,
  assignedPermissions,
}: PermissionModalProps) {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen && assignedPermissions) {
      setSelectedPermissions(assignedPermissions);
    }
  }, [isOpen, assignedPermissions]);

  const togglePermission = (permission: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const handleSave = () => {
    if (!role) return;
    router.post(`/api/roles/${role.id}/update-permissions`, {
      permission: selectedPermissions,
    }, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  // Group permissions: { students: [assign, view], course: [create, edit], ... }
  const grouped = allPermissions.reduce<Record<string, string[]>>((acc, permission) => {
    const parts = permission.split(' ');
    if (parts.length < 2) return acc;
    const [action, ...rest] = parts;
    const name = rest.join(' '); // In case it's like 'view student data'
    if (!acc[name]) acc[name] = [];
    acc[name].push(action);
    return acc;
  }, {});

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent style={{ maxWidth: '80%' }}>
        <DialogHeader>
          <DialogTitle>
            Allot Permissions to Role: <span className="capitalize">{role?.name}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
          {Object.entries(grouped).map(([name, actions]) => (
            <div key={name} className='flex gap-x-3'>
              <div className="font-bold capitalize mb-2">{name}</div>
              <div className="flex flex-wrap gap-4">
                {actions.map((action) => {
                  const fullPermission = `${action} ${name}`;
                  return (
                    <div key={fullPermission} className="flex items-center gap-2">
                      <Checkbox
                        id={fullPermission}
                        checked={selectedPermissions.includes(fullPermission)}
                        onCheckedChange={() => togglePermission(fullPermission)}
                      />
                      <label htmlFor={fullPermission} className="capitalize">{action}</label>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
