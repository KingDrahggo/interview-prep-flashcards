/**
 * 📚 Web Dev Interview Prep - All Flashcards
 * 
 * This file combines all technology-specific flashcard data
 * into a single export for easy consumption by the service.
 */

import { Flashcard, Technology, TECHNOLOGIES, TechnologyInfo } from '../models/flashcard.model';

// Frameworks
import { ANGULAR_CARDS } from './angular.data';
import { REACT_CARDS } from './react.data';
import { VUE_CARDS } from './vue.data';

// Languages
import { JAVASCRIPT_CARDS } from './javascript.data';
import { TYPESCRIPT_CARDS } from './typescript.data';
import { JAVA_CARDS } from './java.data';
import { PYTHON_CARDS } from './python.data';

// Web Basics
import { CSS_CARDS } from './css.data';
import { HTML_CARDS } from './html.data';

// Backend
import { NODE_CARDS } from './node.data';
import { NESTJS_CARDS } from './nestjs.data';
import { DJANGO_CARDS } from './django.data';
import { DOTNET_CARDS } from './dotnet.data';
import { SPRINGBOOT_CARDS } from './springboot.data';

// Database
import { MONGODB_CARDS } from './mongodb.data';

// Cloud
import { AWS_CARDS } from './aws.data';
import { AZURE_CARDS } from './azure.data';

// Design
import { FIGMA_CARDS } from './figma.data';
import { UIUX_CARDS } from './uiux.data';
import { SPLINE_CARDS } from './spline.data';
import { BLENDER_CARDS } from './blender.data';

// CS Fundamentals
import { DSA_CARDS } from './dsa.data';

// ═══════════════════════════════════════════════════════
// COMBINED FLASHCARD DATA
// ═══════════════════════════════════════════════════════

export const ALL_FLASHCARDS: Flashcard[] = [
  // Frameworks
  ...ANGULAR_CARDS,
  ...REACT_CARDS,
  ...VUE_CARDS,
  // Languages
  ...JAVASCRIPT_CARDS,
  ...TYPESCRIPT_CARDS,
  ...JAVA_CARDS,
  ...PYTHON_CARDS,
  // Web Basics
  ...CSS_CARDS,
  ...HTML_CARDS,
  // Backend
  ...NODE_CARDS,
  ...NESTJS_CARDS,
  ...DJANGO_CARDS,
  ...DOTNET_CARDS,
  ...SPRINGBOOT_CARDS,
  // Database
  ...MONGODB_CARDS,
  // Cloud
  ...AWS_CARDS,
  ...AZURE_CARDS,
  // Design
  ...FIGMA_CARDS,
  ...UIUX_CARDS,
  ...SPLINE_CARDS,
  ...BLENDER_CARDS,
  // CS Fundamentals
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
export { 
  ANGULAR_CARDS, 
  REACT_CARDS, 
  VUE_CARDS, 
  JAVASCRIPT_CARDS, 
  TYPESCRIPT_CARDS,
  JAVA_CARDS,
  PYTHON_CARDS,
  CSS_CARDS, 
  HTML_CARDS, 
  NODE_CARDS, 
  NESTJS_CARDS,
  DJANGO_CARDS, 
  DOTNET_CARDS,
  SPRINGBOOT_CARDS,
  MONGODB_CARDS, 
  AWS_CARDS,
  AZURE_CARDS,
  FIGMA_CARDS,
  UIUX_CARDS,
  SPLINE_CARDS,
  BLENDER_CARDS,
  DSA_CARDS 
};
