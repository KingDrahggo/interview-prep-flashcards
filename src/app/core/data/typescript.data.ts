import { Flashcard } from '../models/flashcard.model';

export const TYPESCRIPT_CARDS: Flashcard[] = [
  {
    id: 'ts-1',
    question: 'What is TypeScript and why is it used?',
    answer: 'TypeScript is a strongly typed superset of JavaScript that compiles to plain JavaScript. It adds static typing, classes, and interfaces, helping catch errors during development.',
    codeExample: `// Basic Type Annotation
let username: string = "Junior Developer";
let age: number = 25;
let isLearning: boolean = true;

// Functional Type
function greet(name: string): string {
  return \`Hello, \${name}\`;
}`,
    technology: 'typescript',
    category: 'Core',
    difficulty: 'easy',
    version: 'TS 5.x',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'ts-2',
    question: 'Explain the difference between interface and type in TypeScript.',
    answer: 'Interfaces are mainly for defining object shapes and support "declaration merging". Types can define primitives, unions, and intersections, and are more flexible for complex types.',
    codeExample: `// Interface - Extensible via merging
interface User {
  name: string;
}
interface User {
  age: number;
}

// Type - Flexible, supports unions
type ID = string | number;
type Point = { x: number; y: number };

// Intersection
type Employee = User & { role: string };`,
    technology: 'typescript',
    category: 'Types',
    difficulty: 'medium',
    version: 'TS 3.4+',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'ts-3',
    question: 'What are Generics in TypeScript?',
    answer: 'Generics allow creating reusable components that work with a variety of types rather than a single one. They provide type safety without losing flexibility.',
    codeExample: `// Generic Function
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("myString");

// Generic Interface
interface Box<T> {
  content: T;
}

const stringBox: Box<string> = { content: "Hello" };
const numberBox: Box<number> = { content: 123 };`,
    technology: 'typescript',
    category: 'Advanced',
    difficulty: 'hard',
    version: 'TS 3.x',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'ts-4',
    question: 'What is the "unknown" type and how does it differ from "any"?',
    answer: '"any" opts out of type checking. "unknown" is the type-safe counterpart; you can assign anything to it, but you must perform type checking or coercion before using it.',
    codeExample: `let valueAny: any = 10;
valueAny.toUpperCase(); // Allowed, but might crash

let valueUnknown: unknown = "Hello";
// valueUnknown.toUpperCase(); // Error!

if (typeof valueUnknown === 'string') {
  console.log(valueUnknown.toUpperCase()); // OK!
}`,
    technology: 'typescript',
    category: 'Types',
    difficulty: 'medium',
    version: 'TS 3.0+',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'ts-5',
    question: 'Explain Utility Types in TypeScript.',
    answer: 'TypeScript provides built-in transformations to facilitate common type manipulations. Examples include Partial, Readonly, Pick, and Omit.',
    codeExample: `interface Task {
  title: string;
  description: string;
  completed: boolean;
}

// Partial - all properties optional
const update: Partial<Task> = { completed: true };

// Pick - only selected properties
type TitleOnly = Pick<Task, 'title'>;

// Omit - remove selected properties
type WithoutDesc = Omit<Task, 'description'>;

// Readonly - cannot be modified
const task: Readonly<Task> = { ... };`,
    technology: 'typescript',
    category: 'Utility Types',
    difficulty: 'medium',
    version: 'TS 3.5+',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'ts-6',
    question: 'What is Type Narrowing?',
    answer: 'Type narrowing is the process of moving from a less specific type to a more specific type using runtime checks like typeof, instanceof, or custom type guards.',
    codeExample: `function format(val: string | number) {
  if (typeof val === 'string') {
    return val.trim(); // Narrowed to string
  }
  return val.toFixed(2); // Narrowed to number
}

// Custom Type Guard
function isUser(obj: any): obj is User {
  return 'name' in obj;
}`,
    technology: 'typescript',
    category: 'Core',
    difficulty: 'medium',
    version: 'TS 3.x',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'ts-7',
    question: 'What are Template Literal Types?',
    answer: 'Template literal types build on string literal types and can expand into many strings through unions. They use the same syntax as template literals in JS.',
    codeExample: `type World = "world";
type Greeting = \`hello \${World}\`; // "hello world"

type Color = "red" | "blue";
type Intensity = "light" | "dark";

type Palette = \`\${Intensity}-\${Color}\`;
// "light-red" | "light-blue" | "dark-red" | "dark-blue"`,
    technology: 'typescript',
    category: 'Advanced',
    difficulty: 'hard',
    version: 'TS 4.1+',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'ts-8',
    question: 'What is the "keyof" operator?',
    answer: 'The keyof operator takes an object type and produces a string or numeric literal union of its keys.',
    codeExample: `interface User {
  id: number;
  name: string;
}

type UserKeys = keyof User; // "id" | "name"

function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}`,
    technology: 'typescript',
    category: 'Advanced',
    difficulty: 'medium',
    version: 'TS 2.1+',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'ts-9',
    question: 'Explain "Mapped Types".',
    answer: 'Mapped types allow you to create new types based on the properties of an existing type by iterating over keys.',
    codeExample: `type ReadOnly<T> = {
  readonly [P in keyof T]: T[P];
};

interface User {
  name: string;
}

type ReadOnlyUser = ReadOnly<User>;`,
    technology: 'typescript',
    category: 'Advanced',
    difficulty: 'hard',
    version: 'TS 2.1+',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'ts-10',
    question: 'What is "Satisfies" operator?',
    answer: 'Introduced in TS 4.9, the "satisfies" operator allows you to validate that an expression matches a type without changing the resulting type of that expression.',
    codeExample: `type Color = string | { r: number; g: number; b: number };

const myColor = { r: 255, g: 0, b: 0 } satisfies Color;

// We still know myColor has r, g, b properties!
console.log(myColor.r); `,
    technology: 'typescript',
    category: 'Advanced',
    difficulty: 'hard',
    version: 'TS 4.9+',
    timesCorrect: 0,
    timesIncorrect: 0
  }
];
