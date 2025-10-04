import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromFiles from './core/store/files/files.reducer';
import { FilesEffects } from './core/store/files/files.effects';
import { FilesFacade } from './core/store/files/files.facade';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(),
    provideEffects(FilesEffects),
    provideState(fromFiles.FILES_FEATURE_KEY, fromFiles.reducer),
    FilesFacade,
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient()
  ]
};
