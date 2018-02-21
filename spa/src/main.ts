import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
if (environment.production) {
    enableProdMode();
}

const bootstrap = () => {
    platformBrowserDynamic()
        .bootstrapModule(AppModule)
        .catch(console.error.bind(console));
};

if (sessionStorage.hasOwnProperty('hostInfoValue')) {
    Office.initialize = () => bootstrap();
} else {
    bootstrap();
}
