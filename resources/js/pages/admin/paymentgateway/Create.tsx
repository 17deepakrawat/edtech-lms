import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { toast } from 'sonner';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        code: '',
        mode: 'sandbox',
        public_key: '',
        secret_key: '',
        webhook_url: '',
        redirect_url: '',
        api_url: '',
        status: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/payment-gateways', {
            data,
            preserveScroll: true,
            onSuccess: () => toast.success('Payment gateway created successfully'),
            onError: () => toast.error('Please check your input and try again.'),
        });
    };

    return (
        <AppLayout>
            <Head title="Create Payment Gateway" />
            <div className="px-4">
                <h1 className="mb-6 text-2xl font-bold">Create Payment Gateway</h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <Label>Name</Label>
                        <Input value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>

                    <div>
                        <Label>Code</Label>
                        <Input value={data.code} onChange={(e) => setData('code', e.target.value)} />
                        {errors.code && <p className="text-sm text-red-500">{errors.code}</p>}
                    </div>

                    <div>
                        <Label>Mode</Label>
                        <Select value={data.mode} onValueChange={(value) => setData('mode', value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select mode" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="sandbox">Sandbox</SelectItem>
                                <SelectItem value="live">Live</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.mode && <p className="text-sm text-red-500">{errors.mode}</p>}
                    </div>
                    <div>
                        <Label>Public Key</Label>
                        <Input value={data.public_key} onChange={(e) => setData('public_key', e.target.value)} />
                        {errors.public_key && <p className="text-sm text-red-500">{errors.public_key}</p>}
                    </div>

                    <div>
                        <Label>Secret Key</Label>
                        <Input value={data.secret_key} onChange={(e) => setData('secret_key', e.target.value)} />
                        {errors.secret_key && <p className="text-sm text-red-500">{errors.secret_key}</p>}
                    </div>

                    <div>
                        <Label>Success URL</Label>
                        <Input value={data.webhook_url} onChange={(e) => setData('webhook_url', e.target.value)} />
                        {errors.webhook_url && <p className="text-sm text-red-500">{errors.webhook_url}</p>}
                    </div>

                    <div>
                        <Label>Error URL</Label>
                        <Input value={data.redirect_url} onChange={(e) => setData('redirect_url', e.target.value)} />
                        {errors.redirect_url && <p className="text-sm text-red-500">{errors.redirect_url}</p>}
                    </div>

                    <div>
                        <Label>API URL</Label>
                        <Input value={data.api_url} onChange={(e) => setData('api_url', e.target.value)} />
                        {errors.api_url && <p className="text-sm text-red-500">{errors.api_url}</p>}
                    </div>

                    <div className="flex justify-end gap-2">
                        <Link href="/payment-gateways">
                            <Button variant="outline">← Back</Button>
                        </Link>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Create'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
