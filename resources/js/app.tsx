import '../css/app.css';
import '../css/custom.css';
import 'flowbite/dist/flowbite.min.js';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner'; // ✅ Import Sonner Toaster
import { initializeTheme } from './hooks/use-appearance';
import { Ziggy } from './ziggy';
import "@mobiscroll/react-lite/dist/css/mobiscroll.min.css";
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx')
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <>
                <App {...props} />
                <Toaster richColors position="top-right" /> {/* ✅ Inject Toaster globally */}
            </>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// ✅ Set light/dark theme
initializeTheme();
