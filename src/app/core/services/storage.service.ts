import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * 📚 LESSON: Browser Storage in Angular
 * 
 * STORAGE OPTIONS:
 * 
 * 1. localStorage - Persists forever, 5-10MB limit
 *    Use for: User preferences, theme, auth token
 * 
 * 2. sessionStorage - Cleared when tab closes
 *    Use for: Temporary session data
 * 
 * 3. IndexedDB - Large data, structured storage
 *    Use for: Offline data, large datasets
 * 
 * 4. Cookies - Sent with HTTP requests
 *    Use for: Server-side authentication
 * 
 * IMPORTANT FOR SSR:
 * - localStorage/sessionStorage don't exist on server
 * - Must check isPlatformBrowser() before accessing
 * - Use PLATFORM_ID injection token
 */

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  /**
   * 📚 LESSON: Platform Detection for SSR
   * 
   * When using Angular Universal (SSR), window/document
   * don't exist on the server. We must check the platform.
   */
  private readonly platformId = inject(PLATFORM_ID);
  
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  
  // Reactive theme signal
  readonly isDarkMode = signal<boolean>(true);
  
  constructor() {
    // Initialize from storage on browser
    if (this.isBrowser) {
      const stored = this.get<boolean>('darkMode');
      if (stored !== null) {
        this.isDarkMode.set(stored);
      }
      
      /**
       * 📚 LESSON: effect() for Syncing
       * 
       * effect() runs whenever signals it reads change.
       * Perfect for syncing signals with localStorage.
       */
      effect(() => {
        this.set('darkMode', this.isDarkMode());
      });
    }
  }

  /**
   * 📚 LESSON: Generic Type Methods
   * 
   * Using TypeScript generics for type-safe storage.
   * Caller specifies the expected return type.
   */
  get<T>(key: string): T | null {
    if (!this.isBrowser) return null;
    
    try {
      const item = localStorage.getItem(key);
      if (item === null) return null;
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error reading from localStorage [${key}]:`, error);
      return null;
    }
  }

  set<T>(key: string, value: T): void {
    if (!this.isBrowser) return;
    
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage [${key}]:`, error);
    }
  }

  remove(key: string): void {
    if (!this.isBrowser) return;
    localStorage.removeItem(key);
  }

  clear(): void {
    if (!this.isBrowser) return;
    localStorage.clear();
  }

  /**
   * 📚 LESSON: Storage with Expiration
   * 
   * localStorage doesn't have built-in expiration.
   * We can build it ourselves.
   */
  setWithExpiry<T>(key: string, value: T, ttlMs: number): void {
    if (!this.isBrowser) return;
    
    const item = {
      value: value,
      expiry: Date.now() + ttlMs
    };
    
    localStorage.setItem(key, JSON.stringify(item));
  }

  getWithExpiry<T>(key: string): T | null {
    if (!this.isBrowser) return null;
    
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;
    
    try {
      const item = JSON.parse(itemStr);
      
      // Check if expired
      if (Date.now() > item.expiry) {
        localStorage.removeItem(key);
        return null;
      }
      
      return item.value as T;
    } catch {
      return null;
    }
  }

  // ========== Session Storage ==========
  
  getSession<T>(key: string): T | null {
    if (!this.isBrowser) return null;
    
    try {
      const item = sessionStorage.getItem(key);
      if (item === null) return null;
      return JSON.parse(item) as T;
    } catch {
      return null;
    }
  }

  setSession<T>(key: string, value: T): void {
    if (!this.isBrowser) return;
    
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to sessionStorage [${key}]:`, error);
    }
  }

  // ========== Specialized Methods ==========
  
  /**
   * Save study progress
   */
  saveProgress(cardId: string, isCorrect: boolean): void {
    const progress = this.get<Record<string, boolean>>('studyProgress') || {};
    progress[cardId] = isCorrect;
    this.set('studyProgress', progress);
  }

  getProgress(): Record<string, boolean> {
    return this.get<Record<string, boolean>>('studyProgress') || {};
  }

  /**
   * Save last study session stats
   */
  saveSessionStats(stats: {
    date: string;
    cardsStudied: number;
    accuracy: number;
    timeSpent: number;
  }): void {
    const history = this.get<typeof stats[]>('sessionHistory') || [];
    history.push(stats);
    
    // Keep only last 10 sessions
    if (history.length > 10) {
      history.shift();
    }
    
    this.set('sessionHistory', history);
  }

  getSessionHistory(): Array<{
    date: string;
    cardsStudied: number;
    accuracy: number;
    timeSpent: number;
  }> {
    return this.get('sessionHistory') || [];
  }

  toggleDarkMode(): void {
    this.isDarkMode.update(dark => !dark);
  }
}
