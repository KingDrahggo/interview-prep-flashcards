import { 
  Component, 
  OnInit, 
  OnDestroy, 
  inject,
  signal,
  computed,
  effect
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  Subject, 
  BehaviorSubject, 
  Observable,
  interval,
  fromEvent,
  of,
  from,
  timer
} from 'rxjs';
import { 
  takeUntil, 
  map, 
  filter, 
  distinctUntilChanged,
  debounceTime,
  switchMap,
  tap,
  catchError,
  take,
  skip,
  first,
  last,
  startWith,
  scan,
  reduce
} from 'rxjs/operators';

import { FlashcardService } from '../../core/services/flashcard.service';
import { FlashcardComponent } from '../flashcard/flashcard.component';
import { 
  TimeAgoPipe, 
  TruncatePipe, 
  AccuracyPipe,
  CardProgressPipe 
} from '../../shared/pipes/flashcard.pipes';
import { Flashcard, CardStatus, Technology, TECHNOLOGIES } from '../../core/models/flashcard.model';

/**
 * 📚 LESSON: RxJS - Reactive Extensions for JavaScript
 * 
 * CORE CONCEPTS:
 * 
 * 1. OBSERVABLE - A stream of values over time
 *    - Can emit multiple values
 *    - Can complete or error
 *    - Lazy - doesn't run until subscribed
 * 
 * 2. OBSERVER - Consumes values from Observable
 *    - next() - handle emitted value
 *    - error() - handle errors
 *    - complete() - handle completion
 * 
 * 3. SUBSCRIPTION - The connection between Observable and Observer
 *    - Must be unsubscribed to prevent memory leaks!
 * 
 * 4. OPERATORS - Transform, filter, combine streams
 *    - Pipeable operators: .pipe(map(), filter())
 *    - Creation operators: of(), from(), interval()
 * 
 * 5. SUBJECTS - Both Observable AND Observer
 *    - Subject - no initial value
 *    - BehaviorSubject - has initial value, emits current value to new subscribers
 *    - ReplaySubject - replays X number of emissions to new subscribers
 *    - AsyncSubject - only emits last value upon completion
 */

/**
 * 📚 LESSON: Observables vs Promises
 * 
 * PROMISES:
 * - Single value
 * - Eager (runs immediately)
 * - Not cancellable
 * - Built into JavaScript
 * 
 * OBSERVABLES:
 * - Multiple values over time
 * - Lazy (runs on subscribe)
 * - Cancellable (unsubscribe)
 * - From RxJS library
 * - Powerful operators
 * 
 * USE PROMISES FOR: Simple one-time async operations
 * USE OBSERVABLES FOR: Streams, events, HTTP with cancellation, complex async
 */

@Component({
  selector: 'app-study',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FlashcardComponent,
    TimeAgoPipe,
    TruncatePipe,
    AccuracyPipe,
    CardProgressPipe
  ],
  templateUrl: './study.component.html',
  styleUrl: './study.component.scss'
})
export class StudyComponent implements OnInit, OnDestroy {
  
  /**
   * 📚 LESSON: inject() vs Constructor Injection
   * 
   * Both are valid, inject() is the newer approach
   * Benefits of inject():
   * - Cleaner, less boilerplate
   * - Can be used outside constructor
   * - Works with inheritance better
   */
  private readonly flashcardService = inject(FlashcardService);
  
  /**
   * 📚 LESSON: Subject for Cleanup Pattern
   * 
   * The "destroy$" pattern is THE standard way to handle
   * unsubscription in Angular.
   * 
   * Instead of tracking every subscription, you:
   * 1. Create a Subject
   * 2. Use takeUntil(this.destroy$) on all subscriptions
   * 3. Call destroy$.next() in ngOnDestroy
   * 
   * This automatically unsubscribes everything!
   */
  private readonly destroy$ = new Subject<void>();
  
  /**
   * 📚 LESSON: BehaviorSubject
   * 
   * BehaviorSubject is like Subject but:
   * - Requires an initial value
   * - New subscribers immediately get current value
   * - Great for state that always has a value
   */
  private readonly studyTime$ = new BehaviorSubject<number>(0);
  
  // Expose as Observable (read-only outside component)
  readonly elapsedTime$ = this.studyTime$.asObservable();
  
  // Signals for component state
  readonly isStudying = signal<boolean>(false);
  readonly selectedCategory = signal<string>('all');
  readonly showStats = signal<boolean>(false);
  
  // Get data from service (signals)
  readonly flashcards = this.flashcardService.flashcards;
  readonly currentCard = this.flashcardService.currentCard;
  readonly currentIndex = this.flashcardService.currentIndex;
  readonly stats = this.flashcardService.stats;
  readonly technologies = this.flashcardService.technologies;
  readonly selectedTechnology = this.flashcardService.selectedTechnology;
  
  // All available technologies for tabs (including 'all' option)
  readonly allTechnologies = TECHNOLOGIES;
  
  // Computed signals
  readonly filteredCards = computed(() => {
    const category = this.selectedCategory();
    const cards = this.flashcards();
    
    if (category === 'all') return cards;
    return cards.filter(c => c.category === category);
  });
  
  readonly categories = computed(() => {
    const cards = this.flashcards();
    const unique = [...new Set(cards.map(c => c.category))];
    return ['all', ...unique];
  });
  
  readonly displayCardNumber = computed(() => this.currentIndex() + 1);
  
  private timerSubscription: any;

  constructor() {
    /**
     * 📚 LESSON: effect() for Side Effects
     * 
     * effect() runs whenever signals it reads change
     * Use for: logging, analytics, syncing external state
     */
    effect(() => {
      const studying = this.isStudying();
      if (studying) {
        console.log('Study session started!');
      }
    });
  }

  ngOnInit(): void {
    this.demonstrateRxJSConcepts();
    this.setupKeyboardShortcuts();
  }

  ngOnDestroy(): void {
    /**
     * 📚 LESSON: Cleanup Pattern
     * 
     * ALWAYS clean up in ngOnDestroy:
     * - Unsubscribe from Observables
     * - Clear intervals/timeouts
     * - Remove event listeners
     * 
     * Memory leaks are a common Angular pitfall!
     */
    this.destroy$.next();
    this.destroy$.complete();
    
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  /**
   * 📚 LESSON: RxJS Operators Demonstration
   * 
   * This method demonstrates common RxJS operators
   * you WILL be asked about in interviews
   */
  private demonstrateRxJSConcepts(): void {
    
    // ===== CREATION OPERATORS =====
    
    /**
     * of() - Emit values synchronously, then complete
     */
    const ofExample$ = of(1, 2, 3, 4, 5);
    // Emits: 1, 2, 3, 4, 5, complete
    
    /**
     * from() - Convert array/iterable/Promise to Observable
     */
    const fromArray$ = from([1, 2, 3]);
    const fromPromise$ = from(Promise.resolve('data'));
    
    /**
     * interval() - Emit incrementing numbers at interval
     */
    const interval$ = interval(1000); // 0, 1, 2, 3... every second
    
    /**
     * timer() - Emit after delay, optionally repeat
     */
    const timer$ = timer(2000); // Single emission after 2s
    const timerInterval$ = timer(2000, 1000); // First at 2s, then every 1s
    
    
    // ===== TRANSFORMATION OPERATORS =====
    
    /**
     * map() - Transform each emitted value
     * Like Array.map() but for streams
     */
    of(1, 2, 3).pipe(
      map(x => x * 10)
    ).subscribe(console.log); // 10, 20, 30
    
    /**
     * scan() - Accumulate values (like reduce, but emits each step)
     */
    of(1, 2, 3, 4).pipe(
      scan((acc, val) => acc + val, 0)
    ).subscribe(console.log); // 1, 3, 6, 10
    
    
    // ===== FILTERING OPERATORS =====
    
    /**
     * filter() - Only emit values that pass condition
     */
    of(1, 2, 3, 4, 5).pipe(
      filter(x => x % 2 === 0)
    ).subscribe(console.log); // 2, 4
    
    /**
     * take() - Take first N values then complete
     */
    interval(100).pipe(
      take(5)
    ).subscribe(console.log); // 0, 1, 2, 3, 4, complete
    
    /**
     * first() - Take only first value then complete
     */
    of(1, 2, 3).pipe(
      first()
    ).subscribe(console.log); // 1
    
    /**
     * distinctUntilChanged() - Only emit if different from previous
     */
    of(1, 1, 2, 2, 3, 1).pipe(
      distinctUntilChanged()
    ).subscribe(console.log); // 1, 2, 3, 1
    
    /**
     * debounceTime() - Wait for pause in emissions
     * COMMON USE: Search input (wait for user to stop typing)
     */
    // searchInput$.pipe(debounceTime(300)).subscribe(...)
    
    
    // ===== FLATTENING OPERATORS (KEY INTERVIEW TOPIC!) =====
    
    /**
     * switchMap() - Map to Observable, CANCEL previous
     * USE FOR: HTTP requests where you only care about latest
     * Example: Search autocomplete, route changes
     */
    // searchTerm$.pipe(
    //   switchMap(term => this.http.get(`/api/search?q=${term}`))
    // )
    
    /**
     * mergeMap (flatMap) - Map to Observable, run in PARALLEL
     * USE FOR: Independent requests, fire-and-forget
     * Example: Uploading multiple files
     */
    // files$.pipe(
    //   mergeMap(file => this.uploadFile(file))
    // )
    
    /**
     * concatMap() - Map to Observable, run in SEQUENCE
     * USE FOR: Order matters, queue operations
     * Example: Sequential API calls
     */
    // actions$.pipe(
    //   concatMap(action => this.processAction(action))
    // )
    
    /**
     * exhaustMap() - Map to Observable, IGNORE new until current completes
     * USE FOR: Prevent duplicate submissions
     * Example: Form submit button
     */
    // submitClick$.pipe(
    //   exhaustMap(() => this.submitForm())
     // )
    
    
    // ===== ERROR HANDLING =====
    
    /**
     * catchError() - Handle errors gracefully
     */
    of(1, 2, 3).pipe(
      map(x => {
        if (x === 2) throw new Error('Two is bad!');
        return x;
      }),
      catchError(err => {
        console.error('Caught:', err.message);
        return of(0); // Return fallback Observable
      })
    ).subscribe(console.log); // 1, 0
    
    
    // ===== UTILITY =====
    
    /**
     * tap() - Side effects without affecting stream
     * USE FOR: Logging, debugging
     */
    of(1, 2, 3).pipe(
      tap(x => console.log('Before map:', x)),
      map(x => x * 2),
      tap(x => console.log('After map:', x))
    ).subscribe();
    
    /**
     * startWith() - Emit initial value before source
     */
    interval(1000).pipe(
      startWith(-1), // Immediately emit -1
      take(4)
    ).subscribe(console.log); // -1, 0, 1, 2
  }

  private setupKeyboardShortcuts(): void {
    /**
     * 📚 LESSON: fromEvent() - Create Observable from DOM events
     * 
     * Combined with takeUntil for automatic cleanup
     */
    fromEvent<KeyboardEvent>(document, 'keydown').pipe(
      takeUntil(this.destroy$),  // Auto-unsubscribe on destroy
      filter(() => this.isStudying()),
      map(event => event.key)
    ).subscribe(key => {
      if (key === 'Escape') {
        this.endStudySession();
      }
    });
  }

  // ========== Component Methods ==========

  startStudySession(): void {
    this.isStudying.set(true);
    this.flashcardService.resetStudySession();
    this.studyTime$.next(0);
    
    // Start timer using interval
    this.timerSubscription = interval(1000).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.studyTime$.next(this.studyTime$.value + 1);
    });
  }

  endStudySession(): void {
    this.isStudying.set(false);
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.showStats.set(true);
  }

  onCardAnswered(event: { cardId: string; isCorrect: boolean }): void {
    this.flashcardService.markAnswer(event.cardId, event.isCorrect);
  }

  onCardNavigate(direction: 'next' | 'previous'): void {
    if (direction === 'next') {
      // Check if we're at the last card
      if (this.currentIndex() >= this.flashcards().length - 1) {
        this.endStudySession();
        return;
      }
      this.flashcardService.nextCard();
    } else {
      this.flashcardService.previousCard();
    }
  }

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  selectTechnology(tech: Technology | 'all'): void {
    this.flashcardService.setTechnology(tech);
    this.selectedCategory.set('all');  // Reset category filter
  }

  getCardStatus(cardId: string): CardStatus {
    return this.flashcardService.cardStatuses().get(cardId) ?? 'unanswered';
  }

  resetAndStudyAgain(): void {
    this.showStats.set(false);
    this.startStudySession();
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}
