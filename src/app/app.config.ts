import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withDebugTracing } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { HttpClientModule, provideHttpClient, withFetch } from "@angular/common/http";
import { AuthInterceptorProvider } from "./auth/auth.interceptor";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { graphqlProvider } from './graphql.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    importProvidersFrom(HttpClientModule),
    AuthInterceptorProvider,
    provideRouter(routes),
    // provideRouter(routes, withDebugTracing()),
    provideClientHydration(),
    provideStore(),
    provideEffects(),
    provideAnimationsAsync(),
    graphqlProvider]
};
