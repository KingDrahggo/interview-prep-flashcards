import { Flashcard } from '../models/flashcard.model';

export const ANGULAR_CARDS: Flashcard[] = [
  // ═══════════════════════════════════════════════════════
  // LIFECYCLE HOOKS
  // ═══════════════════════════════════════════════════════
  {
    id: 'ng-1',
    question: 'What is ngOnInit and when should you use it?',
    answer: 'ngOnInit runs ONCE after the first ngOnChanges. Use it to initialize component logic, fetch data, and set up subscriptions. Inputs are available here. Do NOT access ViewChild here (not ready yet).',
    codeExample: `@Component({...})
export class UserComponent implements OnInit {
  @Input() userId!: string;
  user: User | null = null;
  
  constructor(private userService: UserService) {}
  
  ngOnInit(): void {
    // ✅ Good: Fetch data based on input
    this.userService.getUser(this.userId)
      .subscribe(user => this.user = user);
  }
}`,
    technology: 'angular',
    category: 'Lifecycle Hooks',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'ng-2',
    question: 'What is ngOnChanges and when does it run?',
    answer: 'ngOnChanges runs BEFORE ngOnInit and whenever an @Input() property changes. It receives a SimpleChanges object with previous and current values. Great for reacting to input changes.',
    codeExample: `ngOnChanges(changes: SimpleChanges): void {
  if (changes['data']) {
    const prev = changes['data'].previousValue;
    const curr = changes['data'].currentValue;
    const isFirst = changes['data'].firstChange;
    
    console.log('Data changed:', prev, '→', curr);
    this.redrawChart();
  }
}`,
    technology: 'angular',
    category: 'Lifecycle Hooks',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'ng-3',
    question: 'What is ngAfterViewInit and why is it important?',
    answer: 'ngAfterViewInit runs ONCE after the component view and child views are initialized. This is when @ViewChild references become available. Use it for DOM manipulation and initializing UI libraries.',
    codeExample: `@Component({
  template: \`<input #searchInput>\`
})
export class SearchComponent implements AfterViewInit {
  @ViewChild('searchInput') inputRef!: ElementRef;
  
  ngAfterViewInit(): void {
    // ✅ ViewChild is now available
    this.inputRef.nativeElement.focus();
    
    // ⚠️ Avoid changing data here
    // (causes ExpressionChangedAfterItHasBeenCheckedError)
  }
}`,
    technology: 'angular',
    category: 'Lifecycle Hooks',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'ng-4',
    question: 'What is ngOnDestroy and why is it critical?',
    answer: 'ngOnDestroy runs when a component is destroyed. CRITICAL for cleanup: unsubscribe from Observables, clear timers, remove event listeners. Forgetting this causes MEMORY LEAKS!',
    codeExample: `export class DataComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  
  ngOnInit(): void {
    this.dataService.getData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.data = data);
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    // All subscriptions cleaned up!
  }
}`,
    technology: 'angular',
    category: 'Lifecycle Hooks',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // SIGNALS
  // ═══════════════════════════════════════════════════════
  {
    id: 'ng-5',
    question: 'How do you create and use a Signal in Angular?',
    answer: 'signal() creates a reactive value. Read with (), write with .set(), .update(). Signals are synchronous and auto-tracked by change detection.',
    codeExample: `import { signal, computed } from '@angular/core';

@Component({...})
export class CounterComponent {
  count = signal(0);
  
  // Read: call the signal as a function
  // Template: {{ count() }}
  
  increment() {
    this.count.set(10);        // Replace value
    this.count.update(n => n + 1); // Update based on prev
  }
}`,
    technology: 'angular',
    category: 'Signals',
    difficulty: 'easy',
    version: 'Angular 16+',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'ng-6',
    question: 'What is computed() and how does it work?',
    answer: 'computed() creates a derived signal that automatically updates when its dependencies change. It is lazy (only calculates when read) and memoized (caches until dependencies change).',
    codeExample: `@Component({...})
export class CartComponent {
  items = signal<CartItem[]>([]);
  taxRate = signal(0.08);
  
  // Computed: automatically recalculates
  subtotal = computed(() => 
    this.items().reduce((sum, item) => sum + item.price, 0)
  );
  
  tax = computed(() => this.subtotal() * this.taxRate());
  total = computed(() => this.subtotal() + this.tax());
}`,
    technology: 'angular',
    category: 'Signals',
    difficulty: 'medium',
    version: 'Angular 16+',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'ng-7',
    question: 'What is effect() and when should you use it?',
    answer: 'effect() runs side effects whenever signals it reads change. Use for logging, analytics, syncing with external systems. Must run in injection context.',
    codeExample: `@Component({...})
export class ThemeComponent {
  isDarkMode = signal(false);
  
  constructor() {
    effect(() => {
      const dark = this.isDarkMode();
      document.body.classList.toggle('dark-mode', dark);
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    });
  }
}`,
    technology: 'angular',
    category: 'Signals',
    difficulty: 'medium',
    version: 'Angular 16+',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // RxJS
  // ═══════════════════════════════════════════════════════
  {
    id: 'ng-8',
    question: 'What is switchMap and when should you use it?',
    answer: 'switchMap maps to a new Observable and CANCELS the previous one. Perfect for search/autocomplete and HTTP requests where you only want the latest result.',
    codeExample: `// Search with switchMap - cancels previous request
this.searchControl.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(term => this.api.search(term))
).subscribe(results => this.results = results);

// Route params - cancel previous data fetch
this.route.params.pipe(
  switchMap(params => this.api.getUser(params['id']))
).subscribe(user => this.user = user);`,
    technology: 'angular',
    category: 'RxJS',
    difficulty: 'hard',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'ng-9',
    question: 'What is BehaviorSubject and how is it different from Subject?',
    answer: 'BehaviorSubject requires an initial value and immediately emits the current value to new subscribers. Subject has no initial value and only emits after subscribe.',
    codeExample: `// Subject - no initial value
const subject = new Subject<string>();
subject.subscribe(v => console.log(v)); // Nothing yet
subject.next('hello'); // Logs: 'hello'

// BehaviorSubject - has current value
const behavior = new BehaviorSubject<string>('initial');
behavior.subscribe(v => console.log(v)); // Logs: 'initial'
behavior.next('updated'); // Logs: 'updated'

// Get current value synchronously
console.log(behavior.getValue()); // 'updated'`,
    technology: 'angular',
    category: 'RxJS',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'ng-10',
    question: 'What is the difference between mergeMap, concatMap, and exhaustMap?',
    answer: 'mergeMap: parallel execution. concatMap: sequential, ordered. exhaustMap: ignores new until current completes. switchMap: cancels previous, runs latest.',
    codeExample: `// mergeMap - parallel uploads
files$.pipe(mergeMap(file => upload(file))).subscribe();

// concatMap - sequential, ordered
actions$.pipe(concatMap(a => save(a))).subscribe();

// exhaustMap - prevent double submit
submitBtn$.pipe(
  exhaustMap(() => this.api.submit())
).subscribe();

// switchMap - only latest
search$.pipe(switchMap(term => search(term))).subscribe();`,
    technology: 'angular',
    category: 'RxJS',
    difficulty: 'hard',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // CHANGE DETECTION
  // ═══════════════════════════════════════════════════════
  {
    id: 'ng-11',
    question: 'What is OnPush change detection strategy?',
    answer: 'OnPush only checks when: 1) Input reference changes, 2) Event from component/child, 3) Async pipe emits, 4) Signal changes, 5) markForCheck() called.',
    codeExample: `@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
  @Input() items: Item[] = [];
  
  // ❌ Won't trigger update (mutation)
  addWrong(item: Item) {
    this.items.push(item);
  }
  
  // ✅ Triggers update (new reference)
  addRight(item: Item) {
    this.items = [...this.items, item];
  }
}`,
    technology: 'angular',
    category: 'Change Detection',
    difficulty: 'hard',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // DEPENDENCY INJECTION
  // ═══════════════════════════════════════════════════════
  {
    id: 'ng-12',
    question: 'What are the different providedIn options for services?',
    answer: 'providedIn: "root" = app singleton (recommended). providedIn: "any" = one per lazy module. No providedIn = must provide manually.',
    codeExample: `// Singleton (one instance for entire app)
@Injectable({ providedIn: 'root' })
export class AuthService {}

// Instance per lazy module
@Injectable({ providedIn: 'any' })
export class FeatureService {}

// Manual providing (new instance per component)
@Injectable()
export class LocalService {}

@Component({
  providers: [LocalService] // New instance here
})`,
    technology: 'angular',
    category: 'Dependency Injection',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'ng-13',
    question: 'How do you use InjectionToken for non-class dependencies?',
    answer: 'InjectionToken creates a token for values that aren\'t classes (strings, objects, configs). Provide with useValue or useFactory.',
    codeExample: `// Create token
export const API_URL = new InjectionToken<string>('api.url');

// Provide
providers: [
  { provide: API_URL, useValue: 'https://api.example.com' },
  { 
    provide: CONFIG, 
    useFactory: () => ({ debug: !environment.production })
  }
]

// Inject
private url = inject(API_URL);`,
    technology: 'angular',
    category: 'Dependency Injection',
    difficulty: 'hard',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // NgRx
  // ═══════════════════════════════════════════════════════
  {
    id: 'ng-14',
    question: 'What is NgRx and what are its core parts?',
    answer: 'NgRx is Redux-based state management. Store holds state, Actions describe events, Reducers produce new state, Selectors read state, Effects handle side effects.',
    codeExample: `// ACTION
export const loadUsers = createAction('[User] Load');
export const loadUsersSuccess = createAction(
  '[User API] Success',
  props<{ users: User[] }>()
);

// REDUCER
export const userReducer = createReducer(
  initialState,
  on(loadUsersSuccess, (state, { users }) => ({
    ...state, users, loading: false
  }))
);

// SELECTOR
export const selectUsers = createSelector(
  selectUserState, state => state.users
);`,
    technology: 'angular',
    category: 'NgRx',
    difficulty: 'hard',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // PIPES
  // ═══════════════════════════════════════════════════════
  {
    id: 'ng-15',
    question: 'What is the difference between pure and impure pipes?',
    answer: 'Pure pipes only run when input REFERENCE changes (performant). Impure pipes run EVERY change detection cycle (expensive). Default is pure.',
    codeExample: `// PURE PIPE (default) - runs when reference changes
@Pipe({ name: 'formatDate', pure: true })
export class FormatDatePipe implements PipeTransform {
  transform(date: Date): string {
    return date.toLocaleDateString();
  }
}

// IMPURE PIPE - runs every cycle (expensive!)
@Pipe({ name: 'filter', pure: false })
export class FilterPipe implements PipeTransform {
  transform(items: Item[], status: string): Item[] {
    return items.filter(i => i.status === status);
  }
}`,
    technology: 'angular',
    category: 'Pipes',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // HTTP & INTERCEPTORS
  // ═══════════════════════════════════════════════════════
  {
    id: 'ng-16',
    question: 'What are HTTP interceptors and how do you use them?',
    answer: 'Interceptors are middleware for HTTP requests/responses. Use for: auth tokens, logging, error handling, caching. Functional interceptors in Angular 15+.',
    codeExample: `// Functional interceptor
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    req = req.clone({
      headers: req.headers.set('Authorization', \`Bearer \${token}\`)
    });
  }
  
  return next(req);
};

// app.config.ts
provideHttpClient(withInterceptors([authInterceptor]))`,
    technology: 'angular',
    category: 'HTTP',
    difficulty: 'hard',
    version: 'Angular 15+',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // ROUTING
  // ═══════════════════════════════════════════════════════
  {
    id: 'ng-17',
    question: 'How do you implement lazy loading in Angular?',
    answer: 'Use loadComponent or loadChildren in routes. The component/module is only loaded when route is visited. Reduces initial bundle size.',
    codeExample: `export const routes: Routes = [
  // Eager loading
  { path: 'home', component: HomeComponent },
  
  // Lazy load component
  {
    path: 'profile',
    loadComponent: () => import('./profile.component')
      .then(m => m.ProfileComponent)
  },
  
  // Lazy load child routes
  {
    path: 'admin',
    loadChildren: () => import('./admin.routes')
      .then(m => m.ADMIN_ROUTES)
  }
];`,
    technology: 'angular',
    category: 'Routing',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'ng-18',
    question: 'What are route guards and how do you use them?',
    answer: 'Guards protect routes. canActivate checks if route can be accessed. canDeactivate checks if user can leave. Functional guards in Angular 15+.',
    codeExample: `// Functional guard
export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  
  if (auth.isLoggedIn()) {
    return true;
  }
  
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url }
  });
};

// Route config
{ path: 'dashboard', canActivate: [authGuard] }`,
    technology: 'angular',
    category: 'Routing',
    difficulty: 'hard',
    version: 'Angular 15+',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // FORMS
  // ═══════════════════════════════════════════════════════
  {
    id: 'ng-19',
    question: 'What is the difference between Reactive Forms and Template-Driven Forms?',
    answer: 'Reactive: form in TypeScript, more control, better for complex forms. Template-Driven: form in template with ngModel, simpler for basic forms.',
    codeExample: `// REACTIVE FORMS
form = new FormGroup({
  email: new FormControl('', [
    Validators.required, 
    Validators.email
  ]),
  password: new FormControl('', [
    Validators.required, 
    Validators.minLength(8)
  ])
});

// Template
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <input formControlName="email">
</form>`,
    technology: 'angular',
    category: 'Forms',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // DIRECTIVES
  // ═══════════════════════════════════════════════════════
  {
    id: 'ng-20',
    question: 'How do you create a custom attribute directive?',
    answer: 'Use @Directive decorator, inject ElementRef or use Renderer2. Use @HostListener for events, @HostBinding for properties.',
    codeExample: `@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  private el = inject(ElementRef);
  @Input('appHighlight') color = 'yellow';
  
  @HostListener('mouseenter')
  onEnter() {
    this.el.nativeElement.style.backgroundColor = this.color;
  }
  
  @HostListener('mouseleave')
  onLeave() {
    this.el.nativeElement.style.backgroundColor = '';
  }
}`,
    technology: 'angular',
    category: 'Directives',
    difficulty: 'medium',
    version: 'Angular 14+',
    timesCorrect: 0,
    timesIncorrect: 0
  }
];
