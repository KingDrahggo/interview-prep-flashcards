# 🧠 Angular Senior Interview Cheat Sheet

## Quick References for Your Interview

---

## 1. Component Architecture

### Lifecycle Hooks (in order)
```
constructor → ngOnChanges → ngOnInit → ngDoCheck → 
ngAfterContentInit → ngAfterContentChecked → 
ngAfterViewInit → ngAfterViewChecked → ngOnDestroy
```

| Hook | When | Use For |
|------|------|---------|
| `ngOnChanges` | Before ngOnInit, on input changes | React to input changes |
| `ngOnInit` | Once after first ngOnChanges | Initialize component, fetch data |
| `ngAfterViewInit` | After view is rendered | Access ViewChild elements |
| `ngOnDestroy` | Before component destroyed | Unsubscribe, cleanup |

### Decorator-based vs Signal-based

```typescript
// OLD (still works)
@Input() name: string;
@Output() clicked = new EventEmitter<void>();

// NEW (Angular 17+) - Preferred
name = input.required<string>();
clicked = output<void>();
```

---

## 2. Signals vs Observables

| Feature | Signals | Observables |
|---------|---------|-------------|
| **Sync/Async** | Synchronous | Asynchronous |
| **Value** | Always has value | May emit nothing |
| **Subscription** | Auto-tracked | Manual subscribe |
| **Operators** | None (use computed) | Many (map, filter, etc.) |
| **Use For** | UI state | HTTP, events, streams |

```typescript
// Signal
const count = signal(0);
count.set(5);
count.update(n => n + 1);
const doubled = computed(() => count() * 2);

// Observable
const count$ = new BehaviorSubject(0);
count$.next(5);
const doubled$ = count$.pipe(map(n => n * 2));
doubled$.subscribe(v => console.log(v));
```

---

## 3. Change Detection

### Strategies
- **Default**: Checks ALL components on any event
- **OnPush**: Only checks when input refs change, events fire, or signals update

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

### OnPush triggers:
1. Input reference changes (not mutation!)
2. Event from component/child
3. Async pipe receives value
4. Signal changes
5. `markForCheck()` called

---

## 4. RxJS Key Operators

### Transformation
```typescript
map(x => x * 2)           // Transform each value
scan((acc, val) => acc + val, 0)  // Running accumulator
```

### Filtering
```typescript
filter(x => x > 5)        // Only values > 5
take(5)                   // First 5 values
first()                   // First value only
distinctUntilChanged()    // Skip duplicates
debounceTime(300)         // Wait for pause
```

### Flattening (IMPORTANT!)
```typescript
switchMap()   // Cancel previous (search/HTTP)
mergeMap()    // Run parallel (bulk uploads)
concatMap()   // Run sequential (ordered ops)
exhaustMap()  // Ignore new until done (form submit)
```

### Error Handling
```typescript
catchError(err => of(fallback))  // Return fallback
retry(3)                          // Retry 3 times
```

---

## 5. Dependency Injection

### providedIn options
```typescript
@Injectable({ providedIn: 'root' })  // Singleton (recommended)
@Injectable({ providedIn: 'any' })   // One per lazy module
@Injectable()  // Must provide manually
```

### Injection Tokens
```typescript
const API_URL = new InjectionToken<string>('api.url');

// Provide
providers: [{ provide: API_URL, useValue: 'https://api.com' }]

// Inject
private url = inject(API_URL);
```

---

## 6. Pipes

### Built-in
```html
{{ date | date:'short' }}
{{ price | currency:'USD' }}
{{ text | uppercase }}
{{ obj | json }}
{{ items | slice:0:5 }}
{{ observable$ | async }}
```

### Pure vs Impure
- **Pure** (default): Only runs when input reference changes
- **Impure**: Runs every change detection cycle (expensive!)

```typescript
@Pipe({ name: 'myPipe', pure: false })  // Impure
```

---

## 7. Directives

### Types
1. **Components** - Directive with template
2. **Structural** - Change DOM structure (*ngIf, *ngFor, @if, @for)
3. **Attribute** - Change appearance/behavior (ngClass, ngStyle)

### Key Decorators
```typescript
@HostListener('click', ['$event'])  // Listen to host events
@HostBinding('class.active')         // Bind to host properties
```

---

## 8. Routing

### Route Configuration
```typescript
{
  path: 'users/:id',           // Parameter
  loadComponent: () => import('./user').then(m => m.UserComponent),  // Lazy
  canActivate: [authGuard],    // Guard
  resolve: { user: userResolver }  // Pre-fetch data
}
```

### Guards
- `canActivate` - Can access route?
- `canDeactivate` - Can leave route?
- `canMatch` - Can route match at all?
- `resolve` - Pre-fetch data

---

## 9. NgRx Flow

```
User Event → dispatch(Action) → Reducer → New State → Selector → Component
                                    ↓
                               Effect → API Call → dispatch(Success/Failure)
```

### Key Points
- **Store**: Single source of truth
- **Actions**: Events describing what happened
- **Reducers**: Pure functions, return NEW state
- **Selectors**: Memoized state readers
- **Effects**: Side effects (HTTP, storage)

---

## 10. Template Syntax (Angular 17+)

### New Control Flow
```html
@if (condition) {
  <div>True</div>
} @else {
  <div>False</div>
}

@for (item of items; track item.id) {
  <div>{{ item.name }}</div>
} @empty {
  <div>No items</div>
}

@switch (status) {
  @case ('loading') { <spinner /> }
  @case ('error') { <error /> }
  @default { <content /> }
}
```

### Deferred Loading
```html
@defer (on viewport) {
  <heavy-component />
} @loading {
  <spinner />
} @placeholder {
  <div>Scroll to load</div>
}
```

---

## 11. Forms

### Reactive Forms
```typescript
form = new FormGroup({
  name: new FormControl('', [Validators.required]),
  email: new FormControl('', [Validators.required, Validators.email])
});

// Template
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <input formControlName="name">
  @if (form.get('name')?.errors?.['required']) {
    <span>Name required</span>
  }
</form>
```

### Template-Driven Forms
```html
<form #form="ngForm" (ngSubmit)="onSubmit(form)">
  <input name="email" ngModel required email>
</form>
```

---

## 12. Testing Quick Reference

```typescript
// Setup
beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [MyComponent],
    providers: [{ provide: MyService, useValue: mockService }]
  });
  fixture = TestBed.createComponent(MyComponent);
  component = fixture.componentInstance;
});

// Test
it('should show error on invalid input', () => {
  component.form.get('email')?.setValue('invalid');
  fixture.detectChanges();
  expect(fixture.nativeElement.querySelector('.error')).toBeTruthy();
});
```

---

## Interview Questions to Study

1. **What is change detection and how does OnPush work?**
2. **Explain the difference between Signals and Observables**
3. **When would you use switchMap vs mergeMap vs concatMap?**
4. **How does Angular's DI system work?**
5. **What are the component lifecycle hooks?**
6. **How do you handle unsubscription in Angular?**
7. **Explain NgRx data flow**
8. **What are pure vs impure pipes?**
9. **How do you lazy load routes?**
10. **What's the difference between @ViewChild and @ContentChild?**

---

Good luck with your interview! 🚀
