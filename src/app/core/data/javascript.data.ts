import { Flashcard } from '../models/flashcard.model';

export const JAVASCRIPT_CARDS: Flashcard[] = [
  // ═══════════════════════════════════════════════════════
  // CORE CONCEPTS
  // ═══════════════════════════════════════════════════════
  {
    id: 'js-1',
    question: 'What is the difference between var, let, and const?',
    answer: 'var: function-scoped, hoisted, can redeclare. let: block-scoped, not hoisted (TDZ), can reassign. const: block-scoped, not hoisted, cannot reassign (but objects/arrays can be mutated).',
    codeExample: `// var - function scoped, hoisted
function example() {
  console.log(x); // undefined (hoisted)
  var x = 5;
  var x = 10; // Can redeclare
}

// let - block scoped, TDZ
{
  // console.log(y); // ReferenceError (TDZ)
  let y = 5;
  // let y = 10; // SyntaxError: can't redeclare
}

// const - must initialize, can't reassign
const obj = { a: 1 };
obj.a = 2; // ✅ Mutation allowed
// obj = {}; // ❌ TypeError: can't reassign`,
    technology: 'javascript',
    category: 'Variables',
    difficulty: 'easy',
    version: 'ES6/ES2015',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'js-2',
    question: 'Explain closures in JavaScript.',
    answer: 'A closure is a function that remembers variables from its outer scope even after the outer function has returned. Closures enable data privacy and factory functions.',
    codeExample: `function createCounter() {
  let count = 0; // Private variable
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
console.log(counter.getCount()); // 2
// count is not accessible directly - data privacy!`,
    technology: 'javascript',
    category: 'Closures',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'js-3',
    question: 'What is the event loop and how does it work?',
    answer: 'The event loop handles async operations. Call Stack executes code, Web APIs handle timers/fetch, Callback Queue holds callbacks, Microtask Queue holds promises. Microtasks run before callbacks.',
    codeExample: `console.log('1'); // Call Stack

setTimeout(() => console.log('2'), 0); // Callback Queue

Promise.resolve().then(() => console.log('3')); // Microtask Queue

console.log('4'); // Call Stack

// Output: 1, 4, 3, 2
// Why? Sync first (1,4), then microtasks (3), then callbacks (2)`,
    technology: 'javascript',
    category: 'Async',
    difficulty: 'hard',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'js-4',
    question: 'What is the difference between == and ===?',
    answer: '== (loose equality) performs type coercion before comparing. === (strict equality) compares both value AND type without coercion. Always prefer === for predictable behavior.',
    codeExample: `// == performs type coercion
console.log(5 == '5');     // true (string converted to number)
console.log(null == undefined); // true
console.log(0 == false);   // true
console.log('' == false);  // true

// === strict comparison
console.log(5 === '5');    // false (different types)
console.log(null === undefined); // false
console.log(0 === false);  // false

// Always prefer === for predictability!`,
    technology: 'javascript',
    category: 'Operators',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'js-5',
    question: 'What is hoisting in JavaScript?',
    answer: 'Hoisting moves declarations to the top of their scope during compilation. var is hoisted and initialized to undefined. let/const are hoisted but not initialized (Temporal Dead Zone).',
    codeExample: `// var hoisting
console.log(a); // undefined (hoisted, initialized to undefined)
var a = 5;

// function hoisting
sayHi(); // "Hi!" (function declarations are fully hoisted)
function sayHi() { console.log("Hi!"); }

// let/const - Temporal Dead Zone (TDZ)
// console.log(b); // ReferenceError: Cannot access before initialization
let b = 10;

// function expressions are NOT hoisted
// sayBye(); // TypeError: sayBye is not a function
var sayBye = function() { console.log("Bye!"); };`,
    technology: 'javascript',
    category: 'Hoisting',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'js-6',
    question: 'Explain "this" keyword in JavaScript.',
    answer: '"this" depends on how a function is called. Global: window/undefined. Object method: the object. Constructor: new instance. Arrow function: inherits from parent scope.',
    codeExample: `// Object method - this = the object
const obj = {
  name: 'Alice',
  greet() { console.log(this.name); } // 'Alice'
};

// Arrow function - inherits this
const obj2 = {
  name: 'Bob',
  greet: () => console.log(this.name) // undefined (window in browser)
};

// Constructor - this = new instance
function Person(name) {
  this.name = name;
}

// Explicit binding
function sayHi() { console.log(this.name); }
sayHi.call({ name: 'Charlie' }); // 'Charlie'
sayHi.apply({ name: 'Dana' });   // 'Dana'
const bound = sayHi.bind({ name: 'Eve' });
bound(); // 'Eve'`,
    technology: 'javascript',
    category: 'this Keyword',
    difficulty: 'hard',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'js-7',
    question: 'What is the difference between null and undefined?',
    answer: 'undefined: variable declared but not assigned. null: intentional absence of value (explicit). typeof undefined = "undefined", typeof null = "object" (legacy bug).',
    codeExample: `// undefined - not assigned
let a;
console.log(a); // undefined
console.log(typeof a); // "undefined"

// null - explicit "no value"
let b = null;
console.log(b); // null
console.log(typeof b); // "object" (JS bug)

// Checking
console.log(null == undefined);  // true (loose)
console.log(null === undefined); // false (strict)

// Common patterns
function getUser(id) {
  if (!id) return null; // Explicitly no result
  return users.find(u => u.id === id);
}`,
    technology: 'javascript',
    category: 'Types',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // ASYNC/AWAIT & PROMISES
  // ═══════════════════════════════════════════════════════
  {
    id: 'js-8',
    question: 'What is a Promise and what are its states?',
    answer: 'A Promise represents an async operation\'s eventual result. States: pending (initial), fulfilled (success), rejected (error). Once settled, state cannot change.',
    codeExample: `// Creating a Promise
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve('Data loaded!');
    } else {
      reject(new Error('Failed'));
    }
  }, 1000);
});

// Consuming
promise
  .then(data => console.log(data))  // Success
  .catch(err => console.error(err)) // Error
  .finally(() => console.log('Done')); // Always runs`,
    technology: 'javascript',
    category: 'Promises',
    difficulty: 'medium',
    version: 'ES6/ES2015',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'js-9',
    question: 'Explain async/await and error handling.',
    answer: 'async makes a function return a Promise. await pauses execution until Promise resolves. Use try/catch for error handling. Cleaner than .then() chains.',
    codeExample: `async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    
    if (!response.ok) {
      throw new Error('User not found');
    }
    
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error:', error.message);
    throw error; // Re-throw or handle
  }
}

// Usage
const user = await fetchUserData(123);`,
    technology: 'javascript',
    category: 'Async/Await',
    difficulty: 'medium',
    version: 'ES2017',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'js-10',
    question: 'What is Promise.all vs Promise.allSettled vs Promise.race?',
    answer: 'Promise.all: resolves when ALL succeed (fails fast). Promise.allSettled: waits for ALL to complete (never rejects). Promise.race: resolves when FIRST settles.',
    codeExample: `const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.reject('Error');

// Promise.all - fails if ANY rejects
Promise.all([p1, p2]).then(console.log); // [1, 2]
Promise.all([p1, p3]).catch(console.log); // 'Error'

// Promise.allSettled - all results, never rejects
Promise.allSettled([p1, p3]).then(console.log);
// [{status: 'fulfilled', value: 1}, {status: 'rejected', reason: 'Error'}]

// Promise.race - first to settle wins
Promise.race([p1, p2]).then(console.log); // 1`,
    technology: 'javascript',
    category: 'Promises',
    difficulty: 'hard',
    version: 'ES2020',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // ARRAY METHODS
  // ═══════════════════════════════════════════════════════
  {
    id: 'js-11',
    question: 'What is the difference between map, filter, and reduce?',
    answer: 'map: transforms each element, returns new array. filter: keeps elements matching condition, returns new array. reduce: accumulates values into single result.',
    codeExample: `const numbers = [1, 2, 3, 4, 5];

// map - transform each element
const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10]

// filter - keep matching elements
const evens = numbers.filter(n => n % 2 === 0);
// [2, 4]

// reduce - accumulate to single value
const sum = numbers.reduce((acc, n) => acc + n, 0);
// 15

// Chaining
const result = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * 2)
  .reduce((acc, n) => acc + n, 0);
// 12 (4 + 8)`,
    technology: 'javascript',
    category: 'Array Methods',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'js-12',
    question: 'What is the difference between find, findIndex, indexOf, and includes?',
    answer: 'find: returns first matching element. findIndex: returns index of first match. indexOf: returns index (uses ===). includes: returns boolean.',
    codeExample: `const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

// find - get element
const alice = users.find(u => u.name === 'Alice');
// { id: 1, name: 'Alice' }

// findIndex - get index
const index = users.findIndex(u => u.id === 2);
// 1

// indexOf - primitive values only
const nums = [1, 2, 3];
nums.indexOf(2); // 1
nums.indexOf(5); // -1 (not found)

// includes - check existence
nums.includes(2); // true
nums.includes(5); // false`,
    technology: 'javascript',
    category: 'Array Methods',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // ES6+ FEATURES
  // ═══════════════════════════════════════════════════════
  {
    id: 'js-13',
    question: 'Explain destructuring in JavaScript.',
    answer: 'Destructuring extracts values from arrays/objects into variables. Supports defaults, renaming, rest operator, and nested destructuring.',
    codeExample: `// Object destructuring
const user = { name: 'Alice', age: 30, city: 'NYC' };
const { name, age, country = 'USA' } = user;
// name='Alice', age=30, country='USA' (default)

// Renaming
const { name: userName } = user; // userName = 'Alice'

// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first=1, second=2, rest=[3,4,5]

// Function parameters
function greet({ name, age = 0 }) {
  console.log(\`\${name} is \${age}\`);
}
greet({ name: 'Bob' }); // "Bob is 0"`,
    technology: 'javascript',
    category: 'ES6+',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'js-14',
    question: 'What is the spread operator and rest parameter?',
    answer: 'Spread (...) expands iterables into elements. Rest (...) collects elements into an array. Same syntax, different use cases.',
    codeExample: `// SPREAD - expand
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]

const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }

// Copy and override
const updated = { ...obj1, b: 99 }; // { a: 1, b: 99 }

// REST - collect
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4); // 10

// Rest in destructuring
const [first, ...others] = [1, 2, 3, 4];
// first=1, others=[2,3,4]`,
    technology: 'javascript',
    category: 'ES6+',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'js-15',
    question: 'What are arrow functions and how are they different?',
    answer: 'Arrow functions have concise syntax, lexical "this" (inherit from parent), no "arguments" object, cannot be used as constructors.',
    codeExample: `// Syntax
const add = (a, b) => a + b;
const square = x => x * x; // Single param: no parens
const greet = () => 'Hello'; // No params

// Lexical this (inherits from parent)
const obj = {
  name: 'Alice',
  regular: function() {
    setTimeout(function() {
      console.log(this.name); // undefined (wrong this)
    }, 100);
  },
  arrow: function() {
    setTimeout(() => {
      console.log(this.name); // 'Alice' (correct this)
    }, 100);
  }
};

// Cannot use as constructor
// const Foo = () => {};
// new Foo(); // TypeError`,
    technology: 'javascript',
    category: 'ES6+',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // PROTOTYPES & CLASSES
  // ═══════════════════════════════════════════════════════
  {
    id: 'js-16',
    question: 'What is prototypal inheritance?',
    answer: 'Objects can inherit from other objects through prototype chain. Each object has [[Prototype]] pointing to parent. Properties are looked up the chain.',
    codeExample: `// Prototype chain
const animal = {
  speak() { console.log('Sound'); }
};

const dog = Object.create(animal);
dog.bark = function() { console.log('Woof!'); };

dog.bark();  // 'Woof!' (own property)
dog.speak(); // 'Sound' (inherited from animal)

// Check prototype
console.log(Object.getPrototypeOf(dog) === animal); // true
console.log(dog.hasOwnProperty('bark'));  // true
console.log(dog.hasOwnProperty('speak')); // false`,
    technology: 'javascript',
    category: 'Prototypes',
    difficulty: 'hard',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'js-17',
    question: 'Explain ES6 classes and their features.',
    answer: 'Classes are syntactic sugar over prototypes. Support constructor, methods, static members, inheritance with extends, super() for parent constructor.',
    codeExample: `class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(\`\${this.name} makes a sound\`);
  }
  
  static isAnimal(obj) {
    return obj instanceof Animal;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Call parent constructor
    this.breed = breed;
  }
  
  speak() {
    console.log(\`\${this.name} barks!\`);
  }
}

const dog = new Dog('Rex', 'German Shepherd');
dog.speak(); // 'Rex barks!'`,
    technology: 'javascript',
    category: 'Classes',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // DOM & EVENTS
  // ═══════════════════════════════════════════════════════
  {
    id: 'js-18',
    question: 'What is event bubbling and capturing?',
    answer: 'Events propagate in 3 phases: Capturing (root to target), Target, Bubbling (target to root). Default is bubbling. Use capture: true for capturing phase.',
    codeExample: `// Event propagation
document.getElementById('parent').addEventListener('click', (e) => {
  console.log('Parent clicked');
}, false); // Bubbling (default)

document.getElementById('child').addEventListener('click', (e) => {
  console.log('Child clicked');
  e.stopPropagation(); // Stop bubbling
});

// Capturing phase
element.addEventListener('click', handler, true); // Capturing

// Event delegation (bubbling pattern)
document.getElementById('list').addEventListener('click', (e) => {
  if (e.target.matches('li')) {
    console.log('Item clicked:', e.target.textContent);
  }
});`,
    technology: 'javascript',
    category: 'DOM & Events',
    difficulty: 'hard',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'js-19',
    question: 'What is event delegation?',
    answer: 'Event delegation attaches ONE handler to a parent instead of many to children. Uses bubbling to catch child events. More efficient and handles dynamic elements.',
    codeExample: `// ❌ Inefficient - handler per item
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', handleClick);
});

// ✅ Event delegation - one handler
document.getElementById('list').addEventListener('click', (e) => {
  // Check if clicked element matches
  if (e.target.classList.contains('item')) {
    handleClick(e);
  }
  
  // Or use closest() for nested elements
  const item = e.target.closest('.item');
  if (item) {
    handleClick(item);
  }
});

// Benefits:
// - Works with dynamic elements added later
// - Less memory (one handler vs many)
// - Simpler cleanup`,
    technology: 'javascript',
    category: 'DOM & Events',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'js-20',
    question: 'What is debouncing and throttling?',
    answer: 'Debounce: delays execution until pause in calls (search input). Throttle: limits execution to once per time period (scroll handler). Both improve performance.',
    codeExample: `// DEBOUNCE - wait until pause
function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
const debouncedSearch = debounce(search, 300);

// THROTTLE - once per period
function throttle(fn, limit) {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn(...args);
    }
  };
}
const throttledScroll = throttle(onScroll, 100);`,
    technology: 'javascript',
    category: 'Performance',
    difficulty: 'hard',
    timesCorrect: 0,
    timesIncorrect: 0
  }
];
