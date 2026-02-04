import { Flashcard } from '../models/flashcard.model';

export const UIUX_CARDS: Flashcard[] = [
  {
    id: 'uiux-1',
    question: 'What is the difference between UI and UX design?',
    answer: 'UX (User Experience) focuses on user journey, usability, research. UI (User Interface) focuses on visual design, interactions, aesthetics. UX is the feel, UI is the look. Both work together.',
    codeExample: `// UX Design Focus
- User Research & Personas
- Information Architecture
- User Flows & Journey Maps
- Wireframes & Prototypes
- Usability Testing
- Problem Solving

// UI Design Focus
- Visual Design & Branding
- Color, Typography, Icons
- Component Design
- Micro-interactions
- Responsive Layouts
- Design Systems

// Both Together
UX: "Users need to complete checkout in 3 steps"
UI: "Use progress bar, clear CTAs, trust badges"`,
    technology: 'uiux',
    category: 'Fundamentals',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'uiux-2',
    question: 'What are the key UX design principles?',
    answer: 'Core principles: Usability, Accessibility, Consistency, Feedback, Hierarchy, Simplicity. Design for users, not yourself. Always validate with user testing.',
    codeExample: `// Key UX Principles

1. USABILITY
   - Easy to learn and use
   - Efficient task completion
   - Error prevention

2. ACCESSIBILITY
   - WCAG compliance
   - Screen reader support
   - Color contrast

3. CONSISTENCY  
   - Same patterns throughout
   - Follow platform conventions
   - Predictable behavior

4. FEEDBACK
   - Loading states
   - Success/error messages
   - Progress indicators

5. HIERARCHY
   - Visual priority
   - Clear information structure
   - Guide user attention

6. SIMPLICITY
   - Remove unnecessary elements
   - Progressive disclosure
   - Don't make users think`,
    technology: 'uiux',
    category: 'Principles',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'uiux-3',
    question: 'What is a Design System?',
    answer: 'Design System is a collection of reusable components, patterns, and guidelines. Includes tokens (colors, spacing), components, documentation. Ensures consistency, speeds development.',
    codeExample: `// Design System Structure

1. FOUNDATIONS
   - Colors (primary, semantic, neutral)
   - Typography (scale, weights)
   - Spacing (4px base unit)
   - Icons & Illustrations
   - Grid & Layout

2. COMPONENTS
   - Buttons, Inputs, Cards
   - Navigation, Modals
   - Tables, Lists
   - Each with states & variants

3. PATTERNS
   - Forms & Validation
   - Empty States
   - Error Handling
   - Loading States

4. DOCUMENTATION
   - Usage guidelines
   - Do's and Don'ts
   - Code examples
   - Accessibility notes

// Examples: Material Design, Carbon, Polaris`,
    technology: 'uiux',
    category: 'Systems',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'uiux-4',
    question: 'What is Visual Hierarchy and how do you create it?',
    answer: 'Visual hierarchy guides users through content by importance. Created through: Size, Color, Contrast, Spacing, Position, Typography weight. F-pattern and Z-pattern for reading.',
    codeExample: `// Creating Hierarchy

SIZE
- Larger = More important
- Headlines > Body > Captions

COLOR & CONTRAST
- High contrast for primary actions
- Muted for secondary content
- Color to draw attention

SPACING
- Whitespace creates grouping
- More space = more importance
- Proximity groups related items

TYPOGRAPHY
- Weight: Bold for emphasis
- Style: Italics for quotes
- Case: UPPERCASE for labels

POSITION
- Top-left in Western cultures
- Above fold = priority
- F-pattern for content pages
- Z-pattern for landing pages

// Example: CTA Button
Primary: Large, high contrast, prominent
Secondary: Smaller, outlined, subtle`,
    technology: 'uiux',
    category: 'Visual',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'uiux-5',
    question: 'How do you conduct user research?',
    answer: 'Methods: User interviews, surveys, usability testing, analytics, A/B testing, card sorting. Qualitative for "why", quantitative for "what". Always define research questions first.',
    codeExample: `// Research Methods

QUALITATIVE (Why)
├── User Interviews
│   - 1-on-1 conversations
│   - Open-ended questions
├── Usability Testing
│   - Task completion
│   - Think-aloud protocol
├── Contextual Inquiry
│   - Observe in environment
└── Focus Groups
    - Group discussions

QUANTITATIVE (What)
├── Surveys
│   - Large sample size
│   - Likert scales
├── Analytics
│   - Heatmaps, funnels
│   - User flows
├── A/B Testing
│   - Compare variations
└── Card Sorting
    - Information architecture

// Research Process
1. Define questions
2. Choose method
3. Recruit participants
4. Conduct research
5. Analyze & synthesize
6. Share findings`,
    technology: 'uiux',
    category: 'Research',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'uiux-6',
    question: 'What are User Personas and Journey Maps?',
    answer: 'Personas are fictional users based on research. Journey Maps visualize user experience over time. Both help team empathize with users and identify pain points and opportunities.',
    codeExample: `// User Persona

Name: Sarah, 32
Role: Marketing Manager
Goals: 
- Save time on reports
- Impress stakeholders
Pain Points:
- Too many tools
- Manual data entry
Tech Comfort: High
Quote: "I need data fast, not perfect"

// Journey Map

STAGE     | Awareness | Consider | Purchase | Use
----------|-----------|----------|----------|--------
Actions   | Google    | Compare  | Signup   | Onboard
          | search    | features | payment  | explore
----------|-----------|----------|----------|--------
Thoughts  | "Need a   | "Which   | "Is it   | "How do
          | solution" | is best?"| secure?" | I start?"
----------|-----------|----------|----------|--------
Emotions  | 😟        | 🤔       | 😰       | 😊
----------|-----------|----------|----------|--------
Opportun. | SEO, Ads  | Compare  | Trust    | Tutorial
          |           | page     | badges   | wizard`,
    technology: 'uiux',
    category: 'Research',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'uiux-7',
    question: 'What is Accessibility (A11y) in design?',
    answer: 'Accessibility ensures products work for everyone, including disabilities. WCAG guidelines: Perceivable, Operable, Understandable, Robust. Legal requirement in many regions.',
    codeExample: `// WCAG Principles (POUR)

PERCEIVABLE
- Alt text for images
- Captions for video
- Sufficient color contrast (4.5:1)
- Don't rely on color alone

OPERABLE
- Keyboard navigation
- Skip links
- No seizure triggers
- Enough time to interact

UNDERSTANDABLE
- Clear language
- Consistent navigation
- Error identification
- Labels for inputs

ROBUST
- Valid HTML
- ARIA labels
- Works with assistive tech

// Quick Wins
- Color contrast: 4.5:1 minimum
- Focus states visible
- Form labels connected
- Logical heading order (h1→h2→h3)
- Touch targets: 44x44px minimum`,
    technology: 'uiux',
    category: 'Accessibility',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'uiux-8',
    question: 'What is Gestalt Psychology in design?',
    answer: 'Gestalt principles explain how humans perceive visual groups. Key: Proximity, Similarity, Closure, Continuity, Figure-Ground. Use to create intuitive layouts.',
    codeExample: `// Gestalt Principles

PROXIMITY
- Close items = related
- Use spacing to group
[A B C]   [D E F]  ← Two groups

SIMILARITY
- Similar items = related
- Color, shape, size
●●●  ■■■  ← Two groups by shape

CLOSURE
- Brain completes incomplete shapes
- [ _ _ _ ] seen as box
- Logo design technique

CONTINUITY
- Eyes follow lines/curves
- Guide through content
- Progress indicators

FIGURE-GROUND
- Distinguish foreground/background
- Cards on background
- Modal overlays

COMMON REGION
- Shared container = group
- Cards, sections
- Bordered areas`,
    technology: 'uiux',
    category: 'Principles',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'uiux-9',
    question: 'How do you design effective forms?',
    answer: 'Forms should be simple, clear, forgiving. Use labels, not just placeholders. Show validation inline. Group related fields. Minimize required fields. Enable autofill.',
    codeExample: `// Form Best Practices

LABELS
✅ Labels above inputs
✅ Always visible (not just placeholder)
✅ Required indicator (*)

LAYOUT
✅ Single column (faster)
✅ Group related fields
✅ Logical tab order
✅ Mobile-friendly inputs

VALIDATION
✅ Inline, real-time
✅ Specific error messages
✅ "Password needs 8+ characters"
❌ "Invalid input"

INPUT TYPES
✅ email, tel, number
✅ Appropriate keyboard
✅ Enable autocomplete

BUTTONS
✅ Clear primary action
✅ "Create Account" not "Submit"
✅ Disable until valid
✅ Loading state on submit

REDUCE FRICTION
✅ Optional fields optional
✅ Auto-format (phone, card)
✅ Remember values
✅ Social login options`,
    technology: 'uiux',
    category: 'Patterns',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'uiux-10',
    question: 'What is Mobile-First Design?',
    answer: 'Mobile-first starts design with smallest screen, then expands. Forces prioritization. Progressive enhancement. Avoids cramming desktop into mobile. Better performance.',
    codeExample: `// Mobile-First Approach

1. START SMALL
   - Design for 375px first
   - Force content prioritization
   - What's essential?

2. EXPAND UP
   375px → 768px → 1024px → 1440px
   
3. PROGRESSIVE ENHANCEMENT
   Mobile: Core features
   Tablet: + Additional features
   Desktop: + Enhanced layout

// Responsive Patterns

Navigation:
   Mobile: Hamburger menu
   Desktop: Full navigation

Content:
   Mobile: Stack vertically
   Desktop: Multi-column grid

Images:
   Mobile: Full width
   Desktop: Side-by-side

// Touch Considerations
- 44px minimum touch target
- Thumb-friendly zones
- Swipe gestures
- Bottom navigation`,
    technology: 'uiux',
    category: 'Responsive',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  }
];
