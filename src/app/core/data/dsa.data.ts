import { Flashcard } from '../models/flashcard.model';

export const DSA_CARDS: Flashcard[] = [
  // ═══════════════════════════════════════════════════════
  // BIG O NOTATION
  // ═══════════════════════════════════════════════════════
  {
    id: 'dsa-1',
    question: 'What is Big O notation and why does it matter?',
    answer: 'Big O describes algorithm efficiency as input grows. Measures worst-case time/space complexity. Critical for interviews and writing scalable code. Common: O(1), O(log n), O(n), O(n log n), O(n²).',
    codeExample: `// Common Time Complexities (best to worst)

O(1)       - Constant    - Array access, hash lookup
O(log n)   - Logarithmic - Binary search
O(n)       - Linear      - Single loop, linear search
O(n log n) - Linearithmic - Merge sort, quick sort
O(n²)      - Quadratic   - Nested loops, bubble sort
O(2^n)     - Exponential - Recursive fibonacci (naive)

// Examples:
arr[0]              // O(1)
for(i=0; i<n; i++)  // O(n)
for(...) for(...)   // O(n²)

// Space complexity also uses Big O
// Creating new array of size n = O(n) space`,
    technology: 'dsa',
    category: 'Big O',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'dsa-2',
    question: 'How do you analyze time complexity of nested loops?',
    answer: 'Multiply complexities of nested loops. If outer runs n times and inner runs n times, total is O(n × n) = O(n²). If inner runs constant times, it\'s still O(n).',
    codeExample: `// Nested loops - MULTIPLY

// O(n²) - Both depend on n
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    // O(n * n) = O(n²)
  }
}

// O(n) - Inner is constant
for (let i = 0; i < n; i++) {
  for (let j = 0; j < 5; j++) {
    // O(n * 5) = O(n)
  }
}

// O(n * m) - Different sizes
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    // O(n * m)
  }
}

// Sequential loops - ADD
for (let i = 0; i < n; i++) {} // O(n)
for (let j = 0; j < n; j++) {} // O(n)
// Total: O(n + n) = O(2n) = O(n)`,
    technology: 'dsa',
    category: 'Big O',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // ARRAYS & STRINGS
  // ═══════════════════════════════════════════════════════
  {
    id: 'dsa-3',
    question: 'What is the Two Pointer technique?',
    answer: 'Two pointers traverse array from different positions (start/end or at different speeds). Reduces O(n²) to O(n). Common uses: sorted array sum, palindrome check, remove duplicates.',
    codeExample: `// Two Sum in SORTED array - O(n)
function twoSum(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  
  while (left < right) {
    const sum = nums[left] + nums[right];
    
    if (sum === target) {
      return [left, right];
    } else if (sum < target) {
      left++;   // Need bigger sum
    } else {
      right--;  // Need smaller sum
    }
  }
  return null;
}

// Palindrome check - O(n)
function isPalindrome(s) {
  let left = 0, right = s.length - 1;
  
  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }
  return true;
}`,
    technology: 'dsa',
    category: 'Arrays',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'dsa-4',
    question: 'What is the Sliding Window technique?',
    answer: 'Window of fixed or variable size slides through array. Avoids recalculating entire window each time. O(n) instead of O(n×k). Used for: max sum subarray, longest substring, averages.',
    codeExample: `// Max sum of k consecutive elements - O(n)
function maxSumSubarray(arr, k) {
  let windowSum = 0;
  let maxSum = -Infinity;
  
  for (let i = 0; i < arr.length; i++) {
    windowSum += arr[i];  // Add right element
    
    if (i >= k - 1) {
      maxSum = Math.max(maxSum, windowSum);
      windowSum -= arr[i - k + 1];  // Remove left element
    }
  }
  return maxSum;
}

// Variable window: Longest substring without repeats
function lengthOfLongestSubstring(s) {
  const seen = new Map();
  let left = 0, maxLen = 0;
  
  for (let right = 0; right < s.length; right++) {
    if (seen.has(s[right]) && seen.get(s[right]) >= left) {
      left = seen.get(s[right]) + 1;  // Shrink window
    }
    seen.set(s[right], right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
    technology: 'dsa',
    category: 'Arrays',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // HASH MAPS
  // ═══════════════════════════════════════════════════════
  {
    id: 'dsa-5',
    question: 'When should you use a Hash Map (Object/Map)?',
    answer: 'Use hash maps for O(1) lookups, counting frequencies, caching, and replacing nested loops. Trades space for time. Common: Two Sum, anagram check, duplicate detection.',
    codeExample: `// Two Sum (unsorted) - O(n) with hash map
function twoSum(nums, target) {
  const seen = new Map();  // value -> index
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }
    seen.set(nums[i], i);
  }
  return null;
}

// Frequency counter - anagram check
function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  
  const freq = {};
  for (const char of s) {
    freq[char] = (freq[char] || 0) + 1;
  }
  for (const char of t) {
    if (!freq[char]) return false;
    freq[char]--;
  }
  return true;
}

// First non-repeating character
function firstUniqChar(s) {
  const count = {};
  for (const c of s) count[c] = (count[c] || 0) + 1;
  for (let i = 0; i < s.length; i++) {
    if (count[s[i]] === 1) return i;
  }
  return -1;
}`,
    technology: 'dsa',
    category: 'Hash Maps',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // STACKS & QUEUES
  // ═══════════════════════════════════════════════════════
  {
    id: 'dsa-6',
    question: 'What is a Stack and when do you use it?',
    answer: 'Stack is LIFO (Last In First Out). push() adds to top, pop() removes from top. Use for: matching brackets, undo operations, DFS, expression evaluation.',
    codeExample: `// Valid Parentheses - Classic stack problem
function isValid(s) {
  const stack = [];
  const pairs = { ')': '(', ']': '[', '}': '{' };
  
  for (const char of s) {
    if (char === '(' || char === '[' || char === '{') {
      stack.push(char);  // Opening: push
    } else {
      if (stack.pop() !== pairs[char]) {
        return false;  // Closing: must match
      }
    }
  }
  return stack.length === 0;  // All matched
}

// Min Stack - O(1) getMin
class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }
  
  push(val) {
    this.stack.push(val);
    const min = this.minStack.length === 0 
      ? val 
      : Math.min(val, this.minStack.at(-1));
    this.minStack.push(min);
  }
  
  pop() {
    this.stack.pop();
    this.minStack.pop();
  }
  
  getMin() {
    return this.minStack.at(-1);
  }
}`,
    technology: 'dsa',
    category: 'Stacks & Queues',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'dsa-7',
    question: 'What is a Queue and what is BFS?',
    answer: 'Queue is FIFO (First In First Out). enqueue adds to back, dequeue removes from front. BFS (Breadth-First Search) uses queue to explore level by level. Used for: shortest path, level order.',
    codeExample: `// BFS - Level Order Traversal of Binary Tree
function levelOrder(root) {
  if (!root) return [];
  
  const result = [];
  const queue = [root];  // Start with root
  
  while (queue.length > 0) {
    const levelSize = queue.length;
    const level = [];
    
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();  // Dequeue front
      level.push(node.val);
      
      // Enqueue children
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}

// BFS for shortest path in graph
function shortestPath(graph, start, end) {
  const queue = [[start, 0]];  // [node, distance]
  const visited = new Set([start]);
  
  while (queue.length > 0) {
    const [node, dist] = queue.shift();
    if (node === end) return dist;
    
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, dist + 1]);
      }
    }
  }
  return -1;
}`,
    technology: 'dsa',
    category: 'Stacks & Queues',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // LINKED LISTS
  // ═══════════════════════════════════════════════════════
  {
    id: 'dsa-8',
    question: 'How do you reverse a linked list?',
    answer: 'Classic interview question! Iterate through list, reversing pointers as you go. Need three pointers: prev, curr, next. O(n) time, O(1) space.',
    codeExample: `// Reverse Linked List - Iterative O(n)
function reverseList(head) {
  let prev = null;
  let curr = head;
  
  while (curr !== null) {
    const next = curr.next;  // Save next
    curr.next = prev;        // Reverse pointer
    prev = curr;             // Move prev forward
    curr = next;             // Move curr forward
  }
  return prev;  // New head
}

// Reverse Linked List - Recursive
function reverseListRecursive(head) {
  // Base case
  if (!head || !head.next) return head;
  
  // Reverse the rest
  const newHead = reverseListRecursive(head.next);
  
  // Reverse current connection
  head.next.next = head;
  head.next = null;
  
  return newHead;
}

// Detect Cycle - Floyd's Algorithm
function hasCycle(head) {
  let slow = head, fast = head;
  
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`,
    technology: 'dsa',
    category: 'Linked Lists',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // TREES
  // ═══════════════════════════════════════════════════════
  {
    id: 'dsa-9',
    question: 'What are the tree traversal methods?',
    answer: 'Three DFS traversals: Inorder (left-root-right, gives sorted for BST), Preorder (root-left-right, copy tree), Postorder (left-right-root, delete tree). Plus BFS (level order).',
    codeExample: `// Binary Tree Traversals

// Inorder: Left → Root → Right (sorted for BST)
function inorder(root, result = []) {
  if (!root) return result;
  inorder(root.left, result);
  result.push(root.val);
  inorder(root.right, result);
  return result;
}

// Preorder: Root → Left → Right (copy/serialize)
function preorder(root, result = []) {
  if (!root) return result;
  result.push(root.val);
  preorder(root.left, result);
  preorder(root.right, result);
  return result;
}

// Postorder: Left → Right → Root (delete tree)
function postorder(root, result = []) {
  if (!root) return result;
  postorder(root.left, result);
  postorder(root.right, result);
  result.push(root.val);
  return result;
}

// Iterative Inorder (with stack)
function inorderIterative(root) {
  const result = [], stack = [];
  let curr = root;
  
  while (curr || stack.length) {
    while (curr) {
      stack.push(curr);
      curr = curr.left;
    }
    curr = stack.pop();
    result.push(curr.val);
    curr = curr.right;
  }
  return result;
}`,
    technology: 'dsa',
    category: 'Trees',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'dsa-10',
    question: 'What is a Binary Search Tree (BST)?',
    answer: 'BST has property: left subtree < node < right subtree. Enables O(log n) search, insert, delete (if balanced). Inorder traversal gives sorted order. Watch for unbalanced trees (O(n) worst case).',
    codeExample: `// BST Search - O(log n) average
function searchBST(root, val) {
  if (!root) return null;
  
  if (val === root.val) return root;
  if (val < root.val) return searchBST(root.left, val);
  return searchBST(root.right, val);
}

// BST Insert
function insertBST(root, val) {
  if (!root) return new TreeNode(val);
  
  if (val < root.val) {
    root.left = insertBST(root.left, val);
  } else {
    root.right = insertBST(root.right, val);
  }
  return root;
}

// Validate BST
function isValidBST(root, min = -Infinity, max = Infinity) {
  if (!root) return true;
  
  if (root.val <= min || root.val >= max) {
    return false;
  }
  
  return isValidBST(root.left, min, root.val) &&
         isValidBST(root.right, root.val, max);
}

// Find LCA (Lowest Common Ancestor) in BST
function lowestCommonAncestor(root, p, q) {
  if (p.val < root.val && q.val < root.val) {
    return lowestCommonAncestor(root.left, p, q);
  }
  if (p.val > root.val && q.val > root.val) {
    return lowestCommonAncestor(root.right, p, q);
  }
  return root;  // Split point is LCA
}`,
    technology: 'dsa',
    category: 'Trees',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'dsa-11',
    question: 'How do you find the max depth of a binary tree?',
    answer: 'Classic recursion problem. Depth = 1 + max(left depth, right depth). Base case: null node has depth 0. Can also solve with BFS counting levels.',
    codeExample: `// Max Depth - Recursive DFS O(n)
function maxDepth(root) {
  if (!root) return 0;
  
  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);
  
  return 1 + Math.max(leftDepth, rightDepth);
}

// Max Depth - BFS (level order)
function maxDepthBFS(root) {
  if (!root) return 0;
  
  let depth = 0;
  const queue = [root];
  
  while (queue.length > 0) {
    depth++;
    const levelSize = queue.length;
    
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return depth;
}

// Same Tree check
function isSameTree(p, q) {
  if (!p && !q) return true;
  if (!p || !q) return false;
  
  return p.val === q.val && 
         isSameTree(p.left, q.left) && 
         isSameTree(p.right, q.right);
}`,
    technology: 'dsa',
    category: 'Trees',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // GRAPHS
  // ═══════════════════════════════════════════════════════
  {
    id: 'dsa-12',
    question: 'What is DFS (Depth-First Search)?',
    answer: 'DFS explores as deep as possible before backtracking. Uses recursion or stack. O(V+E) time. Use for: path finding, cycle detection, topological sort, connected components.',
    codeExample: `// DFS on Graph - Recursive
function dfs(graph, node, visited = new Set()) {
  if (visited.has(node)) return;
  
  visited.add(node);
  console.log(node);
  
  for (const neighbor of graph[node]) {
    dfs(graph, neighbor, visited);
  }
}

// DFS on Graph - Iterative (Stack)
function dfsIterative(graph, start) {
  const visited = new Set();
  const stack = [start];
  
  while (stack.length > 0) {
    const node = stack.pop();
    
    if (visited.has(node)) continue;
    visited.add(node);
    console.log(node);
    
    for (const neighbor of graph[node]) {
      stack.push(neighbor);
    }
  }
}

// Number of Islands (2D grid DFS)
function numIslands(grid) {
  let count = 0;
  
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '1') {
        count++;
        dfsFlood(grid, i, j);  // Sink the island
      }
    }
  }
  return count;
}

function dfsFlood(grid, i, j) {
  if (i < 0 || j < 0 || i >= grid.length || 
      j >= grid[0].length || grid[i][j] === '0') return;
  
  grid[i][j] = '0';  // Mark visited
  dfsFlood(grid, i+1, j);
  dfsFlood(grid, i-1, j);
  dfsFlood(grid, i, j+1);
  dfsFlood(grid, i, j-1);
}`,
    technology: 'dsa',
    category: 'Graphs',
    difficulty: 'hard',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // BINARY SEARCH
  // ═══════════════════════════════════════════════════════
  {
    id: 'dsa-13',
    question: 'How does Binary Search work?',
    answer: 'Divide and conquer on SORTED array. Compare middle, eliminate half each time. O(log n) time. Watch for integer overflow with (left + right) / 2.',
    codeExample: `// Binary Search - O(log n)
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    // Avoid overflow: use left + Math.floor((right - left) / 2)
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;  // Found it!
    } else if (arr[mid] < target) {
      left = mid + 1;  // Search right half
    } else {
      right = mid - 1;  // Search left half
    }
  }
  return -1;  // Not found
}

// Find first occurrence (left boundary)
function findFirst(arr, target) {
  let left = 0, right = arr.length - 1;
  let result = -1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      result = mid;
      right = mid - 1;  // Keep searching left
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return result;
}

// Search in rotated sorted array
function searchRotated(nums, target) {
  let left = 0, right = nums.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (nums[mid] === target) return mid;
    
    // Left half is sorted
    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // Right half is sorted
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return -1;
}`,
    technology: 'dsa',
    category: 'Searching',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // SORTING
  // ═══════════════════════════════════════════════════════
  {
    id: 'dsa-14',
    question: 'What is Merge Sort and how does it work?',
    answer: 'Divide and conquer: split array in half, recursively sort each half, merge sorted halves. O(n log n) time, O(n) space. Stable sort. Good for linked lists.',
    codeExample: `// Merge Sort - O(n log n)
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  
  // Append remaining
  return [...result, ...left.slice(i), ...right.slice(j)];
}

// Quick Sort - O(n log n) average, O(n²) worst
function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pivotIdx = partition(arr, left, right);
    quickSort(arr, left, pivotIdx - 1);
    quickSort(arr, pivotIdx + 1, right);
  }
  return arr;
}

function partition(arr, left, right) {
  const pivot = arr[right];
  let i = left;
  
  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }
  [arr[i], arr[right]] = [arr[right], arr[i]];
  return i;
}`,
    technology: 'dsa',
    category: 'Sorting',
    difficulty: 'hard',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // DYNAMIC PROGRAMMING
  // ═══════════════════════════════════════════════════════
  {
    id: 'dsa-15',
    question: 'What is Dynamic Programming?',
    answer: 'Breaking problem into overlapping subproblems and storing results (memoization). Avoids recomputing same subproblems. Two approaches: top-down (recursion + memo) or bottom-up (tabulation).',
    codeExample: `// Fibonacci - Classic DP example

// Naive Recursion: O(2^n) - exponential!
function fibNaive(n) {
  if (n <= 1) return n;
  return fibNaive(n - 1) + fibNaive(n - 2);
}

// Top-Down with Memoization: O(n)
function fibMemo(n, memo = {}) {
  if (n <= 1) return n;
  if (n in memo) return memo[n];
  
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
}

// Bottom-Up Tabulation: O(n) time, O(n) space
function fibTab(n) {
  if (n <= 1) return n;
  
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

// Optimized: O(n) time, O(1) space
function fibOptimized(n) {
  if (n <= 1) return n;
  
  let prev2 = 0, prev1 = 1;
  for (let i = 2; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}`,
    technology: 'dsa',
    category: 'Dynamic Programming',
    difficulty: 'hard',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'dsa-16',
    question: 'How do you solve the Climbing Stairs problem?',
    answer: 'Classic DP: ways to reach step n = ways(n-1) + ways(n-2). Same as Fibonacci! Recognize the pattern: current state depends on previous states.',
    codeExample: `// Climbing Stairs - 1 or 2 steps at a time
// How many ways to reach top?

// Recurrence: ways(n) = ways(n-1) + ways(n-2)
// Base: ways(1) = 1, ways(2) = 2

function climbStairs(n) {
  if (n <= 2) return n;
  
  let prev2 = 1;  // ways to step 1
  let prev1 = 2;  // ways to step 2
  
  for (let i = 3; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}

// House Robber - Can't rob adjacent houses
function rob(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  
  let prev2 = 0;
  let prev1 = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    const curr = Math.max(prev1, prev2 + nums[i]);
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}

// Coin Change - minimum coins needed
function coinChange(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
    technology: 'dsa',
    category: 'Dynamic Programming',
    difficulty: 'hard',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // RECURSION & BACKTRACKING
  // ═══════════════════════════════════════════════════════
  {
    id: 'dsa-17',
    question: 'What is Backtracking?',
    answer: 'Build solution incrementally, abandon (backtrack) when solution can\'t work. Explores all possibilities efficiently. Used for: permutations, combinations, subsets, N-Queens, Sudoku.',
    codeExample: `// Subsets - Generate all subsets O(2^n)
function subsets(nums) {
  const result = [];
  
  function backtrack(start, current) {
    result.push([...current]);  // Add current subset
    
    for (let i = start; i < nums.length; i++) {
      current.push(nums[i]);     // Choose
      backtrack(i + 1, current); // Explore
      current.pop();             // Un-choose (backtrack)
    }
  }
  
  backtrack(0, []);
  return result;
}

// Permutations
function permute(nums) {
  const result = [];
  
  function backtrack(current, remaining) {
    if (remaining.length === 0) {
      result.push([...current]);
      return;
    }
    
    for (let i = 0; i < remaining.length; i++) {
      current.push(remaining[i]);
      backtrack(current, [
        ...remaining.slice(0, i),
        ...remaining.slice(i + 1)
      ]);
      current.pop();
    }
  }
  
  backtrack([], nums);
  return result;
}

// Combination Sum
function combinationSum(candidates, target) {
  const result = [];
  
  function backtrack(start, current, sum) {
    if (sum === target) {
      result.push([...current]);
      return;
    }
    if (sum > target) return;
    
    for (let i = start; i < candidates.length; i++) {
      current.push(candidates[i]);
      backtrack(i, current, sum + candidates[i]);
      current.pop();
    }
  }
  
  backtrack(0, [], 0);
  return result;
}`,
    technology: 'dsa',
    category: 'Recursion',
    difficulty: 'hard',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // COMMON PATTERNS
  // ═══════════════════════════════════════════════════════
  {
    id: 'dsa-18',
    question: 'What are the most important DSA patterns for interviews?',
    answer: 'Master these patterns: 1) Two Pointers 2) Sliding Window 3) Hash Map for O(1) lookup 4) BFS/DFS 5) Binary Search 6) Recursion + Memoization 7) Stack for nested structures.',
    codeExample: `// Quick Pattern Reference

// 1. Two Pointers - sorted arrays, palindromes
let left = 0, right = arr.length - 1;

// 2. Sliding Window - subarrays, substrings
for (let right = 0; right < n; right++) {
  // expand window
  while (invalid) left++;  // shrink
}

// 3. Hash Map - frequency, two sum, caching
const map = new Map();

// 4. BFS - shortest path, level order
const queue = [start];
while (queue.length) {
  const node = queue.shift();
  // process & add neighbors
}

// 5. DFS - paths, connected components
function dfs(node, visited) {
  visited.add(node);
  for (const neighbor of graph[node]) {
    if (!visited.has(neighbor)) dfs(neighbor, visited);
  }
}

// 6. Binary Search - sorted data, answer space
while (left <= right) {
  const mid = Math.floor((left + right) / 2);
  // adjust left or right
}

// 7. DP - overlapping subproblems
const memo = {};
function solve(n) {
  if (n in memo) return memo[n];
  memo[n] = /* recurse */;
  return memo[n];
}`,
    technology: 'dsa',
    category: 'Patterns',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  }
];
