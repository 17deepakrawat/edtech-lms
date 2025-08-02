import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { toast } from 'sonner';

export default function Edit({ paymentGateway }: { paymentGateway: any }) {
    console.log(paymentGateway);
    const { data, setData, put, processing, errors } = useForm({
        name: paymentGateway.name || '',
        code: paymentGateway.code || '',
        mode: paymentGateway.mode || 'sandbox',
        public_key: paymentGateway.public_key || '',
        secret_key: paymentGateway.secret_key || '',
        webhook_url: paymentGateway.webhook_url || '',
        redirect_url: paymentGateway.redirect_url || '',
        api_url: paymentGateway.api_url || '',
        status: paymentGateway.status ? true : false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/payment-gateways/${paymentGateway.id}`, {
            data,
            preserveScroll: true,
            onSuccess: () => toast.success('Payment gateway updated successfully'),
            onError: () => toast.error('Update failed. Please check the input.'),
        });
    };

    return (
        <AppLayout>
            <Head title="Edit Payment Gateway" />
            <div className="px-4">
                <h1 className="mb-6 text-2xl font-bold">Edit Payment Gateway</h1>

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
                        <Label>Webhook URL</Label>
                        <Input value={data.webhook_url} onChange={(e) => setData('webhook_url', e.target.value)} />
                        {errors.webhook_url && <p className="text-sm text-red-500">{errors.webhook_url}</p>}
                    </div>

                    <div>
                        <Label>Redirect URL</Label>
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
                            <Button variant="outline">← Cancel</Button>
                        </Link>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Update'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
