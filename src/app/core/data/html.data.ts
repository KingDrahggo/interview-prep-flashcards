import { Flashcard } from '../models/flashcard.model';

export const HTML_CARDS: Flashcard[] = [
  // ═══════════════════════════════════════════════════════
  // SEMANTIC HTML
  // ═══════════════════════════════════════════════════════
  {
    id: 'html-1',
    question: 'What is semantic HTML and why is it important?',
    answer: 'Semantic HTML uses elements that convey meaning (header, nav, article) instead of generic divs. Benefits: accessibility (screen readers), SEO, maintainability, readability.',
    codeExample: `<!-- ❌ Non-semantic -->
<div class="header">
  <div class="nav">...</div>
</div>
<div class="main">
  <div class="article">...</div>
</div>

<!-- ✅ Semantic -->
<header>
  <nav>...</nav>
</header>
<main>
  <article>
    <h1>Article Title</h1>
    <section>...</section>
  </article>
  <aside>Sidebar</aside>
</main>
<footer>...</footer>`,
    technology: 'html',
    category: 'Semantic HTML',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'html-2',
    question: 'What are the main semantic HTML5 elements?',
    answer: 'header: introductory content. nav: navigation. main: primary content. article: self-contained content. section: thematic grouping. aside: tangential content. footer: closing content.',
    codeExample: `<header>Logo and navigation</header>

<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>

<main>
  <article>
    <h1>Blog Post Title</h1>
    <section>Section 1</section>
    <section>Section 2</section>
  </article>
  
  <aside>Related posts, ads</aside>
</main>

<footer>Copyright © 2024</footer>`,
    technology: 'html',
    category: 'Semantic HTML',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // ACCESSIBILITY
  // ═══════════════════════════════════════════════════════
  {
    id: 'html-3',
    question: 'What are ARIA roles and attributes?',
    answer: 'ARIA (Accessible Rich Internet Applications) provides accessibility info for dynamic content. Use when HTML semantics aren\'t enough. Prefer native HTML elements when possible.',
    codeExample: `<!-- Common ARIA attributes -->
<button aria-label="Close dialog" aria-pressed="false">X</button>

<div role="alert">Form submitted successfully!</div>

<input aria-describedby="hint" />
<span id="hint">Enter email format</span>

<!-- Live regions - announce changes -->
<div aria-live="polite">Loading...</div>

<!-- Navigation landmark -->
<nav aria-label="Main navigation">...</nav>

<!-- Prefer native HTML! -->
<!-- ❌ --> <div role="button">Click</div>
<!-- ✅ --> <button>Click</button>`,
    technology: 'html',
    category: 'Accessibility',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'html-4',
    question: 'How do you make images accessible?',
    answer: 'Use alt text for meaningful images (describe content). Use alt="" for decorative images (empty = ignored by screen readers). Use figcaption for complex images.',
    codeExample: `<!-- Meaningful image - describe it -->
<img src="chart.png" alt="Bar chart showing sales increased 50% in Q4">

<!-- Decorative image - empty alt -->
<img src="decorative-border.png" alt="">

<!-- Complex image with caption -->
<figure>
  <img src="diagram.png" alt="System architecture overview">
  <figcaption>
    Figure 1: The microservices architecture showing 
    communication between API Gateway, Auth, and Database services.
  </figcaption>
</figure>

<!-- Icon with text - hide redundant image -->
<button>
  <img src="save-icon.svg" alt="">
  Save Document
</button>`,
    technology: 'html',
    category: 'Accessibility',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'html-5',
    question: 'What are the best practices for accessible forms?',
    answer: 'Use label elements linked to inputs. Group related fields with fieldset/legend. Provide error messages. Use proper input types. Add aria-describedby for hints.',
    codeExample: `<form>
  <!-- Always link label to input -->
  <label for="email">Email *</label>
  <input 
    type="email" 
    id="email" 
    required
    aria-describedby="email-hint email-error"
  >
  <span id="email-hint">We'll never share your email</span>
  <span id="email-error" role="alert"></span>
  
  <!-- Group related fields -->
  <fieldset>
    <legend>Shipping Address</legend>
    <label for="street">Street</label>
    <input type="text" id="street">
    
    <label for="city">City</label>
    <input type="text" id="city">
  </fieldset>
  
  <button type="submit">Submit</button>
</form>`,
    technology: 'html',
    category: 'Accessibility',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // FORMS
  // ═══════════════════════════════════════════════════════
  {
    id: 'html-6',
    question: 'What are the HTML5 input types?',
    answer: 'HTML5 added: email, url, tel, number, range, date, time, datetime-local, month, week, color, search. They provide validation and mobile keyboard optimization.',
    codeExample: `<!-- Text variations -->
<input type="email" placeholder="user@example.com">
<input type="url" placeholder="https://...">
<input type="tel" placeholder="555-1234">
<input type="search" placeholder="Search...">

<!-- Numbers -->
<input type="number" min="0" max="100" step="5">
<input type="range" min="0" max="100">

<!-- Date/Time -->
<input type="date">           <!-- Date picker -->
<input type="time">           <!-- Time picker -->
<input type="datetime-local"> <!-- Date + Time -->
<input type="month">          <!-- Month picker -->

<!-- Other -->
<input type="color">          <!-- Color picker -->
<input type="file" accept=".pdf,.doc" multiple>`,
    technology: 'html',
    category: 'Forms',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'html-7',
    question: 'What HTML5 form validation attributes are available?',
    answer: 'required: must have value. pattern: regex match. min/max: number range. minlength/maxlength: text length. step: number increment. type: format validation (email, url).',
    codeExample: `<form>
  <!-- Required field -->
  <input type="text" required>
  
  <!-- Pattern (regex) -->
  <input 
    type="text" 
    pattern="[A-Za-z]{3,}" 
    title="At least 3 letters"
  >
  
  <!-- Length constraints -->
  <input type="text" minlength="2" maxlength="50">
  
  <!-- Number constraints -->
  <input type="number" min="1" max="100" step="1">
  
  <!-- Built-in type validation -->
  <input type="email">  <!-- Must be valid email -->
  <input type="url">    <!-- Must be valid URL -->
  
  <!-- Custom validation message -->
  <input 
    type="text" 
    oninvalid="this.setCustomValidity('Please enter a name')"
    oninput="this.setCustomValidity('')"
  >
</form>`,
    technology: 'html',
    category: 'Forms',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // META & SEO
  // ═══════════════════════════════════════════════════════
  {
    id: 'html-8',
    question: 'What are essential meta tags for SEO?',
    answer: 'title, meta description, viewport (mobile), canonical URL, Open Graph (social), robots (crawling). Place in <head> element.',
    codeExample: `<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- SEO -->
  <title>Page Title | Site Name</title>
  <meta name="description" content="Brief page description (150-160 chars)">
  <meta name="keywords" content="keyword1, keyword2">
  <link rel="canonical" href="https://example.com/page">
  
  <!-- Robots -->
  <meta name="robots" content="index, follow">
  
  <!-- Open Graph (Facebook/LinkedIn) -->
  <meta property="og:title" content="Page Title">
  <meta property="og:description" content="Description">
  <meta property="og:image" content="https://example.com/image.jpg">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
</head>`,
    technology: 'html',
    category: 'SEO',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'html-9',
    question: 'What is the viewport meta tag?',
    answer: 'Viewport controls how the page is displayed on mobile. width=device-width matches screen width. initial-scale=1.0 sets zoom level. Essential for responsive design.',
    codeExample: `<!-- Essential for responsive design -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Options explained -->
<meta name="viewport" content="
  width=device-width,     /* Match device width */
  initial-scale=1.0,      /* Initial zoom level */
  maximum-scale=1.0,      /* Prevent zoom (avoid for accessibility) */
  user-scalable=no        /* Disable pinch zoom (avoid!) */
">

<!-- Without viewport: page appears zoomed out on mobile -->
<!-- With viewport: page renders at proper mobile width -->

<!-- Best practice -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">`,
    technology: 'html',
    category: 'Meta',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // PERFORMANCE
  // ═══════════════════════════════════════════════════════
  {
    id: 'html-10',
    question: 'What are async and defer attributes for scripts?',
    answer: 'async: download parallel, execute immediately (order not guaranteed). defer: download parallel, execute after HTML parsed (order preserved). Both prevent blocking.',
    codeExample: `<!-- Default: blocks HTML parsing -->
<script src="app.js"></script>

<!-- Async: download parallel, execute when ready -->
<script async src="analytics.js"></script>
<!-- Good for: independent scripts (analytics, ads) -->
<!-- Execution order: NOT guaranteed -->

<!-- Defer: download parallel, execute after parsing -->
<script defer src="app.js"></script>
<!-- Good for: scripts that need DOM, order-dependent -->
<!-- Execution order: guaranteed (script order) -->

<!-- Recommended approach -->
<head>
  <script defer src="vendor.js"></script>
  <script defer src="app.js"></script>
</head>

<!-- Module scripts are deferred by default -->
<script type="module" src="app.js"></script>`,
    technology: 'html',
    category: 'Performance',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'html-11',
    question: 'How do you optimize images in HTML?',
    answer: 'Use srcset for responsive images, loading="lazy" for lazy loading, width/height to prevent layout shift, picture element for art direction, modern formats (WebP, AVIF).',
    codeExample: `<!-- Lazy loading -->
<img src="image.jpg" loading="lazy" alt="...">

<!-- Prevent layout shift - specify dimensions -->
<img src="image.jpg" width="800" height="600" alt="...">

<!-- Responsive images with srcset -->
<img 
  src="image-400.jpg"
  srcset="image-400.jpg 400w,
          image-800.jpg 800w,
          image-1200.jpg 1200w"
  sizes="(max-width: 600px) 400px, 800px"
  alt="Responsive image"
>

<!-- Different formats with picture -->
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Fallback">
</picture>`,
    technology: 'html',
    category: 'Performance',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'html-12',
    question: 'What is the difference between link preload and prefetch?',
    answer: 'preload: high priority, needed for current page (fonts, critical CSS). prefetch: low priority, needed for future navigation. preconnect: establish early connection.',
    codeExample: `<head>
  <!-- Preconnect - early connection to origins -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://api.example.com">
  
  <!-- Preload - critical resources for THIS page -->
  <link rel="preload" href="critical.css" as="style">
  <link rel="preload" href="hero.jpg" as="image">
  <link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
  
  <!-- Prefetch - resources for NEXT navigation -->
  <link rel="prefetch" href="next-page.html">
  <link rel="prefetch" href="next-page-data.json" as="fetch">
  
  <!-- DNS Prefetch - resolve domain early -->
  <link rel="dns-prefetch" href="https://analytics.example.com">
</head>`,
    technology: 'html',
    category: 'Performance',
    difficulty: 'hard',
    timesCorrect: 0,
    timesIncorrect: 0
  }
];
