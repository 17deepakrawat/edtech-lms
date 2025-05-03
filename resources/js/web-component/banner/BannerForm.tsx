import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { type Banner } from '@/types/banner';
import axios from 'axios';
import { toast } from 'sonner';

interface BannerFormProps {
    banner?: Banner;
    onSubmit: (banner: Banner) => void;
    onCancel: () => void;
}

export default function BannerForm({ banner, onSubmit, onCancel }: BannerFormProps) {
    const [formData, setFormData] = useState<Omit<Banner, 'id'> | Banner>({
        id: banner?.id,
        title: banner?.title ?? '',
        description: banner?.description ?? '',
        image: banner?.image ?? '',
        link: banner?.link ?? '',
        status: banner?.status ?? true,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (banner) {
                // Update existing banner
                const response = await axios.put(`/api/banners/${banner.id}`, formData);
                onSubmit(response.data);
                toast.success('Banner updated successfully');
            } else {
                // Create new banner
                const response = await axios.post('/api/banners', formData);
                onSubmit(response.data);
                toast.success('Banner created successfully');
            }
        } catch (error) {
            console.error('Error saving banner:', error);
            toast.error('Failed to save banner');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    value={formData.title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                        setFormData({ ...formData, title: e.target.value })
                    }
                    required
                    disabled={isSubmitting}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => 
                        setFormData({ ...formData, description: e.target.value })
                    }
                    required
                    disabled={isSubmitting}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                    id="image"
                    type="url"
                    value={formData.image}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                        setFormData({ ...formData, image: e.target.value })
                    }
                    required
                    disabled={isSubmitting}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="link">Link</Label>
                <Input
                    id="link"
                    type="url"
                    value={formData.link}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                        setFormData({ ...formData, link: e.target.value })
                    }
                    required
                    disabled={isSubmitting}
                />
            </div>
            <div className="flex items-center space-x-2">
                <Switch
                    id="status"
                    checked={formData.status}
                    onCheckedChange={(checked: boolean) => 
                        setFormData({ ...formData, status: checked })
                    }
                    disabled={isSubmitting}
                />
                <Label htmlFor="status">Active</Label>
            </div>
            <div className="flex justify-end space-x-2">
                <Button 
                    type="button" 
                    variant="outline" 
                    onClick={onCancel}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
                <Button 
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Saving...' : (banner ? 'Update Banner' : 'Create Banner')}
                </Button>
            </div>
        </form>
    );
} 