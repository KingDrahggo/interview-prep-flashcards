import { Flashcard } from '../models/flashcard.model';

export const NESTJS_CARDS: Flashcard[] = [
  // ═══════════════════════════════════════════════════════
  // CORE CONCEPTS
  // ═══════════════════════════════════════════════════════
  {
    id: 'nest-1',
    question: 'What is NestJS and what makes it different from Express?',
    answer: 'NestJS is a framework for building scalable Node.js applications. Built on Express/Fastify with TypeScript. Features: decorators, dependency injection, modular architecture, out-of-box architecture patterns.',
    codeExample: `// NestJS uses decorators and DI
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
  
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }
}

// vs Express
app.get('/users', (req, res) => {
  userService.findAll().then(users => res.json(users));
});`,
    technology: 'nestjs',
    category: 'Core',
    difficulty: 'easy',
    version: 'NestJS 10.x',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'nest-2',
    question: 'What are NestJS modules and how do they work?',
    answer: 'Modules organize the application into cohesive blocks. Every app has a root module (AppModule). Modules declare providers, controllers, imports, and exports.',
    codeExample: `@Module({
  imports: [
    DatabaseModule,       // Import other modules
    AuthModule
  ],
  controllers: [
    UserController        // Handle requests
  ],
  providers: [
    UserService,          // Business logic
    UserRepository        // Data access
  ],
  exports: [
    UserService           // Make available to other modules
  ]
})
export class UserModule {}

// Root module
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dbConfig),
    UserModule,
    AuthModule
  ]
})
export class AppModule {}`,
    technology: 'nestjs',
    category: 'Modules',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'nest-3',
    question: 'Explain NestJS Dependency Injection.',
    answer: 'NestJS has a built-in IoC container. Mark classes with @Injectable(). Inject via constructor. Providers are singleton by default. Supports multiple scopes.',
    codeExample: `// Mark as injectable
@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly logger: LoggerService
  ) {}
  
  async findAll(): Promise<User[]> {
    this.logger.log('Finding all users');
    return this.userRepo.findAll();
  }
}

// Register in module
@Module({
  providers: [UserService, UserRepository, LoggerService],
  exports: [UserService]
})
export class UserModule {}

// Inject in controller
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
}

// Provider scopes
@Injectable({ scope: Scope.DEFAULT })   // Singleton (default)
@Injectable({ scope: Scope.REQUEST })   // Per request
@Injectable({ scope: Scope.TRANSIENT }) // New instance each inject`,
    technology: 'nestjs',
    category: 'Dependency Injection',
    difficulty: 'medium',
    version: 'NestJS 9+',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // CONTROLLERS & ROUTING
  // ═══════════════════════════════════════════════════════
  {
    id: 'nest-4',
    question: 'What are decorators for handling requests in NestJS?',
    answer: '@Controller defines route prefix. @Get, @Post, @Put, @Patch, @Delete for methods. @Body, @Param, @Query for extracting data. @Headers, @Res for advanced use.',
    codeExample: `@Controller('users')
export class UserController {
  @Get()                              // GET /users
  findAll(@Query('limit') limit: number) {}
  
  @Get(':id')                         // GET /users/:id
  findOne(@Param('id') id: string) {}
  
  @Post()                             // POST /users
  create(@Body() dto: CreateUserDto) {}
  
  @Put(':id')                         // PUT /users/:id
  update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto
  ) {}
  
  @Delete(':id')                      // DELETE /users/:id
  remove(@Param('id') id: string) {}
  
  @HttpCode(204)                      // Custom status code
  @Header('Cache-Control', 'none')    // Custom header
  @Post('action')
  performAction() {}
}`,
    technology: 'nestjs',
    category: 'Controllers',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'nest-5',
    question: 'How do you validate request data in NestJS?',
    answer: 'Use class-validator decorators with DTOs. Enable ValidationPipe globally. Automatic transformation and validation with whitelist option.',
    codeExample: `// DTO with validation decorators
import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;
  
  @IsString()
  @MinLength(8)
  password: string;
  
  @IsString()
  @IsOptional()
  name?: string;
}

// Enable ValidationPipe globally
// main.ts
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,       // Strip non-decorated properties
  forbidNonWhitelisted: true,  // Throw on extra properties
  transform: true        // Transform to DTO types
}));

// Controller uses DTO
@Post()
create(@Body() createUserDto: CreateUserDto): Promise<User> {
  // createUserDto is validated and typed
  return this.userService.create(createUserDto);
}`,
    technology: 'nestjs',
    category: 'Validation',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // GUARDS & AUTH
  // ═══════════════════════════════════════════════════════
  {
    id: 'nest-6',
    question: 'What are Guards in NestJS?',
    answer: 'Guards determine if a request should proceed. Used for authentication/authorization. Implement CanActivate interface. Return true to allow, false to deny.',
    codeExample: `@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    
    if (!token) return false;
    
    try {
      const payload = await this.jwtService.verify(token);
      request.user = payload;
      return true;
    } catch {
      return false;
    }
  }
}

// Apply to controller or method
@Controller('users')
@UseGuards(AuthGuard)
export class UserController {}

// Global guard
app.useGlobalGuards(new AuthGuard());

// Role-based guard
@SetMetadata('roles', ['admin'])
@UseGuards(RolesGuard)
@Delete(':id')
remove(@Param('id') id: string) {}`,
    technology: 'nestjs',
    category: 'Guards',
    difficulty: 'hard',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'nest-7',
    question: 'How do you implement JWT authentication in NestJS?',
    answer: 'Use @nestjs/jwt and @nestjs/passport. Create AuthModule with JwtModule. Implement LocalStrategy for login, JwtStrategy for protected routes.',
    codeExample: `// auth.module.ts
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' }
    }),
    PassportModule
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}

// jwt.strategy.ts
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    });
  }
  
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}

// Use in controller
@UseGuards(JwtAuthGuard)
@Get('profile')
getProfile(@Request() req) {
  return req.user;
}`,
    technology: 'nestjs',
    category: 'Authentication',
    difficulty: 'hard',
    version: '@nestjs/jwt',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // PIPES & INTERCEPTORS
  // ═══════════════════════════════════════════════════════
  {
    id: 'nest-8',
    question: 'What are Pipes in NestJS?',
    answer: 'Pipes transform and validate input data. Run before method handler. Built-in pipes: ValidationPipe, ParseIntPipe, ParseUUIDPipe. Can create custom pipes.',
    codeExample: `// Built-in pipes
@Get(':id')
findOne(@Param('id', ParseIntPipe) id: number) {
  // id is guaranteed to be a number
}

@Get(':uuid')
findByUuid(@Param('uuid', ParseUUIDPipe) uuid: string) {}

// Custom pipe
@Injectable()
export class TrimPipe implements PipeTransform {
  transform(value: any): any {
    if (typeof value === 'string') {
      return value.trim();
    }
    return value;
  }
}

// Usage
@Post()
create(@Body('name', TrimPipe) name: string) {}

// Validation pipe with options
@UsePipes(new ValidationPipe({ transform: true }))
@Post()
create(@Body() dto: CreateDto) {}`,
    technology: 'nestjs',
    category: 'Pipes',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'nest-9',
    question: 'What are Interceptors in NestJS?',
    answer: 'Interceptors wrap request/response handling. Use RxJS observables. Can transform responses, add logging, cache, handle errors. Execute before/after handler.',
    codeExample: `@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    
    return next.handle().pipe(
      tap(() => console.log(\`After... \${Date.now() - now}ms\`))
    );
  }
}

// Transform response
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => ({
        data,
        timestamp: new Date().toISOString(),
        statusCode: context.switchToHttp().getResponse().statusCode
      }))
    );
  }
}

// Apply
@UseInterceptors(LoggingInterceptor)
@Controller('users')
export class UserController {}`,
    technology: 'nestjs',
    category: 'Interceptors',
    difficulty: 'hard',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // DATABASE & ORM
  // ═══════════════════════════════════════════════════════
  {
    id: 'nest-10',
    question: 'How do you integrate TypeORM with NestJS?',
    answer: 'Use @nestjs/typeorm package. Configure in AppModule with forRoot(). Define entities with decorators. Inject repositories in services.',
    codeExample: `// app.module.ts
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      database: 'mydb',
      entities: [User],
      synchronize: true // DEV only!
    }),
    UserModule
  ]
})
export class AppModule {}

// user.entity.ts
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ unique: true })
  email: string;
  
  @OneToMany(() => Post, post => post.author)
  posts: Post[];
}

// user.module.ts
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
})
export class UserModule {}

// user.service.ts
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}
  
  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }
}`,
    technology: 'nestjs',
    category: 'Database',
    difficulty: 'medium',
    version: '@nestjs/typeorm',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // TESTING
  // ═══════════════════════════════════════════════════════
  {
    id: 'nest-11',
    question: 'How do you test NestJS applications?',
    answer: 'Use @nestjs/testing with Testing.createTestingModule(). Mock providers. Test controllers and services separately. Use supertest for e2e tests.',
    codeExample: `// Unit testing service
describe('UserService', () => {
  let service: UserService;
  let mockRepo: jest.Mocked<Repository<User>>;
  
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn()
          }
        }
      ]
    }).compile();
    
    service = module.get(UserService);
    mockRepo = module.get(getRepositoryToken(User));
  });
  
  it('should find all users', async () => {
    const users = [{ id: '1', email: 'test@test.com' }];
    mockRepo.find.mockResolvedValue(users);
    
    expect(await service.findAll()).toEqual(users);
  });
});`,
    technology: 'nestjs',
    category: 'Testing',
    difficulty: 'hard',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'nest-12',
    question: 'What is the NestJS request lifecycle?',
    answer: 'Request flows through: Middleware → Guards → Interceptors (before) → Pipes → Controller → Service → Interceptors (after) → Exception Filters → Response.',
    codeExample: `// Request Lifecycle (in order)
1. Middleware     - raw request, express-style
2. Guards         - authorization check
3. Interceptors   - pre-processing (before handler)
4. Pipes          - validation & transformation
5. Controller     - route handler
6. Service        - business logic
7. Interceptors   - post-processing (after handler)
8. Exception Filters - error handling

// Everything flows through:
@Module({
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_PIPE, useClass: ValidationPipe },
    { provide: APP_FILTER, useClass: AllExceptionsFilter }
  ]
})

// Order of execution example
Middleware: "Request received"
Guard: "Checking auth..."
Interceptor: "Before handler..."
Pipe: "Validating input..."
Controller: "Handling request..."
Interceptor: "After handler... took 50ms"`,
    technology: 'nestjs',
    category: 'Core',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  }
];
