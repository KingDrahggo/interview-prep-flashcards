/**
 * 📚 LESSON: NgRx - State Management
 * 
 * NgRx is Angular's implementation of the Redux pattern.
 * It provides a single source of truth for application state.
 * 
 * CORE CONCEPTS:
 * 
 * 1. STORE - Immutable state container
 *    - Single source of truth
 *    - State is read-only
 *    - Changes happen through actions
 * 
 * 2. ACTIONS - Events that describe what happened
 *    - Plain objects with a type property
 *    - Optionally carry payload (data)
 *    - Dispatched to trigger state changes
 * 
 * 3. REDUCERS - Pure functions that produce new state
 *    - Take current state + action
 *    - Return NEW state (immutable!)
 *    - No side effects
 * 
 * 4. SELECTORS - Functions to read state
 *    - Extract slices of state
 *    - Memoized for performance
 *    - Composable
 * 
 * 5. EFFECTS - Handle side effects
 *    - API calls, storage, etc.
 *    - Listen for actions, perform async work
 *    - Dispatch new actions when done
 * 
 * WHEN TO USE NgRx:
 * ✅ Complex state shared across many components
 * ✅ Undo/redo functionality needed
 * ✅ State that needs to persist
 * ✅ Team wants strict patterns
 * ✅ Need time-travel debugging
 * 
 * WHEN NOT TO USE:
 * ❌ Simple apps with local component state
 * ❌ Small team that doesn't need strict patterns
 * ❌ When signals + services are enough
 * 
 * ═══════════════════════════════════════════════════════
 *  INSTALLATION (run these commands):
 *  
 *  npm install @ngrx/store @ngrx/effects @ngrx/store-devtools @ngrx/entity
 * ═══════════════════════════════════════════════════════
 */

// This file demonstrates NgRx patterns.
// All code below requires @ngrx packages to be installed.

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   📁 Recommended File Structure:
   
   src/app/store/
   ├── flashcard/
   │   ├── flashcard.actions.ts    // Action definitions
   │   ├── flashcard.reducer.ts    // State & reducer
   │   ├── flashcard.selectors.ts  // State selectors
   │   ├── flashcard.effects.ts    // Side effects
   │   └── flashcard.model.ts      // State interface
   ├── app.state.ts                // Root state interface
   └── index.ts                    // Export everything
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

import { Flashcard, StudyStats, CardStatus } from '../core/models/flashcard.model';

// ═══════════════════════════════════════════════════════
// 1️⃣ STATE INTERFACE
// ═══════════════════════════════════════════════════════

/**
 * 📚 Define the shape of your feature state
 */
export interface FlashcardState {
  flashcards: Flashcard[];
  selectedCardId: string | null;
  currentIndex: number;
  cardStatuses: Record<string, CardStatus>;
  isLoading: boolean;
  error: string | null;
}

/**
 * 📚 Initial state - the starting values
 */
export const initialFlashcardState: FlashcardState = {
  flashcards: [],
  selectedCardId: null,
  currentIndex: 0,
  cardStatuses: {},
  isLoading: false,
  error: null
};

/**
 * 📚 Root app state - combines all feature states
 */
export interface AppState {
  flashcards: FlashcardState;
  // Add more feature states here:
  // auth: AuthState;
  // ui: UiState;
}


// ═══════════════════════════════════════════════════════
// 2️⃣ ACTIONS
// ═══════════════════════════════════════════════════════

/**
 * 📚 LESSON: createAction() & props()
 * 
 * Actions are events that describe something that happened.
 * 
 * Naming convention: [Source] Event Name
 * - [Flashcard Page] Load Cards - user triggered
 * - [Flashcard API] Load Cards Success - API response
 * - [Flashcard API] Load Cards Failure - API error
 */

// UNCOMMENT WHEN @ngrx/store IS INSTALLED:
/*
import { createAction, props } from '@ngrx/store';

// Load cards
export const loadCards = createAction(
  '[Flashcard Page] Load Cards'
);

export const loadCardsSuccess = createAction(
  '[Flashcard API] Load Cards Success',
  props<{ cards: Flashcard[] }>()  // Typed payload
);

export const loadCardsFailure = createAction(
  '[Flashcard API] Load Cards Failure',
  props<{ error: string }>()
);

// Add card
export const addCard = createAction(
  '[Flashcard Page] Add Card',
  props<{ card: Omit<Flashcard, 'id' | 'timesCorrect' | 'timesIncorrect'> }>()
);

export const addCardSuccess = createAction(
  '[Flashcard API] Add Card Success',
  props<{ card: Flashcard }>()
);

// Remove card
export const removeCard = createAction(
  '[Flashcard Page] Remove Card',
  props<{ id: string }>()
);

// Mark answer
export const markAnswer = createAction(
  '[Study Page] Mark Answer',
  props<{ cardId: string; isCorrect: boolean }>()
);

// Navigation
export const nextCard = createAction('[Study Page] Next Card');
export const previousCard = createAction('[Study Page] Previous Card');
export const setCurrentIndex = createAction(
  '[Study Page] Set Current Index',
  props<{ index: number }>()
);

// Reset
export const resetStudySession = createAction('[Study Page] Reset Study Session');
*/


// ═══════════════════════════════════════════════════════
// 3️⃣ REDUCER
// ═══════════════════════════════════════════════════════

/**
 * 📚 LESSON: createReducer() & on()
 * 
 * Reducers are PURE functions that:
 * - Take current state + action
 * - Return NEW state (never mutate!)
 * 
 * on() handles specific actions
 */

// UNCOMMENT WHEN @ngrx/store IS INSTALLED:
/*
import { createReducer, on } from '@ngrx/store';

export const flashcardReducer = createReducer(
  initialFlashcardState,
  
  // Handle load cards
  on(loadCards, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  
  on(loadCardsSuccess, (state, { cards }) => ({
    ...state,
    flashcards: cards,
    isLoading: false
  })),
  
  on(loadCardsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error
  })),
  
  // Handle add card success
  on(addCardSuccess, (state, { card }) => ({
    ...state,
    flashcards: [...state.flashcards, card]
  })),
  
  // Handle remove card
  on(removeCard, (state, { id }) => ({
    ...state,
    flashcards: state.flashcards.filter(c => c.id !== id)
  })),
  
  // Handle mark answer
  on(markAnswer, (state, { cardId, isCorrect }) => ({
    ...state,
    flashcards: state.flashcards.map(card =>
      card.id === cardId
        ? {
            ...card,
            timesCorrect: card.timesCorrect + (isCorrect ? 1 : 0),
            timesIncorrect: card.timesIncorrect + (isCorrect ? 0 : 1),
            lastReviewed: new Date()
          }
        : card
    ),
    cardStatuses: {
      ...state.cardStatuses,
      [cardId]: isCorrect ? 'correct' : 'incorrect'
    }
  })),
  
  // Navigation
  on(nextCard, (state) => ({
    ...state,
    currentIndex: Math.min(state.currentIndex + 1, state.flashcards.length - 1)
  })),
  
  on(previousCard, (state) => ({
    ...state,
    currentIndex: Math.max(state.currentIndex - 1, 0)
  })),
  
  on(setCurrentIndex, (state, { index }) => ({
    ...state,
    currentIndex: index
  })),
  
  // Reset
  on(resetStudySession, (state) => ({
    ...state,
    currentIndex: 0,
    cardStatuses: {}
  }))
);
*/


// ═══════════════════════════════════════════════════════
// 4️⃣ SELECTORS
// ═══════════════════════════════════════════════════════

/**
 * 📚 LESSON: createSelector() & createFeatureSelector()
 * 
 * Selectors are memoized functions to read state.
 * - createFeatureSelector() gets a slice of state
 * - createSelector() computes derived data
 * 
 * Benefits:
 * - Memoized (cached until inputs change)
 * - Composable (build complex selectors from simple ones)
 * - Decouples components from state structure
 */

// UNCOMMENT WHEN @ngrx/store IS INSTALLED:
/*
import { createSelector, createFeatureSelector } from '@ngrx/store';

// Get the flashcard feature state
export const selectFlashcardState = createFeatureSelector<FlashcardState>('flashcards');

// Basic selectors
export const selectAllCards = createSelector(
  selectFlashcardState,
  (state) => state.flashcards
);

export const selectCurrentIndex = createSelector(
  selectFlashcardState,
  (state) => state.currentIndex
);

export const selectIsLoading = createSelector(
  selectFlashcardState,
  (state) => state.isLoading
);

export const selectError = createSelector(
  selectFlashcardState,
  (state) => state.error
);

export const selectCardStatuses = createSelector(
  selectFlashcardState,
  (state) => state.cardStatuses
);

// Computed selectors (derived data)
export const selectCurrentCard = createSelector(
  selectAllCards,
  selectCurrentIndex,
  (cards, index) => cards[index] ?? null
);

export const selectTotalCards = createSelector(
  selectAllCards,
  (cards) => cards.length
);

export const selectCardsByCategory = (category: string) => createSelector(
  selectAllCards,
  (cards) => cards.filter(c => c.category === category)
);

export const selectCategories = createSelector(
  selectAllCards,
  (cards) => [...new Set(cards.map(c => c.category))]
);

export const selectStats = createSelector(
  selectAllCards,
  selectCardStatuses,
  (cards, statuses): StudyStats => {
    let correct = 0;
    let incorrect = 0;
    
    Object.values(statuses).forEach(status => {
      if (status === 'correct') correct++;
      if (status === 'incorrect') incorrect++;
    });
    
    const total = correct + incorrect;
    
    return {
      totalCards: cards.length,
      totalCorrect: correct,
      totalIncorrect: incorrect,
      accuracy: total > 0 ? Math.round((correct / total) * 100) : 0,
      streakCount: 0  // TODO: calculate
    };
  }
);

// Parameterized selector
export const selectCardById = (id: string) => createSelector(
  selectAllCards,
  (cards) => cards.find(c => c.id === id)
);
*/


// ═══════════════════════════════════════════════════════
// 5️⃣ EFFECTS
// ═══════════════════════════════════════════════════════

/**
 * 📚 LESSON: createEffect() & Actions stream
 * 
 * Effects handle side effects (API calls, storage, etc.)
 * 
 * Flow:
 * 1. Listen for specific actions
 * 2. Perform async work
 * 3. Dispatch success/failure actions
 * 
 * Powered by RxJS - switchMap, mergeMap, catchError
 */

// UNCOMMENT WHEN @ngrx/effects IS INSTALLED:
/*
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { ApiService } from '../services/api.service';

@Injectable()
export class FlashcardEffects {
  
  private readonly actions$ = inject(Actions);
  private readonly apiService = inject(ApiService);
  
  // Load cards effect
  loadCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCards),  // Listen for loadCards action
      switchMap(() =>     // Switch to API call (cancel previous)
        this.apiService.getCards().pipe(
          map(cards => loadCardsSuccess({ cards })),  // Success action
          catchError(error => of(loadCardsFailure({ error: error.message })))  // Failure action
        )
      )
    )
  );
  
  // Add card effect
  addCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCard),
      switchMap(({ card }) =>
        this.apiService.createCard(card).pipe(
          map(newCard => addCardSuccess({ card: newCard })),
          catchError(error => of(loadCardsFailure({ error: error.message })))
        )
      )
    )
  );
  
  // Side effect with no dispatch (dispatch: false)
  logError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCardsFailure),
      tap(({ error }) => console.error('Load failed:', error))
    ),
    { dispatch: false }  // Don't dispatch, just side effect
  );
}
*/


// ═══════════════════════════════════════════════════════
// 6️⃣ USAGE IN COMPONENTS
// ═══════════════════════════════════════════════════════

/**
 * 📚 LESSON: Store in Components
 * 
 * Using the Store in components:
 * 1. Inject Store
 * 2. Select state with store.select()
 * 3. Dispatch actions with store.dispatch()
 */

// EXAMPLE COMPONENT USAGE:
/*
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { AppState } from './store/app.state';
import { selectAllCards, selectStats, selectCurrentCard } from './store/flashcard.selectors';
import { loadCards, nextCard, markAnswer } from './store/flashcard.actions';

@Component({
  selector: 'app-study',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    @if (cards$ | async; as cards) {
      @for (card of cards; track card.id) {
        <div>{{ card.question }}</div>
      }
    }
    
    @if (currentCard$ | async; as card) {
      <div>{{ card.question }}</div>
      <button (click)="onCorrect(card.id)">Correct</button>
      <button (click)="onIncorrect(card.id)">Incorrect</button>
    }
  `
})
export class StudyComponent {
  private readonly store = inject(Store<AppState>);
  
  // Select state as Observables
  readonly cards$ = this.store.select(selectAllCards);
  readonly currentCard$ = this.store.select(selectCurrentCard);
  readonly stats$ = this.store.select(selectStats);
  
  ngOnInit() {
    // Dispatch action to load cards
    this.store.dispatch(loadCards());
  }
  
  onCorrect(cardId: string) {
    this.store.dispatch(markAnswer({ cardId, isCorrect: true }));
    this.store.dispatch(nextCard());
  }
  
  onIncorrect(cardId: string) {
    this.store.dispatch(markAnswer({ cardId, isCorrect: false }));
    this.store.dispatch(nextCard());
  }
}
*/


// ═══════════════════════════════════════════════════════
// 7️⃣ APP.CONFIG.TS SETUP
// ═══════════════════════════════════════════════════════

/**
 * 📚 To enable NgRx, add to app.config.ts:
 */

/*
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { flashcardReducer } from './store/flashcard.reducer';
import { FlashcardEffects } from './store/flashcard.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    // ... other providers
    
    // NgRx Store
    provideStore({
      flashcards: flashcardReducer
    }),
    
    // NgRx Effects
    provideEffects([FlashcardEffects]),
    
    // Dev Tools (disable in production!)
    provideStoreDevtools({
      maxAge: 25,  // Retains last 25 states
      logOnly: !isDevMode()  // Restrict extension in prod
    })
  ]
};
*/

// Export for reference
export { };
