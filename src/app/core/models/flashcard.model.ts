/**
 * 📚 LESSON: TypeScript Interfaces & Models
 * 
 * WHY MODELS MATTER:
 * - Type safety prevents runtime errors
 * - IntelliSense/autocomplete in your IDE
 * - Self-documenting code
 * - Easier refactoring
 * 
 * SENIOR TIP: Keep models in a dedicated folder
 * Use interfaces for data shapes, classes for behavior
 */

// Technology types for the study hub
export type Technology = 
  | 'angular' 
  | 'react'
  | 'vue'
  | 'javascript' 
  | 'typescript'
  | 'css' 
  | 'html' 
  | 'node' 
  | 'nestjs' 
  | 'mongodb'
  | 'dsa';

export interface TechnologyInfo {
  id: Technology;
  name: string;
  icon: string;  // Emoji or icon class
  color: string; // Theme color
}

export const TECHNOLOGIES: TechnologyInfo[] = [
  { id: 'angular', name: 'Angular', icon: '🅰️', color: '#dd0031' },
  { id: 'react', name: 'React', icon: '⚛️', color: '#61dafb' },
  { id: 'vue', name: 'Vue.js', icon: '💚', color: '#42b883' },
  { id: 'javascript', name: 'JavaScript', icon: '🟨', color: '#f7df1e' },
  { id: 'typescript', name: 'TypeScript', icon: '🔷', color: '#3178c6' },
  { id: 'css', name: 'CSS/Tailwind', icon: '🎨', color: '#38bdf8' },
  { id: 'html', name: 'HTML', icon: '📄', color: '#e34c26' },
  { id: 'node', name: 'Node/Express', icon: '🟢', color: '#68a063' },
  { id: 'nestjs', name: 'NestJS', icon: '🐱', color: '#e0234e' },
  { id: 'mongodb', name: 'MongoDB', icon: '🍃', color: '#00ed64' },
  { id: 'dsa', name: 'DSA', icon: '🧮', color: '#9333ea' }
];

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  codeExample?: string;  // Optional code example to display
  technology: Technology; // Which tech stack this belongs to
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';  // Union type = only these values allowed
  timesCorrect: number;
  timesIncorrect: number;
  lastReviewed?: Date;  // Optional property (?)
}

export interface StudySession {
  id: string;
  startTime: Date;
  endTime?: Date;
  cardsStudied: number;
  correctAnswers: number;
  incorrectAnswers: number;
}

export interface StudyStats {
  totalCards: number;
  totalCorrect: number;
  totalIncorrect: number;
  accuracy: number;  // Percentage
  streakCount: number;
}

// Type alias for card status - useful for UI state
export type CardStatus = 'unanswered' | 'correct' | 'incorrect';

// Enum example - use when you need actual values at runtime
export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard'
}
