import { Flashcard } from '../models/flashcard.model';

export const PYTHON_CARDS: Flashcard[] = [
  // ═══════════════════════════════════════════════════════
  // CORE CONCEPTS
  // ═══════════════════════════════════════════════════════
  {
    id: 'python-1',
    question: 'What are Python\'s key features and when to use it?',
    answer: 'Python is interpreted, dynamically typed, high-level language. Features: readability, extensive libraries, cross-platform. Good for: web dev, data science, AI/ML, automation, scripting.',
    codeExample: `# Python is clean and readable
def greet(name: str) -> str:
    """Greet a user with their name."""
    return f"Hello, {name}!"

# List comprehension
squares = [x**2 for x in range(10)]

# Dictionary comprehension
user_dict = {user.id: user for user in users}

# Multiple assignment
a, b, c = 1, 2, 3
x, *rest = [1, 2, 3, 4, 5]  # x=1, rest=[2,3,4,5]`,
    technology: 'python',
    category: 'Core',
    difficulty: 'easy',
    version: 'Python 3.11+',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'python-2',
    question: 'What is the difference between list, tuple, set, and dict?',
    answer: 'List: mutable, ordered, allows duplicates. Tuple: immutable, ordered. Set: mutable, unordered, no duplicates. Dict: mutable, key-value pairs, ordered (3.7+).',
    codeExample: `# List - mutable, ordered
my_list = [1, 2, 3, 2]
my_list.append(4)
my_list[0] = 10

# Tuple - immutable, ordered (hashable)
my_tuple = (1, 2, 3)
# my_tuple[0] = 10  # Error!

# Set - mutable, unordered, unique
my_set = {1, 2, 3, 2}  # {1, 2, 3}
my_set.add(4)

# Dict - key-value, ordered in 3.7+
my_dict = {"name": "Alice", "age": 30}
my_dict["email"] = "alice@test.com"

# When to use:
# List: ordered collection, may need to modify
# Tuple: fixed data, dictionary keys, return multiple values
# Set: membership testing, removing duplicates
# Dict: key-based access, JSON-like data`,
    technology: 'python',
    category: 'Data Types',
    difficulty: 'easy',
    version: 'Python 3.7+',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'python-3',
    question: 'How do decorators work in Python?',
    answer: 'Decorators modify function/class behavior. They wrap functions. Use @decorator syntax. Common uses: logging, timing, authentication, caching.',
    codeExample: `# Basic decorator
def timer(func):
    def wrapper(*args, **kwargs):
        import time
        start = time.time()
        result = func(*args, **kwargs)
        print(f"{func.__name__} took {time.time() - start:.2f}s")
        return result
    return wrapper

@timer
def slow_function():
    import time
    time.sleep(1)
    return "Done"

# Decorator with arguments
def repeat(times):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(times=3)
def say_hello():
    print("Hello!")

# functools.wraps preserves metadata
from functools import wraps

def my_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper`,
    technology: 'python',
    category: 'Advanced',
    difficulty: 'medium',
    version: 'Python 3.x',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'python-4',
    question: 'What are *args and **kwargs?',
    answer: '*args collects positional arguments as tuple. **kwargs collects keyword arguments as dict. Use for flexible function signatures.',
    codeExample: `# *args - variable positional arguments
def sum_all(*args):
    return sum(args)

sum_all(1, 2, 3, 4)  # 10

# **kwargs - variable keyword arguments
def create_user(**kwargs):
    return kwargs

create_user(name="Alice", age=30)  # {'name': 'Alice', 'age': 30}

# Combined
def flexible_func(required, *args, **kwargs):
    print(f"Required: {required}")
    print(f"Args: {args}")
    print(f"Kwargs: {kwargs}")

flexible_func("hello", 1, 2, name="Alice")

# Unpacking
def greet(name, age):
    print(f"{name} is {age}")

data = {"name": "Bob", "age": 25}
greet(**data)  # Bob is 25

numbers = [1, 2, 3]
print(*numbers)  # 1 2 3`,
    technology: 'python',
    category: 'Functions',
    difficulty: 'medium',
    version: 'Python 3.x',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'python-5',
    question: 'How does async/await work in Python?',
    answer: 'asyncio enables asynchronous programming. async def defines coroutine. await pauses until result ready. Use asyncio.run() to execute. Good for I/O-bound tasks.',
    codeExample: `import asyncio
import aiohttp

# Async function (coroutine)
async def fetch_data(url: str) -> dict:
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.json()

# Run multiple async tasks
async def fetch_all(urls: list[str]):
    tasks = [fetch_data(url) for url in urls]
    results = await asyncio.gather(*tasks)
    return results

# Main entry point
async def main():
    urls = ["http://api.com/1", "http://api.com/2"]
    data = await fetch_all(urls)
    print(data)

# Run the async program
asyncio.run(main())

# async context manager
async with aiofiles.open('file.txt', 'r') as f:
    content = await f.read()

# async generator
async def async_range(n):
    for i in range(n):
        await asyncio.sleep(0.1)
        yield i`,
    technology: 'python',
    category: 'Async',
    difficulty: 'hard',
    version: 'Python 3.7+',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'python-6',
    question: 'What are context managers and how do you create them?',
    answer: 'Context managers handle setup/teardown with "with" statement. Implement __enter__ and __exit__ or use @contextmanager. Common for files, locks, connections.',
    codeExample: `# Using context manager
with open('file.txt', 'r') as f:
    content = f.read()
# File automatically closed

# Class-based context manager
class DatabaseConnection:
    def __enter__(self):
        self.conn = connect_to_db()
        return self.conn
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.conn.close()
        return False  # Don't suppress exceptions

with DatabaseConnection() as conn:
    conn.execute("SELECT * FROM users")

# Decorator-based (simpler)
from contextlib import contextmanager

@contextmanager
def timer():
    import time
    start = time.time()
    yield
    print(f"Elapsed: {time.time() - start:.2f}s")

with timer():
    do_something()`,
    technology: 'python',
    category: 'Advanced',
    difficulty: 'medium',
    version: 'Python 3.x',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'python-7',
    question: 'What are type hints in Python?',
    answer: 'Type hints add optional static typing. Use : for parameters, -> for return types. Run mypy for checking. Improves code clarity and IDE support.',
    codeExample: `from typing import List, Dict, Optional, Union, Callable

# Basic type hints
def greet(name: str) -> str:
    return f"Hello, {name}"

# Complex types
def process_users(users: List[Dict[str, str]]) -> None:
    for user in users:
        print(user["name"])

# Optional (can be None)
def get_user(id: int) -> Optional[User]:
    return db.find(id)

# Union types
def process(value: Union[str, int]) -> str:
    return str(value)

# Python 3.10+ syntax
def process(value: str | int) -> str:
    return str(value)

# Callable types
def apply(func: Callable[[int], int], value: int) -> int:
    return func(value)

# TypeVar for generics
from typing import TypeVar
T = TypeVar('T')

def first(items: List[T]) -> T:
    return items[0]`,
    technology: 'python',
    category: 'Type Hints',
    difficulty: 'medium',
    version: 'Python 3.10+',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'python-8',
    question: 'How do generators work in Python?',
    answer: 'Generators produce values lazily using yield. Memory efficient for large sequences. Use generator expressions for simple cases. Can send values back with .send().',
    codeExample: `# Generator function
def count_up_to(n):
    i = 0
    while i < n:
        yield i
        i += 1

# Using generator
for num in count_up_to(5):
    print(num)  # 0, 1, 2, 3, 4

# Generator expression (like list comp but lazy)
squares = (x**2 for x in range(1000000))
# No memory used until iteration

# Get values manually
gen = count_up_to(3)
next(gen)  # 0
next(gen)  # 1
next(gen)  # 2

# Send values into generator
def accumulator():
    total = 0
    while True:
        value = yield total
        total += value

acc = accumulator()
next(acc)  # Initialize
acc.send(10)  # 10
acc.send(5)   # 15`,
    technology: 'python',
    category: 'Advanced',
    difficulty: 'medium',
    version: 'Python 3.x',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'python-9',
    question: 'What are dataclasses in Python?',
    answer: 'Dataclasses auto-generate __init__, __repr__, __eq__, etc. Use @dataclass decorator. Reduces boilerplate for data containers. Supports defaults, frozen (immutable).',
    codeExample: `from dataclasses import dataclass, field
from typing import List

@dataclass
class User:
    name: str
    email: str
    age: int = 0  # Default value
    tags: List[str] = field(default_factory=list)

# Auto-generated __init__, __repr__, __eq__
user = User(name="Alice", email="alice@test.com")
print(user)  # User(name='Alice', email='alice@test.com', age=0, tags=[])

# Immutable dataclass
@dataclass(frozen=True)
class Point:
    x: float
    y: float

point = Point(1.0, 2.0)
# point.x = 3.0  # Error!

# Post-init processing
@dataclass
class Order:
    items: List[float]
    total: float = field(init=False)
    
    def __post_init__(self):
        self.total = sum(self.items)`,
    technology: 'python',
    category: 'Data Classes',
    difficulty: 'easy',
    version: 'Python 3.7+',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'python-10',
    question: 'What is the GIL and how does it affect threading?',
    answer: 'GIL (Global Interpreter Lock) allows only one thread to execute Python bytecode at a time. Limits CPU-bound parallelism. Use multiprocessing for CPU tasks, threading for I/O.',
    codeExample: `# Threading (good for I/O-bound)
import threading
import concurrent.futures

def fetch_url(url):
    # I/O bound - GIL released during I/O
    response = requests.get(url)
    return response.text

# Thread pool
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
    urls = ["http://api.com/1", "http://api.com/2"]
    results = list(executor.map(fetch_url, urls))

# Multiprocessing (good for CPU-bound)
from multiprocessing import Pool

def cpu_heavy(n):
    return sum(i * i for i in range(n))

# Process pool - bypasses GIL
with Pool(processes=4) as pool:
    results = pool.map(cpu_heavy, [1000000, 2000000])

# When to use which:
# I/O-bound (API calls, file I/O): threading or asyncio
# CPU-bound (calculations): multiprocessing
# Simple parallelism: concurrent.futures`,
    technology: 'python',
    category: 'Concurrency',
    difficulty: 'hard',
    version: 'Python 3.x',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'python-11',
    question: 'What is Structural Pattern Matching in Python 3.10+?',
    answer: 'Introduced in Python 3.10, match-case statements allow for powerful structural pattern matching, similar to switch statements in other languages but with advanced data extraction capabilities.',
    codeExample: `def handle_command(command):
    match command.split():
        case ["quit"]:
            print("Goodbye!")
        case ["load", filename]:
            print(f"Loading {filename}")
        case ["move", x, y] if int(y) > 0: # With guard
            print(f"Moving to {x}, {y}")
        case _:
            print("Unknown command")

handle_command("move 10 20")`,
    technology: 'python',
    category: 'Evolution',
    difficulty: 'medium',
    version: 'Python 3.10+',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'python-12',
    question: 'What is the Walrus Operator (:=)?',
    answer: 'The assignment expression operator (walrus) allows you to assign values to variables as part of an expression. This can lead to cleaner code in loops and conditional statements.',
    codeExample: `# Common use in while loops
while (line := file.readline()) != "":
    process(line)

# Use in conditionals
if (n := len(data)) > 10:
    print(f"Too many items: {n}")

# List comprehension filtering
results = [f(x) for x in data if (res := f(x)) > 0]`,
    technology: 'python',
    category: 'Evolution',
    difficulty: 'easy',
    version: 'Python 3.8+',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'python-13',
    question: 'How do Abstract Base Classes (ABCs) work in Python?',
    answer: 'ABCs define a common interface for a set of subclasses. They cannot be instantiated themselves and require subclasses to implement methods decorated with @abstractmethod.',
    codeExample: `from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return 3.14 * self.radius ** 2

# s = Shape() # Error! Cannot instantiate ABC`,
    technology: 'python',
    category: 'Advanced',
    difficulty: 'hard',
    version: 'Python 3.4+',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'python-14',
    question: 'Explain Method Resolution Order (MRO).',
    answer: 'MRO is the order in which Python searches for a method in a class hierarchy. It uses the C3 Linearization algorithm to handle multiple inheritance consistently. Access it via the __mro__ attribute.',
    codeExample: `class A:
    def greet(self): print("Hello from A")

class B(A):
    def greet(self): print("Hello from B")

class C(A):
    def greet(self): print("Hello from C")

class D(B, C):
    pass

d = D()
d.greet() # "Hello from B"
print(D.__mro__) # D -> B -> C -> A -> object`,
    technology: 'python',
    category: 'Advanced',
    difficulty: 'hard',
    version: 'Python 3.x',
    timesCorrect: 0,
    timesIncorrect: 0
  }
];
