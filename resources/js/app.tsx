import '../css/app.css';
import './bootstrap';

import { Ziggy } from '@/ziggy';
import { createInertiaApp } from '@inertiajs/react';
import { Providers } from 'components/providers';
import 'driver.js/dist/driver.css';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { useRoute } from 'ziggy-js';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  title: (title) => (title ? title + ' / ' + appName : appName),
  resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
  setup({ el, App, props }) {
    // @ts-expect-error
    window.route = useRoute(Ziggy as any);
    const appElement = (
      <StrictMode>
        <Providers>
          <App {...props} />
        </Providers>
      </StrictMode>
    );
    if (import.meta.env.SSR) {
      hydrateRoot(el, appElement);
      return;
    }

    createRoot(el).render(appElement);
  },
  progress: {
    color: '#009966',
    showSpinner: true
  }
});
