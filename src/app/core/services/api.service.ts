import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of, BehaviorSubject } from 'rxjs';
import { 
  catchError, 
  retry, 
  map, 
  tap, 
  finalize, 
  timeout,
  shareReplay,
  switchMap,
  delay
} from 'rxjs/operators';
import { Flashcard } from '../models/flashcard.model';

/**
 * 📚 LESSON: HTTP Client in Angular
 * 
 * HttpClient is Angular's way to make HTTP requests.
 * It returns Observables (not Promises).
 * 
 * KEY CONCEPTS:
 * 1. Must provide HttpClient via provideHttpClient()
 * 2. Returns Observable<T> - must subscribe or use async pipe
 * 3. Supports interceptors for middleware functionality
 * 4. Generic typing for response bodies
 * 
 * PROVIDING HTTPCLIENT (in app.config.ts):
 * providers: [
 *   provideHttpClient(withInterceptors([...]))
 * ]
 */

// Response interfaces - always type your API responses!
interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private readonly http = inject(HttpClient);
  
  // Base URL for API
  private readonly apiUrl = 'https://api.example.com';
  
  // Loading state as signal
  readonly isLoading = signal<boolean>(false);
  
  // Error state
  readonly error = signal<string | null>(null);
  
  /**
   * 📚 LESSON: Caching with BehaviorSubject
   * 
   * Use BehaviorSubject to cache data that:
   * - Multiple components need
   * - Doesn't change frequently
   */
  private cardCache$ = new BehaviorSubject<Flashcard[] | null>(null);

  /**
   * 📚 LESSON: GET Request
   * 
   * http.get<T>(url, options) returns Observable<T>
   * 
   * Options include:
   * - headers: HttpHeaders
   * - params: HttpParams
   * - observe: 'body' | 'response' | 'events'
   * - responseType: 'json' | 'text' | 'blob' | 'arraybuffer'
   */
  getCards(): Observable<Flashcard[]> {
    this.isLoading.set(true);
    this.error.set(null);
    
    return this.http.get<ApiResponse<Flashcard[]>>(`${this.apiUrl}/cards`).pipe(
      /**
       * 📚 LESSON: RxJS Operators for HTTP
       */
      
      // tap() - Side effects (logging, state updates)
      tap(response => console.log('API Response:', response)),
      
      // map() - Transform the response
      map(response => response.data),
      
      // retry() - Retry failed requests
      retry({ count: 3, delay: 1000 }),
      
      // timeout() - Fail if takes too long
      timeout(10000),
      
      // catchError() - Handle errors
      catchError(this.handleError.bind(this)),
      
      // finalize() - Cleanup (runs on complete OR error)
      finalize(() => this.isLoading.set(false))
    );
  }

  /**
   * 📚 LESSON: GET with Parameters
   * 
   * HttpParams for query strings:
   * /api/cards?page=1&limit=10&category=angular
   */
  getCardsWithParams(
    page: number = 1, 
    limit: number = 10, 
    category?: string
  ): Observable<PaginatedResponse<Flashcard>> {
    
    // Build params immutably (HttpParams is immutable)
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    
    if (category) {
      params = params.set('category', category);
    }
    
    return this.http.get<PaginatedResponse<Flashcard>>(
      `${this.apiUrl}/cards`,
      { params }
    );
  }

  /**
   * 📚 LESSON: GET with Headers
   * 
   * HttpHeaders for custom headers (auth, content-type, etc.)
   */
  getCardsWithAuth(token: string): Observable<Flashcard[]> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
    
    return this.http.get<ApiResponse<Flashcard[]>>(
      `${this.apiUrl}/cards`,
      { headers }
    ).pipe(
      map(response => response.data)
    );
  }

  /**
   * 📚 LESSON: POST Request
   * 
   * http.post<T>(url, body, options)
   * Body is automatically serialized to JSON
   */
  createCard(card: Omit<Flashcard, 'id'>): Observable<Flashcard> {
    this.isLoading.set(true);
    
    return this.http.post<ApiResponse<Flashcard>>(
      `${this.apiUrl}/cards`,
      card,  // Body is sent as JSON automatically
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    ).pipe(
      map(response => response.data),
      tap(newCard => {
        // Update cache with new card
        const currentCache = this.cardCache$.value;
        if (currentCache) {
          this.cardCache$.next([...currentCache, newCard]);
        }
      }),
      catchError(this.handleError.bind(this)),
      finalize(() => this.isLoading.set(false))
    );
  }

  /**
   * 📚 LESSON: PUT Request (Full Update)
   * 
   * PUT replaces the entire resource
   */
  updateCard(id: string, card: Flashcard): Observable<Flashcard> {
    return this.http.put<ApiResponse<Flashcard>>(
      `${this.apiUrl}/cards/${id}`,
      card
    ).pipe(
      map(response => response.data),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * 📚 LESSON: PATCH Request (Partial Update)
   * 
   * PATCH updates only specified fields
   */
  patchCard(id: string, updates: Partial<Flashcard>): Observable<Flashcard> {
    return this.http.patch<ApiResponse<Flashcard>>(
      `${this.apiUrl}/cards/${id}`,
      updates
    ).pipe(
      map(response => response.data),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * 📚 LESSON: DELETE Request
   */
  deleteCard(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cards/${id}`).pipe(
      tap(() => {
        // Update cache - remove deleted card
        const currentCache = this.cardCache$.value;
        if (currentCache) {
          this.cardCache$.next(currentCache.filter(c => c.id !== id));
        }
      }),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * 📚 LESSON: Caching with shareReplay
   * 
   * shareReplay(1) caches the last emission.
   * All subscribers get the cached value.
   * Useful for data that doesn't change often.
   */
  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/categories`).pipe(
      shareReplay(1)  // Cache the result
    );
  }

  /**
   * 📚 LESSON: Error Handling
   * 
   * Centralized error handling for all HTTP requests.
   * Return user-friendly messages, log technical details.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let userMessage = 'An error occurred. Please try again.';
    
    if (error.status === 0) {
      // Network error
      userMessage = 'Unable to connect to server. Check your internet connection.';
      console.error('Network error:', error.error);
    } else if (error.status === 401) {
      // Unauthorized
      userMessage = 'Please log in to continue.';
    } else if (error.status === 403) {
      // Forbidden
      userMessage = 'You do not have permission to perform this action.';
    } else if (error.status === 404) {
      // Not found
      userMessage = 'The requested resource was not found.';
    } else if (error.status >= 500) {
      // Server error
      userMessage = 'Server error. Please try again later.';
      console.error('Server error:', error.error);
    } else {
      // Other HTTP error
      console.error(`HTTP Error ${error.status}:`, error.error);
    }
    
    this.error.set(userMessage);
    
    // Return an observable that errors (doesn't emit)
    return throwError(() => new Error(userMessage));
  }

  /**
   * 📚 LESSON: Mock API for Development
   * 
   * When backend isn't ready, return mock data.
   * delay() simulates network latency.
   */
  getMockCards(): Observable<Flashcard[]> {
    const mockCards: Flashcard[] = [
      {
        id: '1',
        question: 'What is Angular?',
        answer: 'A TypeScript-based web framework by Google',
        technology: 'angular',
        category: 'Basics',
        difficulty: 'easy',
        timesCorrect: 0,
        timesIncorrect: 0
      }
    ];
    
    return of(mockCards).pipe(
      delay(500),  // Simulate network delay
      tap(() => console.log('Mock data returned'))
    );
  }

  /**
   * 📚 LESSON: Sequential Requests
   * 
   * When second request depends on first result.
   * Use switchMap to chain.
   */
  getCardWithDetails(id: string): Observable<Flashcard & { comments: string[] }> {
    return this.http.get<Flashcard>(`${this.apiUrl}/cards/${id}`).pipe(
      switchMap(card => 
        this.http.get<string[]>(`${this.apiUrl}/cards/${id}/comments`).pipe(
          map(comments => ({ ...card, comments }))
        )
      )
    );
  }
}


/**
 * 📚 LESSON: HTTP Interceptors (Example - not active)
 * 
 * Interceptors are middleware for HTTP requests.
 * 
 * Common uses:
 * 1. Add auth token to all requests
 * 2. Log all requests/responses
 * 3. Handle errors globally
 * 4. Show loading spinner
 * 5. Cache responses
 * 
 * IMPORTANT: In Angular 17+, use functional interceptors
 * provided via withInterceptors()
 */

import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';

/**
 * Auth interceptor - adds token to requests
 */
export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  
  // Get token from storage (in real app, inject a service)
  const token = localStorage.getItem('authToken');
  
  if (token) {
    // Clone request and add header
    // (requests are immutable)
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(authReq);
  }
  
  return next(req);
};

/**
 * Logging interceptor - logs all requests
 */
export const loggingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  
  const started = Date.now();
  
  return next(req).pipe(
    tap({
      next: (event) => {
        // Log response
        console.log(`${req.method} ${req.url} - ${Date.now() - started}ms`);
      },
      error: (error) => {
        console.error(`${req.method} ${req.url} FAILED - ${Date.now() - started}ms`, error);
      }
    })
  );
};

/**
 * 📚 LESSON: Using Interceptors (in app.config.ts)
 * 
 * import { provideHttpClient, withInterceptors } from '@angular/common/http';
 * 
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideHttpClient(
 *       withInterceptors([authInterceptor, loggingInterceptor])
 *     )
 *   ]
 * };
 */
