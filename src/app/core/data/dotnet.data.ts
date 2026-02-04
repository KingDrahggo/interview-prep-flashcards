import { Flashcard } from '../models/flashcard.model';

export const DOTNET_CARDS: Flashcard[] = [
  {
    id: 'dotnet-1',
    question: 'What is .NET and what are its main components?',
    answer: '.NET is a cross-platform framework. Components: CLR (runtime), BCL (base class library), ASP.NET Core (web), Entity Framework (ORM), MAUI (cross-platform UI). Now unified as .NET 6+.',
    codeExample: `// .NET Evolution
.NET Framework (Windows only, legacy)
.NET Core (cross-platform, modern)
.NET 5+ (unified platform)

// Current .NET 8 Features
- Minimal APIs
- Native AOT compilation
- C# 12 features
- Blazor improvements
- Performance optimizations

// Simple ASP.NET Core API
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");
app.MapGet("/users/{id}", (int id) => 
    new User { Id = id, Name = "John" });

app.Run();`,
    technology: 'dotnet',
    category: 'Core',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'dotnet-2',
    question: 'What is Dependency Injection in ASP.NET Core?',
    answer: 'DI is built into ASP.NET Core. Register services in DI container with lifetimes: Transient (new each time), Scoped (per request), Singleton (one instance). Inject via constructor.',
    codeExample: `// Service Registration
builder.Services.AddTransient<IEmailService, EmailService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddSingleton<ICacheService, RedisCacheService>();

// Lifetimes
Transient  - New instance every injection
Scoped     - One per HTTP request
Singleton  - One for entire app lifetime

// Constructor Injection
public class UserController : ControllerBase
{
    private readonly IUserRepository _repo;
    private readonly ILogger<UserController> _logger;
    
    public UserController(
        IUserRepository repo,
        ILogger<UserController> logger)
    {
        _repo = repo;
        _logger = logger;
    }
}`,
    technology: 'dotnet',
    category: 'Web',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'dotnet-3',
    question: 'What is Entity Framework Core?',
    answer: 'EF Core is an ORM for .NET. Supports Code First (C# classes → DB) and DB First. Features: LINQ queries, change tracking, migrations, lazy/eager loading. Use DbContext.',
    codeExample: `// DbContext and Entity
public class AppDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Order> Orders { get; set; }
    
    protected override void OnModelCreating(
        ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
            .HasMany(u => u.Orders)
            .WithOne(o => o.User);
    }
}

// LINQ Queries
var users = await _context.Users
    .Where(u => u.IsActive)
    .Include(u => u.Orders)
    .OrderBy(u => u.Name)
    .ToListAsync();

// Migrations
dotnet ef migrations add InitialCreate
dotnet ef database update`,
    technology: 'dotnet',
    category: 'Database',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'dotnet-4',
    question: 'What are async/await and Task in C#?',
    answer: 'async/await enables non-blocking I/O. Methods return Task or Task<T>. await pauses execution until Task completes. Essential for scalable APIs. Avoid async void except for event handlers.',
    codeExample: `// Async method pattern
public async Task<User> GetUserAsync(int id)
{
    // Non-blocking database call
    var user = await _context.Users
        .FirstOrDefaultAsync(u => u.Id == id);
    
    return user;
}

// Parallel async operations
public async Task<Dashboard> GetDashboardAsync()
{
    var usersTask = GetUsersAsync();
    var ordersTask = GetOrdersAsync();
    var statsTask = GetStatsAsync();
    
    // Wait for all
    await Task.WhenAll(usersTask, ordersTask, statsTask);
    
    return new Dashboard
    {
        Users = usersTask.Result,
        Orders = ordersTask.Result,
        Stats = statsTask.Result
    };
}

// ❌ Avoid async void
// ✅ Use async Task`,
    technology: 'dotnet',
    category: 'Core',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'dotnet-5',
    question: 'What is the ASP.NET Core middleware pipeline?',
    answer: 'Middleware are components that handle requests/responses in a pipeline. Order matters! Each can process request, call next, or short-circuit. Common: auth, CORS, routing, error handling.',
    codeExample: `// Middleware Pipeline
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Order matters!
app.UseExceptionHandler("/error");  // First: catch errors
app.UseHsts();
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors();
app.UseAuthentication();            // Before Authorization
app.UseAuthorization();
app.MapControllers();               // Terminal

app.Run();

// Custom Middleware
app.Use(async (context, next) =>
{
    // Before next middleware
    var sw = Stopwatch.StartNew();
    
    await next();  // Call next
    
    // After response
    sw.Stop();
    Console.WriteLine($"Request took {sw.ElapsedMilliseconds}ms");
});`,
    technology: 'dotnet',
    category: 'Web',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'dotnet-6',
    question: 'What are Minimal APIs in .NET?',
    answer: 'Minimal APIs (introduced .NET 6) simplify web API creation. Less ceremony than controllers. Define routes directly with lambdas. Great for microservices and simple APIs.',
    codeExample: `// Minimal API Example
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();

// Route handlers
app.MapGet("/users", async (AppDbContext db) =>
    await db.Users.ToListAsync());

app.MapGet("/users/{id}", async (int id, AppDbContext db) =>
    await db.Users.FindAsync(id) is User user
        ? Results.Ok(user)
        : Results.NotFound());

app.MapPost("/users", async (User user, AppDbContext db) =>
{
    db.Users.Add(user);
    await db.SaveChangesAsync();
    return Results.Created($"/users/{user.Id}", user);
});

app.MapDelete("/users/{id}", async (int id, AppDbContext db) =>
{
    var user = await db.Users.FindAsync(id);
    if (user is null) return Results.NotFound();
    
    db.Users.Remove(user);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.Run();`,
    technology: 'dotnet',
    category: 'Web',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'dotnet-7',
    question: 'What is Blazor?',
    answer: 'Blazor builds interactive web UIs with C# instead of JavaScript. Two modes: Server (SignalR connection) and WebAssembly (runs in browser). Shares code between server and client.',
    codeExample: `// Blazor Component (Counter.razor)
@page "/counter"

<h1>Counter</h1>
<p>Current count: @currentCount</p>
<button @onclick="IncrementCount">Click me</button>

@code {
    private int currentCount = 0;

    private void IncrementCount()
    {
        currentCount++;
    }
}

// Data binding
<input @bind="searchText" @bind:event="oninput" />

// Component parameters
<UserCard User="@selectedUser" 
          OnSave="HandleSave" />

@code {
    [Parameter]
    public User User { get; set; }
    
    [Parameter]
    public EventCallback<User> OnSave { get; set; }
}`,
    technology: 'dotnet',
    category: 'Blazor',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'dotnet-8',
    question: 'What is LINQ and how do you use it?',
    answer: 'LINQ (Language Integrated Query) queries collections with SQL-like syntax. Works with arrays, lists, EF Core, XML. Two syntaxes: query (SQL-like) and method (lambda). Returns IEnumerable.',
    codeExample: `// Query Syntax
var adults = from user in users
             where user.Age >= 18
             orderby user.Name
             select new { user.Name, user.Email };

// Method Syntax (more common)
var adults = users
    .Where(u => u.Age >= 18)
    .OrderBy(u => u.Name)
    .Select(u => new { u.Name, u.Email });

// Common LINQ Methods
users.Where(u => u.IsActive)     // Filter
users.Select(u => u.Name)        // Transform
users.OrderBy(u => u.Date)       // Sort
users.GroupBy(u => u.Country)    // Group
users.FirstOrDefault()           // Single item
users.Any(u => u.IsAdmin)        // Exists
users.Count()                    // Count
users.Sum(u => u.Total)          // Aggregate
users.Skip(10).Take(20)          // Pagination

// Join
var result = users.Join(orders,
    u => u.Id,
    o => o.UserId,
    (user, order) => new { user.Name, order.Total });`,
    technology: 'dotnet',
    category: 'Core',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'dotnet-9',
    question: 'How do you handle authentication in ASP.NET Core?',
    answer: 'Use Identity for user management, JWT for APIs, Cookie for web apps. AddAuthentication() registers schemes. [Authorize] protects endpoints. Claims-based identity for roles/permissions.',
    codeExample: `// JWT Authentication Setup
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new()
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidIssuer = config["Jwt:Issuer"],
            ValidAudience = config["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(config["Jwt:Key"]))
        };
    });

// Generate JWT Token
var claims = new[] {
    new Claim(ClaimTypes.Name, user.Username),
    new Claim(ClaimTypes.Role, "Admin")
};

var token = new JwtSecurityToken(
    issuer: config["Jwt:Issuer"],
    audience: config["Jwt:Audience"],
    claims: claims,
    expires: DateTime.Now.AddHours(1),
    signingCredentials: credentials);

// Protect endpoints
[Authorize(Roles = "Admin")]
public IActionResult AdminOnly() => Ok();`,
    technology: 'dotnet',
    category: 'Security',
    difficulty: 'hard',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'dotnet-10',
    question: 'What are Records in C#?',
    answer: 'Records are immutable reference types with value-based equality. Great for DTOs and domain objects. Auto-generates Equals, GetHashCode, ToString. Use "with" for copies with modifications.',
    codeExample: `// Record (C# 9+)
public record Person(string Name, int Age);

// Usage
var person1 = new Person("John", 30);
var person2 = new Person("John", 30);

// Value equality
Console.WriteLine(person1 == person2);  // true

// With expression (copy with changes)
var person3 = person1 with { Age = 31 };

// Record with extra members
public record Product(string Name, decimal Price)
{
    public decimal PriceWithTax => Price * 1.2m;
}

// Record struct (value type)
public readonly record struct Point(int X, int Y);

// DTO pattern
public record CreateUserRequest(
    string Email,
    string Password,
    string Name);
    
public record UserResponse(
    int Id,
    string Email,
    DateTime CreatedAt);`,
    technology: 'dotnet',
    category: 'Core',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  }
];
