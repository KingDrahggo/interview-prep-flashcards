import { Injectable, signal, computed } from '@angular/core';
import { Flashcard, StudyStats, CardStatus, Technology, TECHNOLOGIES, TechnologyInfo } from '../models/flashcard.model';
import { ALL_FLASHCARDS, getTechnologiesWithCounts } from '../data/flashcards.data';

/**
 * 📚 LESSON: Services & Dependency Injection (DI)
 * 
 * WHAT IS A SERVICE?
 * - A class that handles business logic, data management, or side effects
 * - Should be stateless OR manage shared state
 * - Gets "injected" into components that need it
 * 
 * WHAT IS DEPENDENCY INJECTION?
 * - A design pattern where dependencies are "injected" rather than created
 * - Angular's DI system creates and manages service instances
 * - Makes code testable, reusable, and loosely coupled
 * 
 * THE @Injectable() DECORATOR:
 * - Marks a class as available for DI
 * - providedIn: 'root' = SINGLETON (one instance for entire app)
 * - This is the recommended approach for most services
 */
@Injectable({
  providedIn: 'root'
})
export class FlashcardService {
  
  // ═══════════════════════════════════════════════════════
  // STATE MANAGEMENT WITH SIGNALS
  // ═══════════════════════════════════════════════════════
  
  // All flashcards (loaded once)
  private readonly _allFlashcards = signal<Flashcard[]>(ALL_FLASHCARDS);
  
  // Currently selected technology filter
  private readonly _selectedTechnology = signal<Technology | 'all'>('all');
  readonly selectedTechnology = this._selectedTechnology.asReadonly();
  
  // Current card index for study mode
  private readonly _currentIndex = signal<number>(0);
  readonly currentIndex = this._currentIndex.asReadonly();
  
  // Track answer status for each card
  private readonly _cardStatuses = signal<Map<string, CardStatus>>(new Map());
  readonly cardStatuses = this._cardStatuses.asReadonly();
  
  // ═══════════════════════════════════════════════════════
  // COMPUTED SIGNALS (Derived State)
  // ═══════════════════════════════════════════════════════
  
  /**
   * Filtered flashcards based on selected technology
   */
  readonly flashcards = computed(() => {
    const tech = this._selectedTechnology();
    const allCards = this._allFlashcards();
    
    if (tech === 'all') {
      return allCards;
    }
    return allCards.filter(card => card.technology === tech);
  });
  
  /**
   * Current card being studied
   */
  readonly currentCard = computed(() => {
    const cards = this.flashcards();
    const index = this._currentIndex();
    return cards[index] ?? null;
  });
  
  /**
   * Total cards for current filter
   */
  readonly totalCards = computed(() => this.flashcards().length);
  
  /**
   * Technologies with card counts
   */
  readonly technologies = computed(() => getTechnologiesWithCounts());
  
  /**
   * Study statistics
   */
  readonly stats = computed<StudyStats>(() => {
    const statuses = this._cardStatuses();
    let correct = 0;
    let incorrect = 0;
    
    statuses.forEach((status) => {
      if (status === 'correct') correct++;
      if (status === 'incorrect') incorrect++;
    });
    
    const total = correct + incorrect;
    const accuracy = total > 0 ? (correct / total) * 100 : 0;
    
    return {
      totalCards: this.flashcards().length,
      totalCorrect: correct,
      totalIncorrect: incorrect,
      accuracy: Math.round(accuracy),
      streakCount: this.calculateStreak()
    };
  });
  
  // ═══════════════════════════════════════════════════════
  // ACTIONS
  // ═══════════════════════════════════════════════════════
  
  /**
   * Set the technology filter
   */
  setTechnology(tech: Technology | 'all'): void {
    this._selectedTechnology.set(tech);
    this._currentIndex.set(0);  // Reset to first card
    this._cardStatuses.set(new Map());  // Reset study progress
  }
  
  /**
   * Add a new flashcard
   */
  addCard(card: Omit<Flashcard, 'id' | 'timesCorrect' | 'timesIncorrect'>): void {
    const newCard: Flashcard = {
      ...card,
      id: crypto.randomUUID(),
      timesCorrect: 0,
      timesIncorrect: 0
    };
    
    this._allFlashcards.update(cards => [...cards, newCard]);
  }
  
  /**
   * Remove a flashcard
   */
  removeCard(id: string): void {
    this._allFlashcards.update(cards => cards.filter(card => card.id !== id));
  }
  
  /**
   * Mark a card as correct or incorrect
   */
  markAnswer(cardId: string, isCorrect: boolean): void {
    // Update card statistics
    this._allFlashcards.update(cards => 
      cards.map(card => 
        card.id === cardId
          ? {
              ...card,
              timesCorrect: card.timesCorrect + (isCorrect ? 1 : 0),
              timesIncorrect: card.timesIncorrect + (isCorrect ? 0 : 1),
              lastReviewed: new Date()
            }
          : card
      )
    );
    
    // Update status map
    this._cardStatuses.update(statuses => {
      const newStatuses = new Map(statuses);
      newStatuses.set(cardId, isCorrect ? 'correct' : 'incorrect');
      return newStatuses;
    });
  }
  
  /**
   * Navigate to next card
   */
  nextCard(): void {
    this._currentIndex.update(index => 
      Math.min(index + 1, this.flashcards().length - 1)
    );
  }
  
  /**
   * Navigate to previous card
   */
  previousCard(): void {
    this._currentIndex.update(index => Math.max(index - 1, 0));
  }
  
  /**
   * Reset the study session
   */
  resetStudySession(): void {
    this._currentIndex.set(0);
    this._cardStatuses.set(new Map());
  }
  
  /**
   * Get cards by category
   */
  getCardsByCategory(category: string): Flashcard[] {
    return this.flashcards().filter(card => card.category === category);
  }
  
  /**
   * Get cards by technology
   */
  getCardsByTechnology(tech: Technology): Flashcard[] {
    return this._allFlashcards().filter(card => card.technology === tech);
  }
  
  /**
   * Get all unique categories for current technology
   */
  getCategories(): string[] {
    const cards = this.flashcards();
    return [...new Set(cards.map(card => card.category))];
  }
  
  /**
   * Calculate current streak of correct answers
   */
  private calculateStreak(): number {
    const statuses = Array.from(this._cardStatuses().values());
    let streak = 0;
    for (let i = statuses.length - 1; i >= 0; i--) {
      if (statuses[i] === 'correct') streak++;
      else break;
    }
    return streak;
  }
}
