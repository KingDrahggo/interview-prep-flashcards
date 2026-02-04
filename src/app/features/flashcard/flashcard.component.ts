import { 
  Component, 
  input,           // Signal-based input (new way)
  output,          // Signal-based output (new way)
  signal,
  computed,
  effect,
  OnInit, 
  OnDestroy, 
  OnChanges,
  AfterViewInit,
  SimpleChanges,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Flashcard, CardStatus } from '../../core/models/flashcard.model';

/**
 * 📚 LESSON: Component Architecture & Lifecycle Hooks
 * 
 * This component demonstrates:
 * 1. Lifecycle Hooks - ngOnInit, ngOnChanges, ngAfterViewInit, ngOnDestroy
 * 2. Input/Output - Both decorator and signal-based approaches
 * 3. ViewChild - Accessing DOM elements and child components
 * 4. Change Detection Strategy - OnPush for performance
 * 5. Signals for local component state
 */

@Component({
  selector: 'app-flashcard',
  standalone: true,  // Explicit for learning (default in Angular 19+)
  imports: [CommonModule],
  templateUrl: './flashcard.component.html',
  styleUrl: './flashcard.component.scss',
  
  /**
   * 📚 LESSON: Change Detection Strategies
   * 
   * Default: Check component whenever ANY event happens in app
   * OnPush: Only check when:
   *   1. Input REFERENCE changes (not mutation!)
   *   2. Event originates from this component or children
   *   3. Async pipe receives new value
   *   4. Signal changes
   *   5. Manually call markForCheck()
   * 
   * SENIOR TIP: Always use OnPush for performance
   * It forces you to use immutable patterns
   */
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlashcardComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  
  /**
   * 📚 LESSON: Signal-based Inputs (Angular 17+)
   * 
   * input() - Creates a signal-based input
   * input.required<T>() - Required input, TypeScript will enforce it
   * 
   * Benefits over @Input():
   * - Returns a Signal (reactive!)
   * - Better type inference
   * - Built-in transform support
   * - Works seamlessly with OnPush
   */
  
  // Required input - component won't work without it
  readonly card = input.required<Flashcard>();
  
  // Optional input with default value
  readonly cardNumber = input<number>(1);
  readonly totalCards = input<number>(1);
  
  // Input with status
  readonly status = input<CardStatus>('unanswered');
  
  /**
   * 📚 LESSON: Signal-based Outputs (Angular 17+)
   * 
   * output() - Creates a typed output emitter
   * 
   * Benefits over @Output():
   * - No need for EventEmitter
   * - Better type inference
   * - Cleaner syntax
   */
  
  // Emit when user marks answer as correct/incorrect
  readonly answered = output<{ cardId: string; isCorrect: boolean }>();
  
  // Emit when user wants next/previous card
  readonly navigate = output<'next' | 'previous'>();
  
  /**
   * 📚 LESSON: ViewChild - Accessing DOM Elements
   * 
   * @ViewChild('refName') - Query template reference
   * @ViewChild(ComponentType) - Query child component
   * 
   * Available in ngAfterViewInit (not before!)
   * 
   * Signal variant: viewChild() (Angular 17+)
   */
  
  @ViewChild('cardElement') cardElementRef!: ElementRef<HTMLDivElement>;
  @ViewChild('questionSide') questionSideRef!: ElementRef<HTMLDivElement>;
  
  /**
   * 📚 LESSON: inject() Function
   * 
   * Alternative to constructor injection
   * Can be used at property level
   * Cleaner for multiple dependencies
   */
  private readonly elementRef = inject(ElementRef);
  
  // Local component state using signals
  readonly isFlipped = signal<boolean>(false);
  readonly isAnimating = signal<boolean>(false);
  
  // Computed signal - derived from other signals
  readonly progressPercentage = computed(() => {
    return Math.round((this.cardNumber() / this.totalCards()) * 100);
  });
  
  readonly statusClass = computed(() => {
    const s = this.status();
    return {
      'unanswered': s === 'unanswered',
      'correct': s === 'correct',
      'incorrect': s === 'incorrect'
    };
  });

  /**
   * 📚 LESSON: effect() - Side Effects for Signals
   * 
   * effect() runs whenever any signal it reads changes
   * Use for: logging, analytics, syncing with external systems
   * 
   * IMPORTANT: effect() runs in injection context
   * Must be called in constructor or with { injector }
   */
  constructor() {
    // Log whenever card changes (for debugging)
    effect(() => {
      console.log('Current card:', this.card()?.question);
      console.log('Card status:', this.status());
    });
  }

  /**
   * 📚 LESSON: Lifecycle Hooks
   * 
   * These run in a specific order. Understanding when each runs
   * is critical for senior Angular developers.
   */
  
  /**
   * ngOnChanges - Runs BEFORE ngOnInit and whenever an input changes
   * 
   * WHEN TO USE:
   * - React to input changes
   * - Compare previous and current values
   * 
   * NOTE: With signal inputs, you often don't need this!
   * Computed signals react automatically.
   */
  ngOnChanges(changes: SimpleChanges): void {
    console.log('🔄 ngOnChanges called', changes);
    
    // Example: Reset flip state when card changes
    if (changes['card'] && !changes['card'].firstChange) {
      this.isFlipped.set(false);
    }
  }
  
  /**
   * ngOnInit - Runs ONCE after first ngOnChanges
   * 
   * WHEN TO USE:
   * - Initialize component logic
   * - Fetch initial data
   * - Set up subscriptions
   * 
   * DON'T: Access ViewChild here (not ready yet!)
   */
  ngOnInit(): void {
    console.log('🚀 ngOnInit called');
    console.log('Card is:', this.card());
    
    // Good place for one-time setup
    // Inputs are already available here
  }
  
  /**
   * ngAfterViewInit - Runs ONCE after view is initialized
   * 
   * WHEN TO USE:
   * - Access ViewChild elements
   * - Initialize third-party libraries that need DOM
   * - Set up DOM-dependent logic
   * 
   * IMPORTANT: Avoid changing data here (causes ExpressionChangedAfterItHasBeenCheckedError)
   */
  ngAfterViewInit(): void {
    console.log('👁️ ngAfterViewInit called');
    console.log('Card element:', this.cardElementRef?.nativeElement);
    
    // Now we can access the DOM element
    if (this.cardElementRef) {
      // Example: Focus the card for keyboard navigation
      this.cardElementRef.nativeElement.focus();
    }
  }
  
  /**
   * ngOnDestroy - Runs when component is destroyed
   * 
   * WHEN TO USE:
   * - Unsubscribe from Observables
   * - Clear timers/intervals
   * - Clean up event listeners
   * - Cancel pending HTTP requests
   * 
   * MEMORY LEAKS happen when you forget this!
   */
  ngOnDestroy(): void {
    console.log('💀 ngOnDestroy called');
    
    // Clean up any subscriptions, timers, etc.
    // With signals, less cleanup is needed!
  }

  // ========== Component Methods ==========
  
  flipCard(): void {
    if (this.isAnimating()) return;
    
    this.isAnimating.set(true);
    this.isFlipped.update(flipped => !flipped);
    
    // Reset animating state after animation completes
    setTimeout(() => {
      this.isAnimating.set(false);
    }, 600); // Match CSS animation duration
  }
  
  markCorrect(): void {
    this.answered.emit({ 
      cardId: this.card().id, 
      isCorrect: true 
    });
  }
  
  markIncorrect(): void {
    this.answered.emit({ 
      cardId: this.card().id, 
      isCorrect: false 
    });
  }
  
  goToNext(): void {
    this.navigate.emit('next');
  }
  
  goToPrevious(): void {
    this.navigate.emit('previous');
  }
  
  /**
   * 📚 LESSON: Keyboard Events
   * 
   * Handle keyboard navigation for accessibility
   */
  handleKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case ' ':
      case 'Enter':
        event.preventDefault();
        this.flipCard();
        break;
      case 'ArrowRight':
        this.goToNext();
        break;
      case 'ArrowLeft':
        this.goToPrevious();
        break;
      case '1':
        if (this.isFlipped()) this.markCorrect();
        break;
      case '2':
        if (this.isFlipped()) this.markIncorrect();
        break;
    }
  }
}
