import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {enableProdMode();}
import 'zone.js'; //Added for lazy module error in firefox,safari in server.
import 'hammerjs';
import { registerLicense } from '@syncfusion/ej2-base';
registerLicense('ORg4AjUWIQA/Gnt2U1hhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5Ud0xiWX9ddH1VQGJd');
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(() => {
    // Register the service worker only in production mode.  This ensures that
    // development builds don’t cache assets and cause confusion during
    // development.
    if (environment.production && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('ngsw-worker.js');
    }
  })
  .catch(err => console.error(err));
  
 