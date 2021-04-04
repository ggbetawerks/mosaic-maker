import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ObservableStore } from '@codewithdan/observable-store';
import { ReduxDevToolsExtension } from '@codewithdan/observable-store-extensions';

if (environment.production) {
  enableProdMode();
} else {
  ObservableStore.globalSettings = {
    trackStateHistory: true,
  };
  ObservableStore.addExtension(
    new ReduxDevToolsExtension({ router: Router, ngZone: NgZone })
  );
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.log(err));
