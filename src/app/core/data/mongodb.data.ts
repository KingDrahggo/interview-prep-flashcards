import { Flashcard } from '../models/flashcard.model';

export const MONGODB_CARDS: Flashcard[] = [
  // ═══════════════════════════════════════════════════════
  // CORE CONCEPTS
  // ═══════════════════════════════════════════════════════
  {
    id: 'mongo-1',
    question: 'What is MongoDB and when should you use it?',
    answer: 'MongoDB is a NoSQL document database. Stores JSON-like documents. Schema-flexible. Good for: rapid development, variable data structures, horizontal scaling, real-time analytics.',
    codeExample: `// MongoDB document (BSON)
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30,
  "address": {
    "city": "New York",
    "zip": "10001"
  },
  "tags": ["developer", "mongodb"],
  "createdAt": ISODate("2024-01-15T10:30:00Z")
}

// When to use MongoDB:
// ✅ Flexible schema requirements
// ✅ Rapid prototyping
// ✅ Hierarchical data
// ✅ Need horizontal scaling
// ❌ Complex transactions across collections
// ❌ Heavy joins/relations`,
    technology: 'mongodb',
    category: 'Core',
    difficulty: 'easy',
    version: 'MongoDB 6.0+',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'mongo-2',
    question: 'What is the difference between SQL and MongoDB terminology?',
    answer: 'SQL → MongoDB: Database → Database, Table → Collection, Row → Document, Column → Field, Index → Index, JOIN → $lookup or embedding, Primary Key → _id.',
    codeExample: `// SQL vs MongoDB

// Table = Collection
// SQL: CREATE TABLE users
db.createCollection("users")

// Row = Document
// SQL: INSERT INTO users VALUES (...)
db.users.insertOne({
  name: "John",
  email: "john@example.com"
})

// Column = Field
// SQL: SELECT name, email FROM users
db.users.find({}, { name: 1, email: 1 })

// JOIN = $lookup or embedding
// SQL: SELECT * FROM orders JOIN users
db.orders.aggregate([
  { $lookup: {
    from: "users",
    localField: "userId",
    foreignField: "_id",
    as: "user"
  }}
])`,
    technology: 'mongodb',
    category: 'Core',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // CRUD OPERATIONS
  // ═══════════════════════════════════════════════════════
  {
    id: 'mongo-3',
    question: 'How do you perform CRUD operations in MongoDB?',
    answer: 'Create: insertOne/insertMany. Read: find/findOne. Update: updateOne/updateMany. Delete: deleteOne/deleteMany. All take query filters.',
    codeExample: `// CREATE
db.users.insertOne({ name: "John", age: 30 });
db.users.insertMany([{ name: "Jane" }, { name: "Bob" }]);

// READ
db.users.find();                        // All documents
db.users.findOne({ name: "John" });     // First match
db.users.find({ age: { $gte: 18 } });   // With condition

// UPDATE
db.users.updateOne(
  { name: "John" },                     // Filter
  { $set: { age: 31 } }                 // Update
);
db.users.updateMany(
  { status: "pending" },
  { $set: { status: "active" } }
);

// DELETE
db.users.deleteOne({ name: "John" });
db.users.deleteMany({ status: "inactive" });

// REPLACE (whole document)
db.users.replaceOne(
  { _id: ObjectId("...") },
  { name: "New Name", age: 25 }
);`,
    technology: 'mongodb',
    category: 'CRUD',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'mongo-4',
    question: 'What are MongoDB query operators?',
    answer: 'Comparison: $eq, $ne, $gt, $gte, $lt, $lte, $in, $nin. Logical: $and, $or, $not, $nor. Element: $exists, $type. Array: $all, $elemMatch, $size.',
    codeExample: `// Comparison operators
db.products.find({ price: { $gt: 100 } });           // Greater than
db.products.find({ category: { $in: ["A", "B"] } }); // In array
db.products.find({ stock: { $ne: 0 } });             // Not equal

// Logical operators
db.products.find({
  $and: [
    { price: { $gte: 10 } },
    { price: { $lte: 50 } }
  ]
});

db.products.find({
  $or: [
    { category: "electronics" },
    { featured: true }
  ]
});

// Element operators
db.users.find({ phone: { $exists: true } });

// Array operators
db.posts.find({ tags: { $all: ["mongodb", "database"] } });
db.orders.find({ items: { $elemMatch: { qty: { $gt: 5 } } } });`,
    technology: 'mongodb',
    category: 'Queries',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'mongo-5',
    question: 'What are MongoDB update operators?',
    answer: '$set: set field value. $unset: remove field. $inc: increment. $push/$pull: add/remove from array. $addToSet: add unique to array. $rename: rename field.',
    codeExample: `// $set - set field value
db.users.updateOne(
  { _id: id },
  { $set: { status: "active", "address.city": "NYC" } }
);

// $unset - remove field
db.users.updateOne({ _id: id }, { $unset: { tempField: "" } });

// $inc - increment number
db.products.updateOne(
  { _id: id },
  { $inc: { stock: -1, views: 1 } }
);

// $push - add to array
db.posts.updateOne(
  { _id: id },
  { $push: { comments: { text: "Nice!", date: new Date() } } }
);

// $pull - remove from array
db.posts.updateOne(
  { _id: id },
  { $pull: { tags: "obsolete" } }
);

// $addToSet - add if not exists
db.users.updateOne(
  { _id: id },
  { $addToSet: { roles: "admin" } }
);`,
    technology: 'mongodb',
    category: 'Updates',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // AGGREGATION
  // ═══════════════════════════════════════════════════════
  {
    id: 'mongo-6',
    question: 'What is the MongoDB Aggregation Pipeline?',
    answer: 'Pipeline processes documents through stages. Common stages: $match (filter), $group (aggregate), $sort, $project (reshape), $lookup (join), $limit, $skip.',
    codeExample: `db.orders.aggregate([
  // Stage 1: Filter
  { $match: { status: "completed" } },
  
  // Stage 2: Group and calculate
  { $group: {
    _id: "$customerId",
    totalSpent: { $sum: "$amount" },
    orderCount: { $count: {} },
    avgOrder: { $avg: "$amount" }
  }},
  
  // Stage 3: Sort
  { $sort: { totalSpent: -1 } },
  
  // Stage 4: Limit
  { $limit: 10 },
  
  // Stage 5: Reshape output
  { $project: {
    customerId: "$_id",
    totalSpent: 1,
    orderCount: 1,
    _id: 0
  }}
]);`,
    technology: 'mongodb',
    category: 'Aggregation',
    difficulty: 'hard',
    version: 'MongoDB 3.2+',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'mongo-7',
    question: 'How do you perform joins in MongoDB with $lookup?',
    answer: '$lookup performs left outer join between collections. Specify from (collection), localField, foreignField, as (output array). Use $unwind to flatten.',
    codeExample: `// Basic $lookup
db.orders.aggregate([
  { $lookup: {
    from: "customers",          // Collection to join
    localField: "customerId",   // Field in orders
    foreignField: "_id",        // Field in customers
    as: "customerDetails"       // Output array name
  }},
  { $unwind: "$customerDetails" } // Flatten array
]);

// Pipeline lookup (more power)
db.orders.aggregate([
  { $lookup: {
    from: "products",
    let: { productIds: "$items.productId" },
    pipeline: [
      { $match: {
        $expr: { $in: ["$_id", "$$productIds"] }
      }},
      { $project: { name: 1, price: 1 } }
    ],
    as: "productDetails"
  }}
]);

// Multiple lookups
db.orders.aggregate([
  { $lookup: { from: "customers", ... } },
  { $lookup: { from: "products", ... } }
]);`,
    technology: 'mongodb',
    category: 'Aggregation',
    difficulty: 'hard',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // INDEXING
  // ═══════════════════════════════════════════════════════
  {
    id: 'mongo-8',
    question: 'How do indexes work in MongoDB?',
    answer: 'Indexes improve query performance. Types: single field, compound, multikey (arrays), text, geospatial. Trade-off: faster reads, slower writes.',
    codeExample: `// Single field index
db.users.createIndex({ email: 1 });  // 1 = ascending

// Compound index (order matters!)
db.orders.createIndex({ customerId: 1, createdAt: -1 });

// Unique index
db.users.createIndex({ email: 1 }, { unique: true });

// Multikey index (arrays)
db.products.createIndex({ tags: 1 });

// Text index (full-text search)
db.articles.createIndex({ title: "text", content: "text" });
db.articles.find({ $text: { $search: "mongodb database" } });

// TTL index (auto-delete old docs)
db.sessions.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 3600 }  // Delete after 1 hour
);

// View indexes
db.users.getIndexes();

// Explain query (check index usage)
db.users.find({ email: "test@test.com" }).explain("executionStats");`,
    technology: 'mongodb',
    category: 'Indexing',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // MONGOOSE (Node.js ODM)
  // ═══════════════════════════════════════════════════════
  {
    id: 'mongo-9',
    question: 'What is Mongoose and how do you define schemas?',
    answer: 'Mongoose is an ODM for MongoDB in Node.js. Provides schema definitions, validation, middleware, virtuals, and population for references.',
    codeExample: `const mongoose = require('mongoose');

// Define schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/\\S+@\\S+\\.\\S+/, 'Invalid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false  // Don't include in queries by default
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create model
const User = mongoose.model('User', userSchema);

// Usage
const user = await User.create({ email: 'test@test.com', password: 'pass123' });
const users = await User.find({ role: 'admin' });`,
    technology: 'mongodb',
    category: 'Mongoose',
    difficulty: 'medium',
    version: 'Mongoose 7+',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'mongo-10',
    question: 'How do you define relationships in Mongoose?',
    answer: 'Use ObjectId references for relations. Populate() to load referenced documents. Can also embed documents for denormalization.',
    codeExample: `// REFERENCING (normalized)
const postSchema = new Schema({
  title: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

// Populate reference
const post = await Post
  .findById(id)
  .populate('author', 'name email');  // Select specific fields

// Deep population
const post = await Post
  .findById(id)
  .populate({
    path: 'comments',
    populate: { path: 'author', select: 'name' }
  });

// EMBEDDING (denormalized)
const orderSchema = new Schema({
  customer: {
    name: String,
    email: String
  },
  items: [{
    productName: String,
    price: Number,
    quantity: Number
  }]
});

// When to reference vs embed?
// Reference: large/growing data, many-to-many
// Embed: data usually queried together, one-to-few`,
    technology: 'mongodb',
    category: 'Mongoose',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'mongo-11',
    question: 'What are Mongoose middleware (hooks)?',
    answer: 'Middleware execute before/after certain operations. Pre hooks: validate, save, remove, find. Useful for hashing passwords, updating timestamps, cascading deletes.',
    codeExample: `const bcrypt = require('bcrypt');

const userSchema = new Schema({
  email: String,
  password: String,
  updatedAt: Date
});

// PRE save - hash password
userSchema.pre('save', async function(next) {
  // Only hash if password modified
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// PRE save - update timestamp
userSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// POST save - send welcome email
userSchema.post('save', function(doc) {
  if (doc.isNew) {
    sendWelcomeEmail(doc.email);
  }
});

// PRE remove - cascade delete
userSchema.pre('remove', async function(next) {
  await Post.deleteMany({ author: this._id });
  next();
});

// Query middleware
userSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
});`,
    technology: 'mongodb',
    category: 'Mongoose',
    difficulty: 'hard',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'mongo-12',
    question: 'What are MongoDB transactions?',
    answer: 'Transactions ensure ACID operations across multiple documents/collections. Require replica set. Use session with startTransaction, commitTransaction, abortTransaction.',
    codeExample: `// Transactions require replica set
const session = await mongoose.startSession();
session.startTransaction();

try {
  // All operations use the session
  const user = await User.create([{ name: 'John' }], { session });
  
  await Account.create([{
    userId: user[0]._id,
    balance: 0
  }], { session });
  
  await AuditLog.create([{
    action: 'user_created',
    userId: user[0]._id
  }], { session });
  
  // Commit if all succeed
  await session.commitTransaction();
  
} catch (error) {
  // Rollback on any failure
  await session.abortTransaction();
  throw error;
  
} finally {
  session.endSession();
}

// With callback (cleaner)
await mongoose.connection.transaction(async (session) => {
  await User.create([{ name: 'John' }], { session });
  await Account.create([{ balance: 0 }], { session });
  // Auto-commit or abort
});`,
    technology: 'mongodb',
    category: 'Transactions',
    difficulty: 'hard',
    version: 'MongoDB 4.0+',
    timesCorrect: 0,
    timesIncorrect: 0
  }
];
