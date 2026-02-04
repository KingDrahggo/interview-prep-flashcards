import { Flashcard } from '../models/flashcard.model';

export const SPRINGBOOT_CARDS: Flashcard[] = [
  {
    id: 'spring-1',
    question: 'What is Spring Boot and how does it differ from Spring?',
    answer: 'Spring Boot is opinionated Spring framework with auto-configuration, embedded servers, and starter dependencies. Reduces boilerplate. Convention over configuration. Production-ready defaults.',
    codeExample: `// Spring Boot Entry Point
@SpringBootApplication  // Combines 3 annotations
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

// @SpringBootApplication includes:
// @Configuration - Java-based config
// @EnableAutoConfiguration - Auto-config
// @ComponentScan - Find beans`,
    technology: 'springboot',
    category: 'Core',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'spring-2',
    question: 'What is Dependency Injection in Spring?',
    answer: 'DI is core Spring principle. Container manages object creation and wiring. Use @Autowired, constructor injection (preferred), or setter injection. Promotes loose coupling.',
    codeExample: `// Constructor Injection (preferred)
@Service
public class UserService {
    private final UserRepository repository;
    private final EmailService emailService;
    
    public UserService(UserRepository repository, 
                       EmailService emailService) {
        this.repository = repository;
        this.emailService = emailService;
    }
}

// Bean Scopes
@Scope("singleton")  // Default, one instance
@Scope("prototype")  // New each injection
@Scope("request")    // Per HTTP request
@Scope("session")    // Per HTTP session`,
    technology: 'springboot',
    category: 'Core',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'spring-3',
    question: 'What are the common Spring stereotypes?',
    answer: '@Component (generic), @Service (business logic), @Repository (data access), @Controller (web). All are component-scanned. Use @RestController for REST APIs.',
    codeExample: `@Component     // Generic Spring bean
@Service       // Business logic layer
@Repository    // Data access, exception translation
@Controller    // MVC controller
@RestController // = @Controller + @ResponseBody

// REST Controller
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @GetMapping
    public List<User> getAll() { ... }
    
    @GetMapping("/{id}")
    public User getById(@PathVariable Long id) { ... }
    
    @PostMapping
    public User create(@RequestBody User user) { ... }
    
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { ... }
}`,
    technology: 'springboot',
    category: 'Web',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'spring-4',
    question: 'What is Spring Data JPA?',
    answer: 'Spring Data JPA simplifies data access. Define interface extending JpaRepository, get CRUD for free. Query methods from method names. @Query for custom queries.',
    codeExample: `// Entity
@Entity
@Table(name = "users")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    @OneToMany(mappedBy = "user")
    private List<Order> orders;
}

// Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Auto-implemented from method name
    List<User> findByEmailContaining(String email);
    Optional<User> findByEmail(String email);
    
    // Custom query
    @Query("SELECT u FROM User u WHERE u.active = true")
    List<User> findAllActive();
}`,
    technology: 'springboot',
    category: 'Data',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'spring-5',
    question: 'How do you handle validation in Spring Boot?',
    answer: 'Use Bean Validation (JSR-380) with @Valid. Annotations: @NotNull, @Size, @Email, @Pattern. @Validated for groups. Handle with @ExceptionHandler or @ControllerAdvice.',
    codeExample: `// DTO with validation
public record CreateUserRequest(
    @NotBlank String name,
    @Email @NotNull String email,
    @Size(min = 8) String password
) {}

// Controller
@PostMapping
public User create(@Valid @RequestBody CreateUserRequest req) {
    return userService.create(req);
}

// Global exception handler
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidation(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors()
            .forEach(e -> errors.put(e.getField(), e.getDefaultMessage()));
        return ResponseEntity.badRequest().body(errors);
    }
}`,
    technology: 'springboot',
    category: 'Web',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'spring-6',
    question: 'What is Spring Security?',
    answer: 'Spring Security handles authentication and authorization. Configures via SecurityFilterChain. Supports JWT, OAuth2, form login. Use @PreAuthorize for method security.',
    codeExample: `@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) 
            throws Exception {
        return http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2.jwt())
            .build();
    }
}

// Method-level security
@PreAuthorize("hasRole('ADMIN')")
public void deleteUser(Long id) { ... }

@PreAuthorize("#userId == authentication.principal.id")
public User getUser(Long userId) { ... }`,
    technology: 'springboot',
    category: 'Security',
    difficulty: 'hard',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'spring-7',
    question: 'What is @Transactional in Spring?',
    answer: '@Transactional manages database transactions. Apply at class or method level. Defaults: propagation=REQUIRED, isolation=DEFAULT. Rollback on unchecked exceptions.',
    codeExample: `@Service
public class OrderService {
    
    @Transactional  // Atomic operation
    public Order createOrder(OrderRequest request) {
        Order order = new Order(request);
        orderRepo.save(order);
        
        // Update inventory (same transaction)
        inventoryService.reduce(request.getItems());
        
        // Send notification
        notificationService.send(order);
        
        return order;
    }
    
    @Transactional(readOnly = true)  // Optimization
    public List<Order> getOrders() {
        return orderRepo.findAll();
    }
    
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void logAudit(String action) {
        // Separate transaction
    }
}`,
    technology: 'springboot',
    category: 'Data',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'spring-8',
    question: 'How do you configure application properties?',
    answer: 'Use application.properties or application.yml. Profiles: application-{profile}.yml. @Value for single values. @ConfigurationProperties for type-safe config.',
    codeExample: `# application.yml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/mydb
    username: \${DB_USER}
    password: \${DB_PASSWORD}
    
app:
  jwt:
    secret: \${JWT_SECRET}
    expiration: 86400000

---
# application-prod.yml (profile)
spring:
  datasource:
    url: jdbc:postgresql://prod-db:5432/mydb

// Type-safe config
@ConfigurationProperties(prefix = "app.jwt")
public record JwtProperties(String secret, long expiration) {}

// Enable and use
@EnableConfigurationProperties(JwtProperties.class)
public class JwtService {
    private final JwtProperties props;
}`,
    technology: 'springboot',
    category: 'Config',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'spring-9',
    question: 'What is Spring Boot Actuator?',
    answer: 'Actuator provides production-ready features: health checks, metrics, info. Endpoints: /actuator/health, /actuator/metrics. Integrates with Prometheus, Micrometer.',
    codeExample: `# Enable actuator endpoints
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
  endpoint:
    health:
      show-details: always

// Custom health indicator
@Component
public class DatabaseHealthIndicator implements HealthIndicator {
    @Override
    public Health health() {
        if (isDatabaseUp()) {
            return Health.up()
                .withDetail("database", "PostgreSQL")
                .build();
        }
        return Health.down()
            .withDetail("error", "Cannot connect")
            .build();
    }
}

// Endpoints
// GET /actuator/health
// GET /actuator/metrics/jvm.memory.used
// GET /actuator/prometheus`,
    technology: 'springboot',
    category: 'DevOps',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'spring-10',
    question: 'How do you test Spring Boot applications?',
    answer: 'Use @SpringBootTest for integration tests. @WebMvcTest for controllers. @DataJpaTest for repositories. MockMvc for HTTP testing. TestContainers for real databases.',
    codeExample: `// Integration test
@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {
    @Autowired MockMvc mockMvc;
    @MockBean UserService userService;
    
    @Test
    void shouldGetUser() throws Exception {
        when(userService.findById(1L))
            .thenReturn(Optional.of(new User("John")));
        
        mockMvc.perform(get("/api/users/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("John"));
    }
}

// Repository test
@DataJpaTest
class UserRepositoryTest {
    @Autowired UserRepository repository;
    
    @Test
    void shouldFindByEmail() {
        repository.save(new User("test@email.com"));
        var user = repository.findByEmail("test@email.com");
        assertThat(user).isPresent();
    }
}`,
    technology: 'springboot',
    category: 'Testing',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  }
];
