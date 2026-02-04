import { Flashcard } from '../models/flashcard.model';

export const CSS_CARDS: Flashcard[] = [
  // ═══════════════════════════════════════════════════════
  // FLEXBOX
  // ═══════════════════════════════════════════════════════
  {
    id: 'css-1',
    question: 'Explain the Flexbox model and its main properties.',
    answer: 'Flexbox is a 1D layout model. Container: display:flex, flex-direction, justify-content (main axis), align-items (cross axis). Items: flex-grow, flex-shrink, flex-basis.',
    codeExample: `.container {
  display: flex;
  flex-direction: row;        /* row | column */
  justify-content: center;    /* Main axis alignment */
  align-items: center;        /* Cross axis alignment */
  gap: 1rem;                  /* Space between items */
}

.item {
  flex: 1;                    /* grow: 1, shrink: 1, basis: 0 */
  /* OR */
  flex-grow: 1;               /* Take available space */
  flex-shrink: 0;             /* Don't shrink */
  flex-basis: 200px;          /* Starting size */
}`,
    technology: 'css',
    category: 'Flexbox',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'css-2',
    question: 'What is the difference between justify-content and align-items?',
    answer: 'justify-content aligns items along the MAIN axis (horizontal for row). align-items aligns along the CROSS axis (vertical for row). Direction depends on flex-direction.',
    codeExample: `.container {
  display: flex;
  flex-direction: row;
  
  /* Main axis (horizontal for row) */
  justify-content: flex-start | center | flex-end
                 | space-between | space-around | space-evenly;
  
  /* Cross axis (vertical for row) */
  align-items: stretch | flex-start | center | flex-end | baseline;
}

/* For column direction, axes are swapped! */
.vertical {
  flex-direction: column;
  justify-content: center;    /* Now vertical */
  align-items: center;        /* Now horizontal */
}`,
    technology: 'css',
    category: 'Flexbox',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // CSS GRID
  // ═══════════════════════════════════════════════════════
  {
    id: 'css-3',
    question: 'Explain CSS Grid and its main properties.',
    answer: 'Grid is a 2D layout system. Define rows/columns with grid-template. Place items with grid-area, grid-column, grid-row. gap for spacing.',
    codeExample: `.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);  /* 3 equal columns */
  grid-template-rows: auto 1fr auto;      /* header, main, footer */
  gap: 1rem;
}

.item {
  grid-column: 1 / 3;         /* Span col 1 to 3 */
  grid-row: 1 / 2;            /* Row 1 only */
}

/* Named areas */
.container {
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
}
.header { grid-area: header; }`,
    technology: 'css',
    category: 'Grid',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'css-4',
    question: 'When should you use Grid vs Flexbox?',
    answer: 'Flexbox: 1D layouts (nav bars, centering, distributing space in one direction). Grid: 2D layouts (page layouts, complex grids, overlapping elements). Can use both together!',
    codeExample: `/* FLEXBOX - 1D: Navigation bar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* GRID - 2D: Page layout */
.page {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 250px 1fr;
}

/* COMBINED - Grid page, Flex components */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
.card {
  display: flex;
  flex-direction: column;
}`,
    technology: 'css',
    category: 'Grid',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // POSITIONING
  // ═══════════════════════════════════════════════════════
  {
    id: 'css-5',
    question: 'Explain the different CSS position values.',
    answer: 'static: default, normal flow. relative: offset from normal position. absolute: removed from flow, relative to positioned ancestor. fixed: relative to viewport. sticky: hybrid of relative and fixed.',
    codeExample: `/* Static (default) - normal document flow */
.static { position: static; }

/* Relative - offset from normal position */
.relative { position: relative; top: 10px; left: 20px; }

/* Absolute - relative to positioned ancestor */
.parent { position: relative; }
.absolute { position: absolute; top: 0; right: 0; }

/* Fixed - stays in viewport */
.fixed { position: fixed; bottom: 20px; right: 20px; }

/* Sticky - fixed when scrolled past threshold */
.sticky-header {
  position: sticky;
  top: 0;
  background: white;
}`,
    technology: 'css',
    category: 'Positioning',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'css-6',
    question: 'What is the CSS box model?',
    answer: 'Every element is a box with: content (actual content), padding (inner spacing), border, margin (outer spacing). box-sizing: border-box includes padding/border in width.',
    codeExample: `/* Default box model */
.box {
  width: 200px;
  padding: 20px;
  border: 5px solid;
  margin: 10px;
  /* Actual width: 200 + 40 + 10 = 250px */
}

/* Border-box (recommended!) */
* {
  box-sizing: border-box;
}
.box {
  width: 200px;
  padding: 20px;
  border: 5px solid;
  /* Actual width: 200px (includes padding + border) */
}

/* Margin shortcuts */
margin: 10px;              /* All sides */
margin: 10px 20px;         /* Top/bottom, left/right */
margin: 10px 20px 30px 40px; /* Top, right, bottom, left */`,
    technology: 'css',
    category: 'Box Model',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // RESPONSIVE DESIGN
  // ═══════════════════════════════════════════════════════
  {
    id: 'css-7',
    question: 'How do media queries work?',
    answer: 'Media queries apply styles based on conditions (viewport width, orientation, etc.). Mobile-first: start with mobile, add min-width queries. Desktop-first: start with desktop, add max-width queries.',
    codeExample: `/* MOBILE FIRST (recommended) */
.container {
  width: 100%;              /* Mobile default */
  padding: 1rem;
}

@media (min-width: 768px) {  /* Tablet and up */
  .container {
    max-width: 720px;
    margin: 0 auto;
  }
}

@media (min-width: 1024px) { /* Desktop */
  .container {
    max-width: 960px;
  }
}

/* Common breakpoints */
/* 480px - Mobile */
/* 768px - Tablet */
/* 1024px - Desktop */
/* 1280px - Large Desktop */`,
    technology: 'css',
    category: 'Responsive',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'css-8',
    question: 'What are CSS units and when to use each?',
    answer: 'px: fixed size. rem: relative to root font-size (best for responsive). em: relative to parent font-size. %: relative to parent. vh/vw: viewport height/width.',
    codeExample: `/* px - Fixed, not accessible for font-size */
.fixed { width: 200px; }

/* rem - Relative to :root font-size (accessibility!) */
:root { font-size: 16px; }
.responsive { font-size: 1rem; }  /* = 16px */

/* em - Relative to parent (compounds!) */
.parent { font-size: 20px; }
.child { font-size: 1.5em; }  /* = 30px */

/* % - Relative to parent */
.half-width { width: 50%; }

/* Viewport units */
.full-height { height: 100vh; }
.half-viewport { width: 50vw; }

/* Use rem for font-size, px/rem for spacing */`,
    technology: 'css',
    category: 'Units',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // TAILWIND CSS
  // ═══════════════════════════════════════════════════════
  {
    id: 'css-9',
    question: 'What is Tailwind CSS and its benefits?',
    answer: 'Tailwind is a utility-first CSS framework. Benefits: rapid development, consistent design, small bundle (purges unused), no context switching, highly customizable.',
    codeExample: `<!-- Traditional CSS -->
<div class="card">...</div>
.card { display: flex; padding: 1rem; background: blue; }

<!-- Tailwind CSS -->
<div class="flex p-4 bg-blue-500 rounded-lg shadow-md">
  <h2 class="text-xl font-bold text-white">Title</h2>
  <p class="text-gray-200">Content</p>
</div>

<!-- Responsive -->
<div class="w-full md:w-1/2 lg:w-1/3">...</div>

<!-- States -->
<button class="bg-blue-500 hover:bg-blue-700 active:scale-95">
  Click me
</button>`,
    technology: 'css',
    category: 'Tailwind',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'css-10',
    question: 'What are Tailwind responsive prefixes?',
    answer: 'Tailwind uses mobile-first breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px). Prefix any utility to apply at that breakpoint and up.',
    codeExample: `<!-- Mobile first: default applies to all, prefixes override -->
<div class="
  w-full          /* Mobile: full width */
  md:w-1/2        /* Tablet: half width */
  lg:w-1/3        /* Desktop: third width */
">

<!-- Responsive grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <div>Item</div>
</div>

<!-- Responsive visibility -->
<div class="hidden md:block">Only tablet+</div>
<div class="block md:hidden">Only mobile</div>

<!-- Responsive text -->
<h1 class="text-2xl md:text-4xl lg:text-6xl">Responsive Heading</h1>`,
    technology: 'css',
    category: 'Tailwind',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'css-11',
    question: 'How do you handle dark mode in Tailwind?',
    answer: 'Use dark: prefix for dark mode styles. Enable in config: darkMode: "class" (toggle) or "media" (system preference). Add "dark" class to html/body to activate.',
    codeExample: `<!-- tailwind.config.js -->
module.exports = {
  darkMode: 'class', // or 'media'
}

<!-- HTML - toggle dark class on html element -->
<html class="dark">
  <body class="bg-white dark:bg-gray-900">
    <div class="text-gray-900 dark:text-white">
      <h1 class="text-black dark:text-white">Title</h1>
      <p class="text-gray-600 dark:text-gray-300">Content</p>
    </div>
  </body>
</html>

<!-- Toggle with JavaScript -->
document.documentElement.classList.toggle('dark');`,
    technology: 'css',
    category: 'Tailwind',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // ADVANCED CSS
  // ═══════════════════════════════════════════════════════
  {
    id: 'css-12',
    question: 'What is CSS specificity?',
    answer: 'Specificity determines which styles apply. Order (highest to lowest): !important > inline > ID > class/attribute/pseudo-class > element > *. Same specificity: last wins.',
    codeExample: `/* Specificity scoring: (ID, Class, Element) */

*                    { }  /* (0,0,0) */
div                  { }  /* (0,0,1) */
div p                { }  /* (0,0,2) */
.class               { }  /* (0,1,0) */
div.class            { }  /* (0,1,1) */
#id                  { }  /* (1,0,0) */
#id .class           { }  /* (1,1,0) */
style="..."              /* Beats all selectors */
!important               /* Beats everything (avoid!) */

/* Example: Which wins? */
#nav .link { color: blue; }  /* (1,1,0) - WINS */
.nav-link { color: red; }    /* (0,1,0) */`,
    technology: 'css',
    category: 'Specificity',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'css-13',
    question: 'How do CSS Variables (Custom Properties) work?',
    answer: 'CSS variables store reusable values. Define with --name, use with var(). Can be inherited, scoped, and changed with JS. Great for theming.',
    codeExample: `:root {
  --primary-color: #3490dc;
  --spacing-unit: 8px;
  --font-size-base: 16px;
}

.button {
  background: var(--primary-color);
  padding: calc(var(--spacing-unit) * 2);
  font-size: var(--font-size-base);
}

/* Fallback value */
.box {
  color: var(--text-color, #333);
}

/* Theming */
.dark-theme {
  --primary-color: #60a5fa;
  --bg-color: #1a1a1a;
}

/* Change with JavaScript */
document.documentElement.style.setProperty('--primary-color', 'red');`,
    technology: 'css',
    category: 'Variables',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'css-14',
    question: 'What are CSS pseudo-classes and pseudo-elements?',
    answer: 'Pseudo-classes (:) select based on state (hover, focus, nth-child). Pseudo-elements (::) style specific parts (before, after, first-letter).',
    codeExample: `/* PSEUDO-CLASSES - state/position */
a:hover { color: red; }
a:active { color: darkred; }
input:focus { border-color: blue; }
input:valid { border-color: green; }
li:nth-child(odd) { background: #f0f0f0; }
li:first-child { font-weight: bold; }
li:last-of-type { margin-bottom: 0; }

/* PSEUDO-ELEMENTS - create/style parts */
p::first-letter { font-size: 2em; }
p::first-line { font-weight: bold; }

.required::after {
  content: '*';
  color: red;
}

.quote::before {
  content: '"';
}`,
    technology: 'css',
    category: 'Selectors',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'css-15',
    question: 'How do CSS transitions and animations differ?',
    answer: 'Transitions: animate between two states on trigger (hover). Animations: keyframe-based, can loop, more control. Use transitions for simple effects, animations for complex sequences.',
    codeExample: `/* TRANSITIONS - triggered by state change */
.button {
  background: blue;
  transition: background 0.3s ease, transform 0.2s;
}
.button:hover {
  background: darkblue;
  transform: scale(1.05);
}

/* ANIMATIONS - keyframe-based */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.card {
  animation: fadeIn 0.5s ease-out;
  /* animation: name duration timing-function delay iteration-count direction */
  animation: fadeIn 0.5s ease-out 0s infinite alternate;
}`,
    technology: 'css',
    category: 'Animations',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  }
];
