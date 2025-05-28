import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Plan {
    id: number;
    title: string;
    price: number;
    frequency: string;
    features: string[];
    disabled_features: string[];
}

interface Props extends PageProps {
    plan: Plan;
}

export default function Edit({ plan }: Props) {
    const [data, setData] = useState({
        title: plan.title,
        price: plan.price.toString(),
        frequency: plan.frequency,
        features: plan.features,
        disabled_features: plan.disabled_features,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(route('plans.update', plan.id), {
            ...data,
            features: data.features.filter(f => f.trim() !== ''),
            disabled_features: data.disabled_features.filter(f => f.trim() !== ''),
        }, {
            onSuccess: () => {
                toast.success('Plan updated successfully');
            },
            onError: (errors) => {
                Object.values(errors).forEach((error) => {
                    toast.error(error);
                });
            },
        });
    };

    const addFeature = () => {
        setData((prev) => ({
            ...prev,
            features: [...prev.features, ''],
        }));
    };

    const removeFeature = (index: number) => {
        setData((prev) => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index),
        }));
    };

    const addDisabledFeature = () => {
        setData((prev) => ({
            ...prev,
            disabled_features: [...prev.disabled_features, ''],
        }));
    };

    const removeDisabledFeature = (index: number) => {
        setData((prev) => ({
            ...prev,
            disabled_features: prev.disabled_features.filter((_, i) => i !== index),
        }));
    };

    return (
        <AppLayout>
            <Head title="Edit Plan" />

            <div className="container mx-auto p-4">
                <div className="mb-4">
                    <h1 className="text-2xl font-bold">Edit Plan</h1>
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
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit">Update Plan</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
