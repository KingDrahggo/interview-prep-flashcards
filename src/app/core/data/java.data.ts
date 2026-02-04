import { Flashcard } from '../models/flashcard.model';

export const JAVA_CARDS: Flashcard[] = [
  {
    id: 'java-1',
    question: 'What are the main Java features and principles?',
    answer: 'Java is OOP, platform-independent (JVM), strongly typed. Key: Write Once Run Anywhere, automatic garbage collection, multithreading, rich standard library. Current LTS: Java 21.',
    codeExample: `// Java Principles
1. Object-Oriented (Classes, Inheritance, Polymorphism)
2. Platform Independent (Bytecode + JVM)
3. Strongly Typed (compile-time checks)

public class Main {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>();
        names.add("John");
        names.forEach(name -> System.out.println(name));
    }
}`,
    technology: 'java',
    category: 'Core',
    difficulty: 'easy',
    version: 'Java 21 LTS',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'java-2',
    question: 'What is the difference between == and equals()?',
    answer: '== compares references (memory addresses). equals() compares content. For objects, use equals(). For primitives, use ==. Always override equals() and hashCode() together.',
    codeExample: `String a = new String("hello");
String b = new String("hello");

a == b        // false (different objects)
a.equals(b)   // true (same content)

@Override
public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null) return false;
    User user = (User) o;
    return Objects.equals(id, user.id);
}`,
    technology: 'java',
    category: 'Core',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'java-3',
    question: 'What are Java Collections and when to use each?',
    answer: 'List (ordered): ArrayList, LinkedList. Set (no duplicates): HashSet, TreeSet. Map (key-value): HashMap, TreeMap. Choose based on access pattern and requirements.',
    codeExample: `// List - ordered, allows duplicates
ArrayList<String>  // O(1) random access
LinkedList<String> // O(1) insert/delete

// Set - no duplicates
HashSet<String>    // O(1), unordered
TreeSet<String>    // O(log n), sorted

// Map - key/value pairs
HashMap<K,V>       // O(1) get/put
TreeMap<K,V>       // O(log n), sorted`,
    technology: 'java',
    category: 'Collections',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'java-4',
    question: 'What are Java Streams and how do you use them?',
    answer: 'Streams (Java 8+) process collections functionally. Operations: filter, map, reduce, collect. Lazy evaluation. Can be parallel. Do not modify source collection.',
    codeExample: `List<String> activeNames = users.stream()
    .filter(u -> u.isActive())
    .map(User::getName)
    .sorted()
    .collect(Collectors.toList());

// Grouping
Map<String, List<User>> byCountry = users.stream()
    .collect(Collectors.groupingBy(User::getCountry));`,
    technology: 'java',
    category: 'Streams',
    difficulty: 'medium',
    version: 'Java 8+',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'java-5',
    question: 'What is Optional and how should you use it?',
    answer: 'Optional wraps potentially null values. Prevents NullPointerException. Use orElse, orElseGet, orElseThrow. Never use for fields or parameters.',
    codeExample: `Optional<User> user = Optional.ofNullable(maybeNull);

user.orElse(defaultUser);
user.orElseThrow(() -> new NotFoundException());
user.ifPresent(u -> sendEmail(u));

Optional<String> name = user
    .map(User::getName)
    .filter(n -> n.length() > 0);`,
    technology: 'java',
    category: 'Core',
    difficulty: 'medium',
    version: 'Java 8+',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'java-6',
    question: 'What is the difference between abstract class and interface?',
    answer: 'Abstract class: partial implementation, single inheritance, can have state. Interface: contract, multiple implementation, default methods (Java 8+). Prefer interfaces.',
    codeExample: `// Abstract Class
public abstract class Animal {
    protected String name;
    public abstract void makeSound();
}

// Interface with default method
public interface Flyable {
    void fly();
    default void land() { System.out.println("Landing"); }
}

// Class extends ONE, implements MANY
public class Bird extends Animal implements Flyable { }`,
    technology: 'java',
    category: 'OOP',
    difficulty: 'medium',
    version: 'Java 8+',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'java-7',
    question: 'How does exception handling work in Java?',
    answer: 'Checked exceptions must handle or declare. Unchecked (RuntimeException) are optional. Use try-with-resources for AutoCloseable. Create custom exceptions for domain errors.',
    codeExample: `// try-with-resources (auto-closes)
try (var reader = new BufferedReader(new FileReader(path))) {
    String line = reader.readLine();
} catch (IOException e) {
    logger.error("Failed to read", e);
}

// Custom Exception
public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(Long id) {
        super("User not found: " + id);
    }
}`,
    technology: 'java',
    category: 'Core',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'java-8',
    question: 'What are Generics and why use them?',
    answer: 'Generics provide compile-time type safety. Avoid casts and ClassCastException. Use <T> for types, <?> wildcard, extends/super for bounds.',
    codeExample: `public class Box<T> {
    private T content;
    public void set(T content) { this.content = content; }
    public T get() { return content; }
}

Box<String> box = new Box<>();
box.set("Hello");
String s = box.get();  // No cast needed

// PECS: Producer Extends, Consumer Super
List<? extends Number>  // read
List<? super Integer>   // write`,
    technology: 'java',
    category: 'Core',
    difficulty: 'hard',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'java-9',
    question: 'What are Records in Java?',
    answer: 'Records (Java 14+) are immutable data carriers. Auto-generates constructor, getters, equals(), hashCode(), toString(). Great for DTOs and value objects.',
    codeExample: `// Record Declaration
public record User(String name, String email, int age) {}

User user = new User("John", "john@email.com", 30);
String name = user.name();  // No "get" prefix

// With validation
public record User(String name, String email) {
    public User {
        if (email == null) throw new IllegalArgumentException();
        email = email.toLowerCase();
    }
}`,
    technology: 'java',
    category: 'Core',
    difficulty: 'medium',
    version: 'Java 14+',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'java-10',
    question: 'What is multithreading in Java?',
    answer: 'Java supports concurrent programming. Use Thread, Runnable, ExecutorService. Synchronized for thread safety. CompletableFuture for async operations. Avoid shared mutable state.',
    codeExample: `// ExecutorService (preferred)
ExecutorService executor = Executors.newFixedThreadPool(4);
executor.submit(() -> processTask());

// CompletableFuture (async)
CompletableFuture.supplyAsync(() -> fetchUser(id))
    .thenApply(user -> enrichUser(user))
    .thenAccept(user -> saveUser(user));

// Synchronized for thread safety
public synchronized void increment() {
    count++;
}`,
    technology: 'java',
    category: 'Concurrency',
    difficulty: 'hard',
    version: 'Java 8+',
    timesCorrect: 0,
    timesIncorrect: 0
  }
];
