import { type ReactNode } from 'react';
import { Head } from '@inertiajs/react';
import Header from '@/web-component/panels/Header';
import Footer from '@/web-component/panels/Footer';


interface WebLayouts {
    children: ReactNode;
}

export default ({ children, ...props }: WebLayouts) => (
    <>
        <Head title="Your Page Title" />       
        <Header />
        <main>{children}</main>
        <Footer />
    </>
);
