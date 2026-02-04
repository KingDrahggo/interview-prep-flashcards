import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';

/**
 * 📚 LESSON: Application Configuration (Standalone)
 * 
 * This replaced NgModule.providers for app-wide configuration.
 * 
 * PROVIDER FUNCTIONS:
 * - provideRouter() - Sets up routing
 * - provideHttpClient() - Sets up HttpClient with options
 * - provideAnimationsAsync() - Enables animations (lazy loaded)
 * - provideStore() - NgRx store (we'll add later)
 * 
 * This pattern is more tree-shakeable than NgModules.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Error listeners for better debugging
    provideBrowserGlobalErrorListeners(),
    
    /**
     * 📚 LESSON: Router Configuration
     * 
     * withViewTransitions() - Enable smooth page transitions (Chrome only for now)
     * withPreloading() - Preload lazy routes in background
     * withDebugTracing() - Log all router events (dev only)
     */
    provideRouter(
      routes,
      withViewTransitions()  // Smooth page transitions
    ),
    
    /**
     * 📚 LESSON: HttpClient Configuration
     * 
     * withInterceptors([...]) - Add request/response middleware
     * withFetch() - Use modern Fetch API instead of XMLHttpRequest
     * withXsrfConfiguration() - CSRF protection
     */
    provideHttpClient(
      withFetch(),  // Modern fetch API
      withInterceptors([])  // Add interceptors here
    ),
    
    /**
     * 📚 LESSON: Animations
     * 
     * provideAnimationsAsync() - Load animations lazily
     * provideAnimations() - Load animations eagerly
     * provideNoopAnimations() - Disable animations (testing)
     */
    provideAnimationsAsync()
  ]
};
