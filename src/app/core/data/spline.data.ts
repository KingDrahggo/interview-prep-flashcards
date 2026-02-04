import { Flashcard } from '../models/flashcard.model';

export const SPLINE_CARDS: Flashcard[] = [
  {
    id: 'spline-1',
    question: 'What is Spline and what is it used for?',
    answer: 'Spline is a web-based 3D design tool. Create interactive 3D experiences for web. No code needed. Export as React component, embed, or real-time viewer. Great for product landing pages.',
    codeExample: `// Spline Use Cases

1. Product Showcases
   - 3D product viewers
   - Interactive rotations
   - Color configurators

2. Landing Pages
   - Hero 3D elements
   - Scroll animations
   - Interactive backgrounds

3. UI Elements
   - 3D icons
   - Animated buttons
   - Loading screens

4. Games & Experiences
   - Simple web games
   - Interactive stories
   - VR/AR prototypes

// Export Options
- React/Vue/Next.js component (@splinetool/react)
- Vanilla JS
- Embeddable iframe
- Video/GIF export`,
    technology: 'spline',
    category: 'Overview',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'spline-2',
    question: 'What are the basic 3D primitives in Spline?',
    answer: 'Primitives: Cube, Sphere, Cylinder, Torus, Cone, Plane. Also parametric shapes, text, and SVG import. Combine with boolean operations. Start with primitives, then sculpt.',
    codeExample: `// Basic Shapes
Cube        - Box, base for buildings
Sphere      - Balls, planets
Cylinder    - Pillars, buttons
Torus       - Rings, donuts
Cone        - Arrows, trees
Plane       - Floors, cards

// Special Objects
Text 3D     - Extruded text
Parametric  - Adjustable shapes
Vector      - Import SVG, extrude

// Boolean Operations
Union       - Combine shapes
Subtract    - Cut away
Intersect   - Keep overlap

// Shortcuts
S - Scale
R - Rotate
G - Move
F - Focus on selection
1/2/3 - Front/Side/Top view`,
    technology: 'spline',
    category: 'Modeling',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'spline-3',
    question: 'How do materials and lighting work in Spline?',
    answer: 'Materials control surface appearance: color, metalness, roughness. Lighting: ambient light, directional, point, spotlight. Use HDRI for realistic reflections. Environment affects mood.',
    codeExample: `// Material Properties
Color/Albedo   - Base color
Metalness      - 0=Plastic, 1=Metal
Roughness      - 0=Glossy, 1=Matte
Opacity        - Transparency
Emissive       - Self-glow

// Material Types
Standard       - Most common
Glass          - Transparent, refraction
Gradient       - Color transitions
Matcap         - Fake lighting texture

// Lighting Types
Directional    - Sun-like, parallel rays
Point          - Bulb, omnidirectional
Spot           - Focused cone
Ambient        - General fill

// Environment
HDRI           - 360° image for reflections
Background     - Scene backdrop
Fog            - Depth atmosphere`,
    technology: 'spline',
    category: 'Materials',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'spline-4',
    question: 'How do you create animations in Spline?',
    answer: 'State-based animations: define keyframes for properties. Events trigger state changes. States can loop, transition with easing. Also supports path animation along curves.',
    codeExample: `// Animation Concepts

STATES
- Default state (initial)
- Hover state
- Click state
- Custom states

TRANSITIONS
- Duration (ms)
- Easing (ease, spring, bounce)
- Delay

ANIMATABLE PROPERTIES
- Position (X, Y, Z)
- Rotation
- Scale
- Color/Material
- Opacity

// Event Triggers
On Start       - Page load
On Hover       - Mouse over
On Click       - Mouse click
On Scroll      - Page scroll
On Key Press   - Keyboard input
On Mouse Move  - Cursor tracking

// Animation Types
State to State  - Discrete changes
Look At        - Follow cursor
Follow Path    - Along spline curve`,
    technology: 'spline',
    category: 'Animation',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'spline-5',
    question: 'How do you add interactivity in Spline?',
    answer: 'Events system: triggers (click, hover, scroll) paired with actions (animate, sound, URL). Variables for game logic. Physics for realistic movement. Drag interactions for 3D configurators.',
    codeExample: `// Event System

TRIGGERS
├── Mouse Events
│   ├── Click, Double Click
│   ├── Hover Start/End
│   └── Mouse Down/Up
├── Keyboard Events
│   └── Key Press (any key)
├── Scene Events
│   ├── Start
│   └── Scroll
└── Collision Events
    └── Object A hits Object B

ACTIONS
├── Animation
│   ├── Play State
│   └── Reset State
├── Look At (follow mouse)
├── Audio (play sound)
├── Open URL
└── Set Variable

// Variables (for logic)
Number    - Counters, scores
Boolean   - On/Off states
If/Then   - Conditional logic`,
    technology: 'spline',
    category: 'Interactivity',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'spline-6',
    question: 'How do you export and embed Spline in React?',
    answer: 'Install @splinetool/react, use Spline component with scene URL. Can control scene via spline.current. Also vanilla JS with @splinetool/runtime. Optimize for performance.',
    codeExample: `// React Integration

// Install
npm install @splinetool/react

// Basic usage
import Spline from '@splinetool/react';

function Hero() {
  return (
    <Spline scene="https://prod.spline.design/xxx/scene.splinecode" />
  );
}

// With ref for control
import { useRef } from 'react';
import Spline from '@splinetool/react';

function Interactive() {
  const spline = useRef();
  
  const onLoad = (splineApp) => {
    spline.current = splineApp;
  };
  
  const triggerAnimation = () => {
    spline.current.emitEvent('mouseDown', 'Cube');
  };
  
  return (
    <>
      <Spline scene="..." onLoad={onLoad} />
      <button onClick={triggerAnimation}>Animate</button>
    </>
  );
}`,
    technology: 'spline',
    category: 'Integration',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'spline-7',
    question: 'What is physics simulation in Spline?',
    answer: 'Physics adds realistic movement: gravity, collisions, forces. Objects have mass, friction, bounciness. Use for games, falling objects, interactive simulations.',
    codeExample: `// Physics Properties

RIGIDBODY
Mass       - Weight of object
Friction   - Surface resistance
Bounce     - Elasticity

BODY TYPES
Dynamic    - Affected by physics
Static     - Immovable (floors)
Kinematic  - Animated, affects others

FORCES
Gravity    - Pull downward
Wind       - Directional push
Explosion  - Outward force

COLLISIONS
- Enable per object
- Trigger events on hit
- Realistic bouncing

// Common Patterns
Falling objects - Drop on click
Bowling - Ball hits pins
Gravity UI - Elements fall into place
Physics buttons - Bounce on hover`,
    technology: 'spline',
    category: 'Physics',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'spline-8',
    question: 'How do you optimize Spline scenes for web?',
    answer: 'Reduce polygon count, bake lighting, compress textures. Lazy load scenes. Use simpler materials. LOD (level of detail) for complex scenes. Monitor file size.',
    codeExample: `// Performance Tips

GEOMETRY
- Lower subdivision levels
- Decimate complex meshes
- Remove hidden faces
- Merge static objects

MATERIALS
- Matcap over Standard (cheaper)
- Limit texture resolution
- Reuse materials
- Avoid transparency

LIGHTING
- Bake when possible
- Limit real-time lights
- Use HDRI for reflections

EXPORT
- Enable compression
- Lazy load (load on scroll)
- Consider static fallback image

// Lazy Loading
<Spline 
  scene="..."
  loading="lazy"
/>

// File size targets
Simple scene: < 1MB
Complex scene: < 5MB`,
    technology: 'spline',
    category: 'Performance',
    difficulty: 'hard',
    timesCorrect: 0,
    timesIncorrect: 0
  }
];
