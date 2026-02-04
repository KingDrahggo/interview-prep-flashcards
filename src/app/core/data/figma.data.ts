import { Flashcard } from '../models/flashcard.model';

export const FIGMA_CARDS: Flashcard[] = [
  {
    id: 'figma-1',
    question: 'What are Components in Figma and why use them?',
    answer: 'Components are reusable design elements. Main component is the source, instances inherit changes. Use for buttons, cards, icons. Enables design systems and consistency.',
    codeExample: `// Component Structure
Main Component (purple diamond)
├── Instance 1 (inherits changes)
├── Instance 2 (can override)
└── Instance 3

// Best Practices
1. Name with "/" for organization: Button/Primary
2. Use variants for states: Default, Hover, Active
3. Add descriptions for team
4. Publish to team library

// Shortcuts
Ctrl+Alt+K - Create component
Alt+drag - Duplicate instance
Ctrl+Shift+O - Detach instance`,
    technology: 'figma',
    category: 'Components',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'figma-2',
    question: 'What are Variants and when to use them?',
    answer: 'Variants combine related component states into one. Properties: Type, Size, State. Swap between states easily. Perfect for buttons, inputs, cards with multiple states.',
    codeExample: `// Button Variant Structure
Button (Component Set)
├── Type: Primary | Secondary | Ghost
├── Size: Small | Medium | Large  
└── State: Default | Hover | Active | Disabled

// Usage in prototype
On Hover → Change to State=Hover
On Press → Change to State=Active

// Naming Convention
Property=Value, Property=Value
"Type=Primary, Size=Medium, State=Default"

// Boolean properties
icon=true, icon=false
loading=true, loading=false`,
    technology: 'figma',
    category: 'Components',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'figma-3',
    question: 'What is Auto Layout and how does it work?',
    answer: 'Auto Layout creates responsive frames. Items flow horizontally/vertically. Controls padding, spacing, alignment. Resizes with content. Essential for responsive design.',
    codeExample: `// Auto Layout Properties
Direction: Horizontal | Vertical
Gap: Space between items (16px)
Padding: Inner spacing (24px)
Alignment: Start | Center | End | Stretch

// Resizing
Hug: Shrink to fit content
Fill: Expand to fill parent
Fixed: Specific size

// Practical Example
Card (Auto Layout: Vertical)
├── Image (Fill width, Fixed height)
├── Content (Auto Layout: Vertical, Padding: 16)
│   ├── Title (Hug)
│   └── Description (Fill width)
└── Actions (Auto Layout: Horizontal, Gap: 8)
    ├── Button 1 (Hug)
    └── Button 2 (Hug)`,
    technology: 'figma',
    category: 'Layout',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'figma-4',
    question: 'What are Design Tokens and Styles in Figma?',
    answer: 'Styles are reusable color, text, and effect values. Variables (tokens) are more flexible with modes. Enable theming (light/dark), spacing scales, responsive values.',
    codeExample: `// Color Styles
Primary/500 - #667eea
Primary/400 - #818cf8
Neutral/100 - #f5f5f5

// Text Styles
Heading/H1 - Inter Bold 48px
Body/Regular - Inter Regular 16px
Caption - Inter Medium 12px

// Variables (Design Tokens)
colors/primary    Mode:Light=#667eea  Mode:Dark=#818cf8
spacing/md        16px
radius/lg         12px

// Usage Benefits
- Change once, update everywhere
- Theme switching with modes
- Dev handoff with token names
- Maintains consistency`,
    technology: 'figma',
    category: 'Systems',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'figma-5',
    question: 'How do you create interactive prototypes in Figma?',
    answer: 'Prototypes connect frames with interactions. Triggers: click, hover, drag. Actions: navigate, open overlay, scroll to. Smart Animate for smooth transitions.',
    codeExample: `// Interaction Structure
Trigger → Action → Destination

// Common Triggers
On Click - Button press
While Hovering - Hover states
On Drag - Carousels, sliders
After Delay - Auto-advance

// Actions
Navigate to - Go to frame
Open Overlay - Modal, dropdown
Swap with - Component state change
Scroll to - Anchor links

// Smart Animate
- Matches layers by name
- Animates position, size, opacity
- Create micro-interactions

// Prototype Settings
Device: iPhone 14, Desktop
Starting Frame: Home
Flows: Onboarding, Checkout`,
    technology: 'figma',
    category: 'Prototyping',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'figma-6',
    question: 'What are Figma Plugins and which are essential?',
    answer: 'Plugins extend Figma functionality. Popular: Unsplash (images), Iconify (icons), Lorem Ipsum, Contrast Checker. Run via Plugins menu or quick actions (Cmd+/).',
    codeExample: `// Essential Plugins

CONTENT
- Unsplash / Pexels - Stock photos
- Lorem Ipsum - Placeholder text
- Content Reel - Realistic data

ICONS & ASSETS
- Iconify - 100k+ icons
- Feather Icons - Clean icons
- Illustrations - Undraw, etc.

PRODUCTIVITY
- Rename It - Batch rename layers
- Clean Document - Remove unused
- Similayer - Select similar layers

ACCESSIBILITY
- Stark - Contrast checker
- A11y - Annotation
- Color Blind - Simulation

HANDOFF
- Tokens Studio - Design tokens
- Anima - Export to code`,
    technology: 'figma',
    category: 'Tools',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'figma-7',
    question: 'How do you organize files in Figma?',
    answer: 'Use Pages for sections (Designs, Components, Archive). Frames for screens. Sections to group frames. Naming conventions with "/" for nesting. Cover page for thumbnails.',
    codeExample: `// File Structure
📁 Project Name
├── 📄 Cover (thumbnail)
├── 📄 Design System
│   ├── Colors
│   ├── Typography
│   └── Components
├── 📄 Wireframes
├── 📄 Designs
│   ├── [Section] Onboarding
│   │   ├── Welcome
│   │   ├── Sign Up
│   │   └── Sign In
│   └── [Section] Dashboard
├── 📄 Prototypes
└── 📄 Archive

// Naming Conventions
Screens: "1.0 Home", "2.1 Profile/Edit"
Components: "Button/Primary/Large"
Layers: Descriptive (not "Frame 123")`,
    technology: 'figma',
    category: 'Workflow',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'figma-8',
    question: 'What is Dev Mode in Figma?',
    answer: 'Dev Mode shows specs, code snippets, and assets for developers. CSS, iOS, Android code. Inspect spacing, colors, typography. Ready for Handoff badge marks approved designs.',
    codeExample: `// Dev Mode Features

INSPECT
- Dimensions & spacing
- Color values (HEX, RGB, HSL)
- Typography specs
- CSS/Swift/XML snippets

CODE SNIPPETS
// CSS Output
.button {
  display: flex;
  padding: 12px 24px;
  background: #667eea;
  border-radius: 8px;
  font-family: 'Inter';
  font-size: 16px;
}

ASSETS
- Export SVG, PNG, PDF
- Multiple resolutions (@2x, @3x)
- Direct links to assets

COMPARE
- Show changes between versions
- Highlight what changed`,
    technology: 'figma',
    category: 'Handoff',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'figma-9',
    question: 'How do you collaborate in Figma?',
    answer: 'Real-time multiplayer editing. Comments for feedback. Share links with view/edit access. Version history to restore. Branching for exploration. FigJam for whiteboarding.',
    codeExample: `// Collaboration Features

SHARING
- View only: Stakeholders
- Edit: Team members
- Embed: Documentation

COMMENTS
- Click to add comment
- @mention teammates
- Mark as resolved
- Filter by status

VERSION HISTORY
- Auto-saves versions
- Name important versions
- Restore any point

BRANCHING
- Create branch for experiments
- Merge back to main
- Compare differences

FIGJAM
- Brainstorming sessions
- User flows
- Wireframe workshops`,
    technology: 'figma',
    category: 'Workflow',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'figma-10',
    question: 'What are best practices for responsive design in Figma?',
    answer: 'Use constraints for fixed/stretch elements. Auto Layout for flex behavior. Create frames for common breakpoints. Variables for responsive spacing. Test with resize.',
    codeExample: `// Breakpoints
Mobile: 375px (iPhone)
Tablet: 768px (iPad)
Desktop: 1440px
Wide: 1920px

// Constraints
Left/Right: Fixed position
Left+Right: Stretch width
Center: Stay centered
Scale: Proportional resize

// Responsive Patterns

Navigation:
Mobile → Hamburger menu
Desktop → Full nav bar

Grid:
Mobile → 1 column
Tablet → 2 columns
Desktop → 4 columns

// Auto Layout Responsive
Parent: Fill width
Children: 
  Fixed items - specific width
  Flex items - fill container`,
    technology: 'figma',
    category: 'Layout',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  }
];
