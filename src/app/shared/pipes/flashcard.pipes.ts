import { Pipe, PipeTransform } from '@angular/core';

/**
 * 📚 LESSON: Pipes in Angular
 * 
 * WHAT ARE PIPES?
 * - Transform data in templates
 * - Syntax: {{ value | pipeName:arg1:arg2 }}
 * - Can be chained: {{ value | pipe1 | pipe2 }}
 * 
 * BUILT-IN PIPES:
 * - DatePipe: {{ date | date:'short' }}
 * - CurrencyPipe: {{ price | currency:'USD' }}
 * - DecimalPipe: {{ num | number:'1.2-2' }}
 * - PercentPipe: {{ ratio | percent }}
 * - UpperCasePipe, LowerCasePipe, TitleCasePipe
 * - SlicePipe: {{ array | slice:0:5 }}
 * - JsonPipe: {{ object | json }} (great for debugging!)
 * - AsyncPipe: {{ observable$ | async }} (auto-subscribes!)
 * 
 * PURE vs IMPURE PIPES:
 * 
 * PURE PIPES (default):
 * - Only re-run when INPUT REFERENCE changes
 * - Won't detect changes inside objects/arrays
 * - More performant
 * - Use for: calculations, formatting
 * 
 * IMPURE PIPES (pure: false):
 * - Re-run on EVERY change detection cycle
 * - Detects changes inside objects/arrays
 * - Can be expensive!
 * - Use for: filtering arrays, stateful transforms
 * 
 * SENIOR TIP: Avoid impure pipes when possible
 * Use computed signals or component logic instead
 */

@Pipe({
  name: 'timeAgo',
  standalone: true,
  pure: true  // Default, but explicit for learning
})
export class TimeAgoPipe implements PipeTransform {
  
  /**
   * 📚 LESSON: PipeTransform Interface
   * 
   * transform() method is required
   * First param: the value being piped
   * Rest params: arguments passed to pipe
   * 
   * Example usage: {{ lastReviewed | timeAgo }}
   */
  transform(value: Date | string | null | undefined): string {
    if (!value) return 'Never';
    
    const date = new Date(value);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    // Define time intervals
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1
    };
    
    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      
      if (interval >= 1) {
        return interval === 1 
          ? `1 ${unit} ago` 
          : `${interval} ${unit}s ago`;
      }
    }
    
    return 'Just now';
  }
}


/**
 * 📚 LESSON: Pipe with Arguments
 * 
 * Pipes can accept multiple arguments
 * Usage: {{ value | pipeName:arg1:arg2 }}
 */
@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  
  /**
   * Truncate text to specified length
   * Usage: {{ longText | truncate:50:'...' }}
   */
  transform(value: string, limit: number = 100, suffix: string = '...'): string {
    if (!value) return '';
    if (value.length <= limit) return value;
    
    return value.substring(0, limit).trim() + suffix;
  }
}


/**
 * 📚 LESSON: Impure Pipe Example
 * 
 * This pipe filters an array - it's impure because
 * array contents can change without reference changing
 * 
 * WARNING: Impure pipes run on EVERY change detection!
 * Consider using a computed signal or service method instead.
 */
@Pipe({
  name: 'filterByDifficulty',
  standalone: true,
  pure: false  // IMPURE - re-runs every cycle
})
export class FilterByDifficultyPipe implements PipeTransform {
  
  transform<T extends { difficulty: string }>(
    items: T[] | null | undefined, 
    difficulty: string | null
  ): T[] {
    if (!items) return [];
    if (!difficulty || difficulty === 'all') return items;
    
    return items.filter(item => item.difficulty === difficulty);
  }
}


/**
 * 📚 LESSON: Pipe for Formatting
 * 
 * Common use case: formatting display values
 */
@Pipe({
  name: 'accuracy',
  standalone: true
})
export class AccuracyPipe implements PipeTransform {
  
  /**
   * Format accuracy percentage with color indication
   * Usage: {{ stats.accuracy | accuracy }}
   */
  transform(value: number | null | undefined): string {
    if (value === null || value === undefined) return 'N/A';
    
    const rounded = Math.round(value);
    
    if (rounded >= 80) return `${rounded}% 🔥`;
    if (rounded >= 60) return `${rounded}% 👍`;
    if (rounded >= 40) return `${rounded}% 📚`;
    return `${rounded}% 💪`;
  }
}


/**
 * 📚 LESSON: Pipe with Object Input
 * 
 * Pipes can work with complex objects
 */
@Pipe({
  name: 'cardProgress',
  standalone: true
})
export class CardProgressPipe implements PipeTransform {
  
  transform(card: { timesCorrect: number; timesIncorrect: number } | null): string {
    if (!card) return 'No data';
    
    const total = card.timesCorrect + card.timesIncorrect;
    if (total === 0) return 'Not studied yet';
    
    const accuracy = (card.timesCorrect / total) * 100;
    
    if (accuracy >= 80) return 'Mastered';
    if (accuracy >= 60) return 'Learning';
    if (accuracy >= 40) return 'Practicing';
    return 'Needs work';
  }
}
