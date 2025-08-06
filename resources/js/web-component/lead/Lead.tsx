import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import '@/web-component/lead/lead.module.css';
import style from '@/web-component/lead/lead.module.css';
import { Dialog } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function Lead({ slug }: { slug?: string }) {
    const { props } = usePage();
    const flash = props.flash as { success?: string; error?: string };
    const { student_data } = usePage().props;
    // console.log(student_data);
    localStorage.removeItem(`lead_submitted_${slug}`, 'true');
    const [isOpen, setIsOpen] = useState(false);
    const [countries, setCountries] = useState<string[]>([]);
    const [states, setStates] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const { data, setData, post, processing, reset } = useForm({
        first_name: '',
        middle_name: '',
        last_name: '',
        email: '',
        dob: '',
        mobile: '',
        country: 'India',
        state: '',
        city: '',
        gender: '',
        password: '',
        re_password: '',
        photo: '',
    });
    const validateFields = () => {
        const errors: Record<string, string> = {};
        if (!data.first_name.trim()) errors.first_name = 'First name is required';
        if (!data.last_name.trim()) errors.last_name = 'Last name is required';
        if (!data.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = 'Invalid email address';
        }
        if (!data.dob) errors.dob = 'Date of birth is required';
        if (!data.mobile.trim()) {
            errors.mobile = 'Mobile number is required';
        } else if (!/^\d{10,15}$/.test(data.mobile)) {
            errors.mobile = 'Invalid mobile number';
        }
        if (!data.country) errors.country = 'Country is required';
        if (!data.state) errors.state = 'State is required';
        if (!data.city) errors.city = 'City is required';
        if (!data.gender) errors.gender = 'Gender is required';
        if (!data.password || data.password.length < 6) errors.password = 'Password must be at least 6 characters';
        if (data.password !== data.re_password) errors.re_password = 'Passwords do not match';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };
    useEffect(() => {
    if (flash?.success) {
        toast.success(flash.success);
    }
    if (flash?.error) {
        toast.error(flash.error);
    }
}, [flash]);
    useEffect(() => {
        axios.get('https://countriesnow.space/api/v0.1/countries/positions').then((res) => {
            const countryNames = res.data.data.map((c: any) => c.name);
            setCountries(countryNames);
        });
    }, []);
    useEffect(() => {
        if (!data.country) return;
        axios.post('https://countriesnow.space/api/v0.1/countries/states', { country: data.country }).then((res) => {
            const stateNames = res.data.data.states.map((s: any) => s.name);
            setStates(stateNames);
            setCities([]);
        });
    }, [data.country]);
    useEffect(() => {
        if (!data.country || !data.state) return;

        const fetchCities = debounce(() => {
            axios
                .post('https://countriesnow.space/api/v0.1/countries/state/cities', {
                    country: data.country,
                    state: data.state,
                })
                .then((res) => {
                    setCities(res.data.data);
                });
        }, 400);

        fetchCities();

        return () => fetchCities.cancel();
    }, [data.country, data.state]);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateFields()) return;

        post(`/web-lead`, {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                // toast.success('Lead submitted successfully. Redirecting...');
                // localStorage.setItem(`lead_submitted_${slug}`, 'true');
                // setTimeout(() => {
                //     window.location.href = `/course/${slug}`;
                // }, 100);
                setIsOpen(false);
                reset();
            },
            onError: () => toast.error('Failed to submit lead'),
        });
    };
    return (
        <>
            <Button
                className="bg-white text-green-500 shadow-none hover:bg-white"
                size="sm"
                onClick={() => {
                    const hasSubmitted = localStorage.getItem(`lead_submitted_${slug}`);
                    if (student_data == '') {
                        window.location.href = `/course/${slug}`;
                    } else {
                        setIsOpen(true);
                    }
                }}
            >
                View
            </Button>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center overflow-y-auto p-2 sm:p-6">
                    {/* <Dialog.Panel className="relative w-[80%] rounded-lg bg-white p-4 shadow-xl sm:p-6 dark:bg-gray-800"> */}
                    <Dialog.Panel className="relative max-h-[90vh] w-[80%] overflow-y-auto rounded-lg bg-white p-4 shadow-xl sm:p-6 dark:bg-gray-800">
                        <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-red-600"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close"
                        >
                            <X size={20} />
                        </button>
                        <Dialog.Title className="mb-4 text-center text-lg font-bold text-gray-800 sm:text-left dark:text-white">
                            Register to Start Your Learning Journey Now
                        </Dialog.Title>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="h-64 w-full sm:h-80 md:h-full">
                                <img
                                    src="/build/assets/web-assets/leads.jpg"
                                    alt="Lead Visual"
                                    className="h-[600px] w-[600px] rounded-md object-cover"
                                />
                            </div>
                            <div className="w-full">
                                <form onSubmit={handleSubmit}>
                                    <div className="custominput grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="col-span-1 md:col-span-2">
                                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                                <Input
                                                    type="text"
                                                    placeholder="First Name"
                                                    value={data.first_name}
                                                    onChange={(e) => setData('first_name', e.target.value)}
                                                    required
                                                    className={`${style.custominput}`}
                                                />
                                                <Input
                                                    type="text"
                                                    placeholder="Middle Name"
                                                    value={data.middle_name}
                                                    onChange={(e) => setData('middle_name', e.target.value)}
                                                    className={`${style.custominput}`}
                                                />
                                                <Input
                                                    type="text"
                                                    placeholder="Last Name"
                                                    value={data.last_name}
                                                    onChange={(e) => setData('last_name', e.target.value)}
                                                    required
                                                    className={`${style.custominput}`}
                                                />
                                            </div>
                                            {formErrors.first_name && <p className="text-sm text-red-500">{formErrors.first_name}</p>}
                                            {formErrors.middle_name && <p className="text-sm text-red-500">{formErrors.middle_name}</p>}
                                            {formErrors.last_name && <p className="text-sm text-red-500">{formErrors.last_name}</p>}
                                        </div>
                                        <div>
                                            <Input
                                                type="email"
                                                placeholder="Email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                required
                                                className={`${style.custominput}`}
                                            />
                                            {formErrors.email && <p className="text-sm text-red-500">{formErrors.email}</p>}
                                        </div>
                                        <div>
                                            <Input
                                                className={`${style.custominput}`}
                                                type="date"
                                                value={data.dob}
                                                onChange={(e) => setData('dob', e.target.value)}
                                                required
                                            />
                                            {formErrors.dob && <p className="text-sm text-red-500">{formErrors.dob}</p>}
                                        </div>
                                        <div>
                                            <Input
                                                type="tel"
                                                placeholder="Mobile"
                                                maxLength={15}
                                                value={data.mobile}
                                                onChange={(e) => setData('mobile', e.target.value.replace(/\D/g, ''))}
                                                required
                                                className={`${style.custominput}`}
                                            />
                                            {formErrors.mobile && <p className="text-sm text-red-500">{formErrors.mobile}</p>}
                                        </div>
                                        <div>
                                            <select
                                                className={`${style.custominput} w-full rounded-md border p-2`}
                                                value={data.country}
                                                onChange={(e) => setData('country', e.target.value)}
                                            >
                                                <option value="">Select Country</option>
                                                {countries.map((country) => (
                                                    <option key={country} value={country}>
                                                        {country}
                                                    </option>
                                                ))}
                                            </select>
                                            {formErrors.country && <p className="text-sm text-red-500">{formErrors.country}</p>}
                                        </div>
                                        <div>
                                            <select
                                                className={`${style.custominput} w-full rounded-md border p-2`}
                                                value={data.state}
                                                onChange={(e) => setData('state', e.target.value)}
                                            >
                                                <option value="">Select State</option>
                                                {states.map((state) => (
                                                    <option key={state} value={state}>
                                                        {state}
                                                    </option>
                                                ))}
                                            </select>
                                            {formErrors.state && <p className="text-sm text-red-500">{formErrors.state}</p>}
                                        </div>
                                        <div>
                                            <select
                                                className={`${style.custominput} w-full rounded-md border p-2`}
                                                value={data.city}
                                                onChange={(e) => setData('city', e.target.value)}
                                            >
                                                <option value="">Select City</option>
                                                {cities.map((city) => (
                                                    <option key={city} value={city}>
                                                        {city}
                                                    </option>
                                                ))}
                                            </select>
                                            {formErrors.city && <p className="text-sm text-red-500">{formErrors.city}</p>}
                                        </div>
                                        <div>
                                            <select
                                                className={`${style.custominput} w-full rounded-md border p-2`}
                                                value={data.gender}
                                                onChange={(e) => setData('gender', e.target.value)}
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                                            {formErrors.gender && <p className="text-sm text-red-500">{formErrors.gender}</p>}
                                        </div>
                                        <div>
                                            <Input
                                                className={`${style.custominput}`}
                                                type="password"
                                                placeholder="Password"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                required
                                            />
                                            {formErrors.password && <p className="text-sm text-red-500">{formErrors.password}</p>}
                                        </div>
                                        <div>
                                            <Input
                                                className={`${style.custominput}`}
                                                type="password"
                                                placeholder="Confirm Password"
                                                value={data.re_password}
                                                onChange={(e) => setData('re_password', e.target.value)}
                                                required
                                            />
                                            {formErrors.re_password && <p className="text-sm text-red-500">{formErrors.re_password}</p>}
                                        </div>
                                        <div>
                                            <input
                                                className={`${style.custominput} w-full rounded-md border p-2`}
                                                type="file"
                                                name="photo"
                                                accept="image/*"
                                                onChange={(e) => setData('photo', e.target.files?.[0] ?? '')}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-1 mt-3 md:col-span-2">
                                        <Button
                                            type="submit"
                                            className="h-[50px] w-full rounded-4xl border-green-300 bg-green-50 text-green-800"
                                            disabled={processing}
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    );
}
