import { Flashcard } from '../models/flashcard.model';

export const NODE_CARDS: Flashcard[] = [
  // ═══════════════════════════════════════════════════════
  // NODE.JS CORE
  // ═══════════════════════════════════════════════════════
  {
    id: 'node-1',
    question: 'What is Node.js and how does it work?',
    answer: 'Node.js is a JavaScript runtime built on Chrome V8 engine. Uses non-blocking, event-driven I/O model for scalable network applications. Single-threaded with event loop.',
    codeExample: `// Node.js is event-driven and non-blocking
const http = require('http');
const fs = require('fs');

// Non-blocking file read
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!');
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});`,
    technology: 'node',
    category: 'Core',
    difficulty: 'easy',
    version: 'Node.js 18+',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'node-2',
    question: 'Explain the Node.js event loop.',
    answer: 'Event loop handles async operations. Phases: timers → pending callbacks → idle → poll → check → close. Microtasks (Promises) run between phases.',
    codeExample: `// Event loop execution order
console.log('1: Sync');

setTimeout(() => console.log('2: Timeout'), 0);

setImmediate(() => console.log('3: Immediate'));

Promise.resolve().then(() => console.log('4: Promise'));

process.nextTick(() => console.log('5: NextTick'));

console.log('6: Sync');

// Output: 1, 6, 5, 4, 2, 3
// 1. Sync code runs first
// 2. process.nextTick (highest priority)
// 3. Promises (microtask queue)
// 4. setTimeout (timers phase)
// 5. setImmediate (check phase)`,
    technology: 'node',
    category: 'Event Loop',
    difficulty: 'hard',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'node-3',
    question: 'What is the difference between require and import?',
    answer: 'require is CommonJS (synchronous, dynamic). import is ES Modules (asynchronous, static). ESM is newer and supports tree-shaking. Node supports both.',
    codeExample: `// CommonJS (require) - traditional Node.js
const express = require('express');
const { Router } = require('express');

// Dynamic imports
const module = require(\`./routes/\${routeName}\`);

// ES Modules (import) - modern approach
import express from 'express';
import { Router } from 'express';

// Dynamic import (async)
const module = await import('./module.js');

// package.json for ESM
{
  "type": "module"  // Enable ESM syntax
}

// Or use .mjs extension for ESM files`,
    technology: 'node',
    category: 'Modules',
    difficulty: 'medium',
    version: 'ES Modules',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // EXPRESS.JS
  // ═══════════════════════════════════════════════════════
  {
    id: 'node-4',
    question: 'How do you structure an Express.js application?',
    answer: 'Common structure: controllers (request handlers), routes (URL mapping), middleware (processing), models (data), services (business logic), config (settings).',
    codeExample: `// Project structure
├── src/
│   ├── controllers/   // Request handlers
│   │   └── userController.js
│   ├── routes/        // Route definitions
│   │   └── userRoutes.js
│   ├── middleware/    // Custom middleware
│   │   └── auth.js
│   ├── models/        // Data models
│   │   └── User.js
│   ├── services/      // Business logic
│   │   └── userService.js
│   └── app.js         // Express setup
├── config/
├── tests/
└── package.json

// app.js
const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);`,
    technology: 'node',
    category: 'Express',
    difficulty: 'medium',
    version: 'Express 4.x',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'node-5',
    question: 'What is Express middleware and how does it work?',
    answer: 'Middleware are functions that access req, res, and next(). They execute in order and can modify request/response, end the cycle, or pass to next middleware.',
    codeExample: `// Middleware signature
function middleware(req, res, next) {
  // Do something
  next(); // Pass to next middleware
}

// Application-level
app.use(express.json());  // Parse JSON body
app.use(cors());          // Enable CORS
app.use(logger);          // Custom logging

// Route-level
app.get('/api/users', authMiddleware, getUsers);

// Error-handling (4 params!)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// Custom middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: 'No token' });
  
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(403).json({ error: 'Invalid token' });
  }
};`,
    technology: 'node',
    category: 'Express',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'node-6',
    question: 'How do you handle errors in Express?',
    answer: 'Use try/catch in handlers, pass errors to next(err), create error-handling middleware (4 params). For async handlers, wrap or use express-async-handler.',
    codeExample: `// Sync error - automatic
app.get('/sync', (req, res) => {
  throw new Error('Sync error'); // Caught automatically
});

// Async error - must pass to next()
app.get('/async', async (req, res, next) => {
  try {
    const data = await fetchData();
    res.json(data);
  } catch (err) {
    next(err); // Pass to error handler
  }
});

// Wrapper for async handlers
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get('/users', asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
}));

// Error handler middleware (MUST be last)
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});`,
    technology: 'node',
    category: 'Express',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'node-7',
    question: 'How do you implement authentication in Express?',
    answer: 'Common approaches: JWT (stateless), sessions (stateful). Use bcrypt for password hashing, middleware for protected routes. Store tokens securely.',
    codeExample: `const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register
app.post('/register', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({ 
    email: req.body.email, 
    password: hashedPassword 
  });
  res.status(201).json({ id: user.id });
});

// Login
app.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !await bcrypt.compare(req.body.password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
  res.json({ token });
});

// Auth middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.userId = decoded.userId;
  next();
};`,
    technology: 'node',
    category: 'Express',
    difficulty: 'hard',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // REST API DESIGN
  // ═══════════════════════════════════════════════════════
  {
    id: 'node-8',
    question: 'What are REST API best practices?',
    answer: 'Use nouns for resources (/users not /getUsers). HTTP methods for actions. Proper status codes. Consistent naming. Versioning. Pagination. HATEOAS.',
    codeExample: `// Good REST API design
// GET    /api/v1/users          - Get all users
// GET    /api/v1/users/:id      - Get user by ID
// POST   /api/v1/users          - Create user
// PUT    /api/v1/users/:id      - Update user (full)
// PATCH  /api/v1/users/:id      - Update user (partial)
// DELETE /api/v1/users/:id      - Delete user

// Nested resources
// GET /api/v1/users/:userId/posts

// Status codes
200 - OK (GET, PUT, PATCH)
201 - Created (POST)
204 - No Content (DELETE)
400 - Bad Request (validation)
401 - Unauthorized (no auth)
403 - Forbidden (no permission)
404 - Not Found
500 - Server Error

// Response format
{
  "data": [...],
  "pagination": { "page": 1, "total": 100 },
  "links": { "next": "/users?page=2" }
}`,
    technology: 'node',
    category: 'REST API',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'node-9',
    question: 'How do you validate request data in Express?',
    answer: 'Use validation libraries like Joi, express-validator, or Zod. Validate body, params, query. Return meaningful error messages. Validate early.',
    codeExample: `// Using express-validator
const { body, validationResult } = require('express-validator');

const validateUser = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  body('name').trim().notEmpty(),
];

app.post('/users', validateUser, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Create user...
});

// Using Joi
const Joi = require('joi');

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  name: Joi.string().required()
});

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details });
  next();
};

app.post('/users', validate(userSchema), createUser);`,
    technology: 'node',
    category: 'Validation',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // SECURITY
  // ═══════════════════════════════════════════════════════
  {
    id: 'node-10',
    question: 'What are security best practices for Node.js APIs?',
    answer: 'Use helmet for headers, rate limiting, input validation, parameterized queries (SQL injection), sanitize output (XSS), secure dependencies, HTTPS.',
    codeExample: `const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const hpp = require('hpp');

// Security headers
app.use(helmet());

// Rate limiting
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: 'Too many requests'
}));

// Body parser with size limit
app.use(express.json({ limit: '10kb' }));

// Sanitize input (XSS)
app.use(xss());

// Prevent HTTP Parameter Pollution
app.use(hpp());

// Use HTTPS in production
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(\`https://\${req.headers.host}\${req.url}\`);
    }
    next();
  });
}`,
    technology: 'node',
    category: 'Security',
    difficulty: 'hard',
    version: 'Express 4.x',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'node-11',
    question: 'How do you handle environment variables in Node.js?',
    answer: 'Use dotenv package to load .env files. Never commit secrets to git. Use different .env files for dev/prod. Access via process.env.',
    codeExample: `// Install: npm install dotenv

// .env file (add to .gitignore!)
NODE_ENV=development
PORT=3000
DATABASE_URL=mongodb://localhost:27017/myapp
JWT_SECRET=your-super-secret-key
API_KEY=abc123

// app.js - load at start
require('dotenv').config();

// Access variables
const port = process.env.PORT || 3000;
const dbUrl = process.env.DATABASE_URL;

// Validate required variables
const required = ['DATABASE_URL', 'JWT_SECRET'];
required.forEach(key => {
  if (!process.env[key]) {
    console.error(\`Missing required env var: \${key}\`);
    process.exit(1);
  }
});

// Different files per environment
// .env.development
// .env.production
// .env.test`,
    technology: 'node',
    category: 'Configuration',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // TESTING
  // ═══════════════════════════════════════════════════════
  {
    id: 'node-12',
    question: 'How do you test Express APIs?',
    answer: 'Use Jest or Mocha for tests, Supertest for HTTP assertions. Test routes, middleware, services. Mock database/external services. Use test database.',
    codeExample: `// Install: npm install jest supertest --save-dev

const request = require('supertest');
const app = require('../app');

describe('User API', () => {
  describe('GET /api/users', () => {
    it('should return all users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(res.body).toHaveProperty('data');
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });
  
  describe('POST /api/users', () => {
    it('should create a user', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({ email: 'test@test.com', password: 'password123' })
        .expect(201);
      
      expect(res.body.data).toHaveProperty('id');
    });
    
    it('should return 400 for invalid data', async () => {
      await request(app)
        .post('/api/users')
        .send({ email: 'invalid' })
        .expect(400);
    });
  });
});`,
    technology: 'node',
    category: 'Testing',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  }
];
