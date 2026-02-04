import { Routes } from '@angular/router';

/**
 * 📚 LESSON: Angular Routing
 * 
 * CORE CONCEPTS:
 * 
 * 1. Routes Array - defines URL-to-component mapping
 * 2. RouterOutlet - placeholder where routed components render
 * 3. RouterLink - navigate without page reload
 * 4. Route Guards - protect routes (canActivate, canDeactivate, resolve)
 * 5. Lazy Loading - load modules on demand
 * 
 * ROUTE CONFIGURATION OPTIONS:
 * - path: URL segment
 * - component: Component to render (eager loading)
 * - loadComponent: Function returning component (lazy loading)
 * - loadChildren: Function returning routes (lazy loading module)
 * - canActivate: Guards to check before navigation
 * - canDeactivate: Guards to check before leaving
 * - resolve: Pre-fetch data before navigation
 * - data: Static data for route
 * - title: Page title (Angular 14+)
 */

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'study',
    pathMatch: 'full'  // IMPORTANT: 'full' means exact match
  },
  {
    /**
     * 📚 LESSON: Lazy Loading with loadComponent
     * 
     * Instead of importing the component at the top,
     * we use dynamic import() to load it only when needed.
     * 
     * Benefits:
     * - Smaller initial bundle size
     * - Faster initial load
     * - Better user experience
     * 
     * The component is loaded when the user navigates to this route.
     */
    path: 'study',
    loadComponent: () => 
      import('./features/study/study.component').then(m => m.StudyComponent),
    title: 'Study Mode | Angular Interview Prep',  // Browser tab title
    // data: { preload: true }  // Could be used with custom preload strategy
  },
  {
    /**
     * 📚 LESSON: Route with Parameters
     * 
     * :categoryId - dynamic parameter
     * Accessed via ActivatedRoute.params or paramMap
     */
    path: 'study/:categoryId',
    loadComponent: () => 
      import('./features/study/study.component').then(m => m.StudyComponent),
    title: 'Study Mode | Angular Interview Prep'
  },
  {
    /**
     * 📚 LESSON: Wildcard Route
     * 
     * ** matches any URL that wasn't matched above
     * MUST be last in the array!
     * Used for 404 pages
     */
    path: '**',
    redirectTo: 'study'
  }
];

/**
 * 📚 LESSON: Route Guards (Examples - not implemented here)
 * 
 * TYPES OF GUARDS:
 * 
 * 1. canActivate - Can user ACCESS this route?
 *    Use for: authentication, authorization
 * 
 * 2. canDeactivate - Can user LEAVE this route?
 *    Use for: unsaved changes warning
 * 
 * 3. canMatch - Can this route be matched at all?
 *    Use for: feature flags, A/B testing
 * 
 * 4. resolve - Pre-fetch data before route loads
 *    Use for: ensuring data is ready before component renders
 * 
 * EXAMPLE GUARD (functional style - Angular 14+):
 * 
 * export const authGuard: CanActivateFn = (route, state) => {
 *   const authService = inject(AuthService);
 *   const router = inject(Router);
 *   
 *   if (authService.isAuthenticated()) {
 *     return true;
 *   }
 *   
 *   return router.createUrlTree(['/login']);
 * };
 * 
 * Then use in route: canActivate: [authGuard]
 */
