import { 
  Component, 
  ViewChild,
  ViewChildren,
  ContentChild,
  ContentChildren,
  QueryList,
  ElementRef,
  AfterViewInit,
  AfterContentInit,
  signal,
  viewChild,
  viewChildren,
  contentChild,
  contentChildren,
  forwardRef
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * 📚 LESSON: ViewChild, ViewChildren, ContentChild, ContentChildren
 * 
 * These decorators allow you to query elements/components in templates.
 * 
 * VIEW vs CONTENT:
 * - VIEW: Elements in THIS component's template
 * - CONTENT: Elements projected INTO this component (<ng-content>)
 * 
 * CHILD vs CHILDREN:
 * - CHILD: Single element (first match)
 * - CHILDREN: All matching elements (QueryList)
 * 
 * WHEN AVAILABLE:
 * - ViewChild: After ngAfterViewInit
 * - ContentChild: After ngAfterContentInit
 * 
 * SIGNAL-BASED (Angular 17+):
 * - viewChild(), viewChildren() - signal versions
 * - contentChild(), contentChildren() - signal versions
 */

// ═══════════════════════════════════════════════════════
// Example Child Component (to be queried)
// ═══════════════════════════════════════════════════════

@Component({
  selector: 'app-card-display',
  standalone: true,
  template: `
    <div class="card-display">
      <h3>{{ title }}</h3>
      <p>{{ content }}</p>
    </div>
  `,
  styles: [`
    .card-display {
      padding: 1rem;
      background: rgba(255,255,255,0.1);
      border-radius: 8px;
      margin: 0.5rem 0;
    }
  `]
})
export class CardDisplayComponent {
  title = '';
  content = '';
  
  // Method that parent can call
  highlight(): void {
    console.log(`Highlighting card: ${this.title}`);
  }
}


// ═══════════════════════════════════════════════════════
// Parent Component demonstrating queries
// ═══════════════════════════════════════════════════════

@Component({
  selector: 'app-query-demo',
  standalone: true,
  imports: [CommonModule, CardDisplayComponent, forwardRef(() => ContentWrapperComponent)],
  template: `
    <!--
      📚 LESSON: Template Reference Variables
      
      #name creates a reference to the element/component
      Can be used in template or queried with ViewChild
    -->
    
    <div class="container">
      <h2>ViewChild/ContentChild Demo</h2>
      
      <!-- DOM Element Reference -->
      <div #containerDiv class="section">
        <h3>DOM Element Query</h3>
        <input #nameInput type="text" placeholder="Enter name">
        <button (click)="focusInput()">Focus Input</button>
      </div>
      
      <!-- Component Reference -->
      <div class="section">
        <h3>Component Query</h3>
        <!-- #cardRef is optional, can query by type -->
        <app-card-display #cardRef />
        <button (click)="highlightCard()">Highlight Card</button>
      </div>
      
      <!-- Multiple Elements -->
      <div class="section">
        <h3>Multiple Items (ViewChildren)</h3>
        <div #item class="item">Item 1</div>
        <div #item class="item">Item 2</div>
        <div #item class="item">Item 3</div>
        <button (click)="countItems()">Count Items</button>
        <p>Items found: {{ itemCount() }}</p>
      </div>
      
      <!-- 
        📚 LESSON: Content Projection with <ng-content>
        
        Content BETWEEN component tags gets projected here.
        ContentChild/ContentChildren query that content.
      -->
      <div class="section">
        <h3>Content Projection</h3>
        <app-content-wrapper>
          <div #projectedItem class="projected">Projected content 1</div>
          <div #projectedItem class="projected">Projected content 2</div>
        </app-content-wrapper>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 1rem;
    }
    .section {
      margin: 1rem 0;
      padding: 1rem;
      background: rgba(255,255,255,0.05);
      border-radius: 8px;
    }
    .item, .projected {
      padding: 0.5rem;
      margin: 0.25rem 0;
      background: rgba(102, 126, 234, 0.2);
      border-radius: 4px;
    }
    button {
      margin: 0.5rem;
      padding: 0.5rem 1rem;
      background: #667eea;
      border: none;
      border-radius: 4px;
      color: white;
      cursor: pointer;
    }
    input {
      padding: 0.5rem;
      margin-right: 0.5rem;
    }
  `]
})
export class QueryDemoComponent implements AfterViewInit {
  
  // ═══════════════════════════════════════════════════════
  // DECORATOR-BASED QUERIES (Classic approach)
  // ═══════════════════════════════════════════════════════
  
  /**
   * 📚 @ViewChild - Query single element by template ref
   * 
   * The ! (non-null assertion) tells TypeScript it will be set.
   * Before ngAfterViewInit, this is undefined!
   */
  @ViewChild('nameInput') nameInputRef!: ElementRef<HTMLInputElement>;
  
  /**
   * 📚 @ViewChild - Query by component type
   * 
   * Get reference to the component instance itself.
   * Can call methods, access properties.
   */
  @ViewChild(CardDisplayComponent) cardComponent!: CardDisplayComponent;
  
  /**
   * 📚 @ViewChild with static option
   * 
   * static: true - Available in ngOnInit (if not inside *ngIf)
   * static: false (default) - Available in ngAfterViewInit
   */
  @ViewChild('containerDiv', { static: true }) containerDiv!: ElementRef;
  
  /**
   * 📚 @ViewChildren - Query all matching elements
   * 
   * Returns QueryList<T> which is:
   * - Iterable (use forEach, for...of)
   * - Has .changes observable for dynamic lists
   * - Has .first, .last, .length properties
   */
  @ViewChildren('item') itemRefs!: QueryList<ElementRef>;
  
  // ═══════════════════════════════════════════════════════
  // SIGNAL-BASED QUERIES (Angular 17+) - Preferred!
  // ═══════════════════════════════════════════════════════
  
  /**
   * 📚 viewChild() - Signal-based single query
   * 
   * Returns a Signal that updates automatically.
   * No need for ngAfterViewInit in many cases!
   */
  readonly nameInput = viewChild<ElementRef<HTMLInputElement>>('nameInput');
  
  /**
   * 📚 viewChild.required() - Required reference
   * 
   * Throws if not found (for strict typing)
   */
  readonly cardRef = viewChild.required<CardDisplayComponent>('cardRef');
  
  /**
   * 📚 viewChildren() - Signal-based multiple query
   * 
   * Returns Signal of array (not QueryList)
   */
  readonly items = viewChildren<ElementRef>('item');
  
  // Computed signal using query result
  readonly itemCount = signal<number>(0);

  /**
   * 📚 ngAfterViewInit
   * 
   * View queries are available here (for decorator-based).
   * With signal-based queries, often don't need this!
   */
  ngAfterViewInit(): void {
    console.log('View is ready!');
    
    // Using decorator-based
    console.log('Name input (decorator):', this.nameInputRef?.nativeElement);
    console.log('Card component:', this.cardComponent);
    console.log('Item count:', this.itemRefs?.length);
    
    // Setup card display
    if (this.cardComponent) {
      this.cardComponent.title = 'Dynamic Title';
      this.cardComponent.content = 'Content set from parent';
    }
    
    // Signal-based already works here
    this.itemCount.set(this.items()?.length ?? 0);
    
    /**
     * 📚 QueryList.changes
     * 
     * Observable that emits when the list changes
     * (for dynamic *ngFor lists)
     */
    this.itemRefs.changes.subscribe(list => {
      console.log('Items changed! New count:', list.length);
    });
  }
  
  // Methods using the queried elements
  
  focusInput(): void {
    // Using decorator
    this.nameInputRef?.nativeElement.focus();
    
    // Or using signal
    // this.nameInput()?.nativeElement.focus();
  }
  
  highlightCard(): void {
    // Call method on child component
    this.cardComponent?.highlight();
    
    // Or using signal
    // this.cardRef()?.highlight();
  }
  
  countItems(): void {
    // Using signal-based query
    this.itemCount.set(this.items().length);
  }
}


// ═══════════════════════════════════════════════════════
// Content Projection Demo
// ═══════════════════════════════════════════════════════

@Component({
  selector: 'app-content-wrapper',
  standalone: true,
  template: `
    <div class="wrapper">
      <h4>Wrapper Component</h4>
      
      <!--
        📚 LESSON: <ng-content>
        
        Content between component tags gets inserted here.
        This is called "content projection" or "transclusion".
        
        select="" can filter what content is projected where.
      -->
      <div class="projected-area">
        <ng-content></ng-content>
      </div>
      
      <p>Items projected: {{ projectedCount() }}</p>
    </div>
  `,
  styles: [`
    .wrapper {
      padding: 1rem;
      border: 2px dashed #667eea;
      border-radius: 8px;
    }
    .projected-area {
      padding: 0.5rem;
      background: rgba(102, 126, 234, 0.1);
      border-radius: 4px;
      margin: 0.5rem 0;
    }
  `]
})
export class ContentWrapperComponent implements AfterContentInit {
  
  /**
   * 📚 @ContentChild - Query projected content (single)
   * 
   * Gets elements that were put BETWEEN the component tags.
   * Available after ngAfterContentInit.
   */
  @ContentChild('projectedItem') firstProjected!: ElementRef;
  
  /**
   * 📚 @ContentChildren - Query all projected content
   */
  @ContentChildren('projectedItem') allProjected!: QueryList<ElementRef>;
  
  // Signal-based content queries
  readonly projectedItems = contentChildren<ElementRef>('projectedItem');
  readonly projectedCount = signal<number>(0);
  
  /**
   * 📚 ngAfterContentInit
   * 
   * Content queries are available here.
   * Runs BEFORE ngAfterViewInit!
   */
  ngAfterContentInit(): void {
    console.log('Content is ready!');
    console.log('First projected:', this.firstProjected?.nativeElement);
    console.log('All projected:', this.allProjected?.length);
    
    // Update count
    this.projectedCount.set(this.projectedItems()?.length ?? 0);
    
    // Listen for changes
    this.allProjected.changes.subscribe(list => {
      console.log('Projected content changed:', list.length);
      this.projectedCount.set(list.length);
    });
  }
}


/**
 * 📚 SUMMARY: ViewChild vs ContentChild
 * 
 * ┌─────────────────────────────────────────────────────────┐
 * │                  YOUR COMPONENT                         │
 * │                                                         │
 * │  @ViewChild queries THIS ↓                              │
 * │  ┌─────────────────────────────────────┐               │
 * │  │         COMPONENT TEMPLATE          │               │
 * │  │  <div #ref>                         │               │
 * │  │  <app-child />                      │               │
 * │  │                                     │               │
 * │  │  <app-wrapper>                      │               │
 * │  │    <div #projected>  ← ContentChild  │               │
 * │  │  </app-wrapper>      queries this   │               │
 * │  └─────────────────────────────────────┘               │
 * └─────────────────────────────────────────────────────────┘
 * 
 * ViewChild  = Query elements in YOUR template
 * ContentChild = Query elements projected INTO a component
 */
