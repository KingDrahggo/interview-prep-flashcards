import { Flashcard } from '../models/flashcard.model';

export const BLENDER_CARDS: Flashcard[] = [
  {
    id: 'blender-1',
    question: 'What is Blender and what are its main uses?',
    answer: 'Blender is free, open-source 3D software. Uses: 3D modeling, animation, rendering, video editing, game assets, VFX. Supports entire 3D pipeline. Export to glTF for web.',
    codeExample: `// Blender Capabilities

3D MODELING
- Mesh editing
- Sculpting
- Procedural modeling

ANIMATION
- Keyframe animation
- Rigging & Bones
- Motion graphics

RENDERING
- Cycles (path tracing)
- EEVEE (real-time)
- Workbench (viewport)

OTHER FEATURES
- Video editing
- 2D animation (Grease Pencil)
- Physics simulation
- Compositing

// Web Export
glTF/GLB format for:
- three.js
- React Three Fiber
- Babylon.js`,
    technology: 'blender',
    category: 'Overview',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'blender-2',
    question: 'What are the essential Blender keyboard shortcuts?',
    answer: 'Navigation: Middle mouse rotate, scroll zoom. Transform: G (grab/move), R (rotate), S (scale). Edit mode: Tab. Select all: A. Duplicate: Shift+D. Delete: X.',
    codeExample: `// Essential Shortcuts

NAVIGATION
Middle Mouse    - Rotate view
Scroll          - Zoom
Shift+Middle    - Pan
Numpad 1/3/7    - Front/Right/Top
Numpad 5        - Ortho/Perspective

SELECTION
A               - Select all
Alt+A           - Deselect all
B               - Box select
C               - Circle select

TRANSFORM
G               - Grab (move)
R               - Rotate
S               - Scale
X/Y/Z           - Constrain to axis

MODES
Tab             - Edit/Object mode
Ctrl+Tab        - Mode pie menu

EDITING
E               - Extrude
I               - Inset faces
Ctrl+R          - Loop cut
Shift+D         - Duplicate
X               - Delete
Ctrl+Z          - Undo`,
    technology: 'blender',
    category: 'Basics',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'blender-3',
    question: 'What is the difference between Object and Edit mode?',
    answer: 'Object mode: manipulate whole objects (position, rotation, scale). Edit mode: modify geometry (vertices, edges, faces). Tab to switch. Apply transforms before editing.',
    codeExample: `// Mode Differences

OBJECT MODE
- Transform entire objects
- Add/delete objects
- Apply modifiers
- Set origin point
- Parent relationships

EDIT MODE
- Modify geometry
- Vertices, Edges, Faces
- Extrude, inset, bevel
- Loop cuts
- UVs

OTHER MODES
- Sculpt Mode: Clay-like sculpting
- Weight Paint: Bone influences
- Texture Paint: Paint on mesh
- Pose Mode: Animate armatures

// Best Practice
1. Model in Edit mode
2. Apply transforms (Ctrl+A) before edit
3. Keep clean topology
4. Name your objects`,
    technology: 'blender',
    category: 'Basics',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'blender-4',
    question: 'What are Modifiers in Blender?',
    answer: 'Modifiers are non-destructive operations on geometry. Stack-based (order matters). Common: Subdivision Surface, Mirror, Array, Boolean, Bevel. Apply when finished.',
    codeExample: `// Common Modifiers

GENERATE
Subdivision Surface  - Smooth mesh
Mirror              - Symmetry
Array               - Repeat objects
Boolean             - Combine/subtract
Solidify            - Add thickness

DEFORM
Armature            - Rigging
Curve               - Along path
Lattice             - Deform cage

MODIFY
Bevel               - Rounded edges
Weighted Normal     - Better shading
Triangulate         - For game export

// Modifier Order
Modifiers apply top to bottom
1. Mirror
2. Subdivision Surface
3. Bevel

// For web export
Apply modifiers → Export glTF`,
    technology: 'blender',
    category: 'Modeling',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'blender-5',
    question: 'How do materials work in Blender?',
    answer: 'Materials use node-based system. Principled BSDF covers most cases. Key properties: Base Color, Metallic, Roughness, Normal. Connect textures via Image Texture nodes.',
    codeExample: `// Principled BSDF Properties

Base Color    - Albedo/diffuse
Metallic      - 0=Dielectric, 1=Metal
Roughness     - 0=Glossy, 1=Matte
Normal        - Surface detail
Emission      - Self-illumination

// PBR Texture Maps
Albedo/Diffuse    → Base Color
Metallic          → Metallic
Roughness         → Roughness
Normal            → Normal Map node
AO                → Multiply with Base

// Node Setup
Image Texture → Color → Base Color
Image Texture → Normal Map → Normal

// Tips for Web
- Bake textures for performance
- Optimize texture resolution
- Use 1K or 2K maps
- glTF supports PBR directly`,
    technology: 'blender',
    category: 'Materials',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'blender-6',
    question: 'What is UV Unwrapping?',
    answer: 'UV unwrapping flattens 3D mesh to 2D for texturing. Mark seams to control cuts. Unwrap methods: Smart UV, Cube Projection. Pack UVs to use texture space efficiently.',
    codeExample: `// UV Unwrapping Process

1. MARK SEAMS
   - Select edges
   - Edge menu → Mark Seam
   - Think like cutting paper

2. UNWRAP
   - Select all faces (A)
   - U → Unwrap
   - Or Smart UV Project (quick)

3. LAYOUT
   - UV Editor view
   - Pack Islands (Ctrl+P)
   - Scale/rotate islands

// Projection Types
Unwrap         - Follow seams
Smart UV       - Auto-seams
Cube/Cylinder  - Simple shapes
Project View   - From camera

// Tips
- Minimize stretching
- Keep texel density consistent
- Straight seams on hard edges
- Use Checker texture to verify`,
    technology: 'blender',
    category: 'Texturing',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'blender-7',
    question: 'How do you animate in Blender?',
    answer: 'Keyframe animation: set key (I) at different frames. Timeline for navigation. Graph Editor for curves. Dope Sheet for timing. NLA for action layering.',
    codeExample: `// Animation Basics

1. SET KEYFRAMES
   - Go to frame
   - Transform object
   - I → Insert Keyframe
   - Choose what to key

2. KEYFRAME TYPES
   Location       - Position
   Rotation       - Orientation
   Scale          - Size
   LocRotScale    - All transform

3. TIMELINE
   - Scrub to preview
   - Set start/end frames
   - Playback controls

4. GRAPH EDITOR
   - Adjust curves
   - Easing (ease in/out)
   - Bezier handles

// For Characters
- Create Armature (bones)
- Parent mesh to armature
- Weight paint influences
- Animate in Pose mode`,
    technology: 'blender',
    category: 'Animation',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'blender-8',
    question: 'How do you export from Blender for web?',
    answer: 'glTF 2.0 is the standard for web. Supports meshes, materials, animations. Export as .glb (binary) or .gltf (JSON). Apply transforms and modifiers before export.',
    codeExample: `// Export for Web (glTF)

BEFORE EXPORT
1. Apply all transforms (Ctrl+A)
2. Apply modifiers
3. Triangulate faces
4. Check scale (1 unit = 1 meter)

EXPORT SETTINGS
Format           - glTF Binary (.glb)
Include          - Selected only
Transform        - +Y Up
Materials        - Export
Compression      - Draco (smaller)
Animation        - Include if needed

// File Formats
.glb   - Single binary file (preferred)
.gltf  - JSON + separate files

// Optimization
- Decimate modifier
- Lower subdivision
- Texture resolution ≤ 2K
- Remove unused data

// Use in three.js
import { GLTFLoader } from 'three/addons';
const loader = new GLTFLoader();
loader.load('model.glb', (gltf) => {
  scene.add(gltf.scene);
});`,
    technology: 'blender',
    category: 'Export',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  }
];
