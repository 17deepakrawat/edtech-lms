import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props extends PageProps {}

export default function Create({ auth }: Props) {
    const [data, setData] = useState({
        title: '',
        price: '',
        frequency: 'monthly',
        features: [''],
        disabled_features: [''],
        status: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        router.post(route('admin.plans.store'), {
            ...data,
            features: data.features.filter(f => f.trim() !== ''),
            disabled_features: data.disabled_features.filter(f => f.trim() !== ''),
        }, {
            onSuccess: () => toast.success('Plan created successfully'),
            onError: (errors) => {
                Object.values(errors).forEach((error) => toast.error(error));
            },
        });
    };

    const addFeature = () => {
        setData((prev) => ({ ...prev, features: [...prev.features, ''] }));
    };

    const removeFeature = (index: number) => {
        setData((prev) => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index),
        }));
    };

    const addDisabledFeature = () => {
        setData((prev) => ({ ...prev, disabled_features: [...prev.disabled_features, ''] }));
    };

    const removeDisabledFeature = (index: number) => {
        setData((prev) => ({
            ...prev,
            disabled_features: prev.disabled_features.filter((_, i) => i !== index),
        }));
    };

    return (
        <AppLayout>
            <Head title="Create Plan" />

            <div className="container mx-auto p-4">
                <div className="mb-4">
                    <h1 className="text-2xl font-bold">Create New Plan</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) => setData((prev) => ({ ...prev, title: e.target.value }))}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="price">Price</Label>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                value={data.price}
                                onChange={(e) => setData((prev) => ({ ...prev, price: e.target.value }))}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="frequency">Frequency</Label>
                            <Select
                                value={data.frequency}
                                onValueChange={(value) => setData((prev) => ({ ...prev, frequency: value }))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select frequency" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="monthly">Monthly</SelectItem>
                                    <SelectItem value="yearly">Yearly</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label>Features</Label>
                            {data.features.map((feature, index) => (
                                <div key={index} className="mt-2 flex items-center gap-2">
                                    <Input
                                        value={feature}
                                        onChange={(e) => {
                                            const newFeatures = [...data.features];
                                            newFeatures[index] = e.target.value;
                                            setData((prev) => ({ ...prev, features: newFeatures }));
                                        }}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeFeature(index)}
                                    >
                                        <Trash2 className="h-4 w-4 text-red-600" />
                                    </Button>
                                </div>
                            ))}
                            <Button type="button" variant="outline" onClick={addFeature} className="mt-2">
                                <Plus className="mr-2 h-4 w-4" /> Add Feature
                            </Button>
                        </div>

                        <div>
                            <Label>Disabled Features</Label>
                            {data.disabled_features.map((feature, index) => (
                                <div key={index} className="mt-2 flex items-center gap-2">
                                    <Input
                                        value={feature}
                                        onChange={(e) => {
                                            const newFeatures = [...data.disabled_features];
                                            newFeatures[index] = e.target.value;
                                            setData((prev) => ({ ...prev, disabled_features: newFeatures }));
                                        }}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeDisabledFeature(index)}
                                    >
                                        <Trash2 className="h-4 w-4 text-red-600" />
                                    </Button>
                                </div>
                            ))}
                            <Button type="button" variant="outline" onClick={addDisabledFeature} className="mt-2">
                                <Plus className="mr-2 h-4 w-4" /> Add Disabled Feature
                            </Button>
                        </div>

                        {/* <div className="flex items-center space-x-2">
                            <Switch
                                id="status"
                                checked={data.status}
                                onCheckedChange={(checked) => setData((prev) => ({ ...prev, status: checked }))}
                            />
                            <Label htmlFor="status">Active</Label>
                        </div> */}
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit">Create Plan</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
