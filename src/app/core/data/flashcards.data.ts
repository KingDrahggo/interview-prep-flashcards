/**
 * 📚 Web Dev Interview Prep - All Flashcards
 * 
 * This file combines all technology-specific flashcard data
 * into a single export for easy consumption by the service.
 */

import { Flashcard, Technology, TECHNOLOGIES, TechnologyInfo } from '../models/flashcard.model';
import { ANGULAR_CARDS } from './angular.data';
import { REACT_CARDS } from './react.data';
import { VUE_CARDS } from './vue.data';
import { JAVASCRIPT_CARDS } from './javascript.data';
import { CSS_CARDS } from './css.data';
import { HTML_CARDS } from './html.data';
import { NODE_CARDS } from './node.data';
import { NESTJS_CARDS } from './nestjs.data';
import { MONGODB_CARDS } from './mongodb.data';
import { DSA_CARDS } from './dsa.data';

// ═══════════════════════════════════════════════════════
// COMBINED FLASHCARD DATA
// ═══════════════════════════════════════════════════════

export const ALL_FLASHCARDS: Flashcard[] = [
  ...ANGULAR_CARDS,
  ...REACT_CARDS,
  ...VUE_CARDS,
  ...JAVASCRIPT_CARDS,
  ...CSS_CARDS,
  ...HTML_CARDS,
  ...NODE_CARDS,
  ...NESTJS_CARDS,
  ...MONGODB_CARDS,
  ...DSA_CARDS
];

// ═══════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════

/**
 * Get flashcards for a specific technology
 */
export function getCardsByTechnology(tech: Technology): Flashcard[] {
  return ALL_FLASHCARDS.filter(card => card.technology === tech);
}

/**
 * Get flashcard counts by technology
 */
export function getCardCounts(): Record<Technology, number> {
  const counts: Partial<Record<Technology, number>> = {};
  
  for (const card of ALL_FLASHCARDS) {
    counts[card.technology] = (counts[card.technology] || 0) + 1;
  }
  
  return counts as Record<Technology, number>;
}

/**
 * Get technology info with card count
 */
export function getTechnologiesWithCounts(): (TechnologyInfo & { count: number })[] {
  const counts = getCardCounts();
  
  return TECHNOLOGIES.map(tech => ({
    ...tech,
    count: counts[tech.id] || 0
  })).filter(tech => tech.count > 0);
}

// Re-export for convenience
export { TECHNOLOGIES };
export type { Technology, TechnologyInfo };
export { ANGULAR_CARDS, REACT_CARDS, VUE_CARDS, JAVASCRIPT_CARDS, CSS_CARDS, HTML_CARDS, NODE_CARDS, NESTJS_CARDS, MONGODB_CARDS, DSA_CARDS };
