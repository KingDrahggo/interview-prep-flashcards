import { 
  Directive, 
  ElementRef, 
  HostListener, 
  HostBinding,
  Input,
  OnInit,
  Renderer2,
  inject
} from '@angular/core';

/**
 * 📚 LESSON: Directives in Angular
 * 
 * THREE TYPES OF DIRECTIVES:
 * 
 * 1. COMPONENTS - Directives WITH templates (@Component)
 *    - Have their own view
 *    - Most common directive type
 * 
 * 2. STRUCTURAL DIRECTIVES - Change DOM structure
 *    - Add, remove, or manipulate elements
 *    - Prefixed with * (e.g., *ngIf, *ngFor)
 *    - In Angular 17+, use @if, @for instead
 * 
 * 3. ATTRIBUTE DIRECTIVES - Change appearance/behavior
 *    - Don't change structure
 *    - Applied like HTML attributes
 *    - Examples: ngClass, ngStyle
 * 
 * KEY CONCEPTS:
 * 
 * - @HostListener - Listen to host element events
 * - @HostBinding - Bind to host element properties
 * - ElementRef - Reference to the host DOM element
 * - Renderer2 - Safely manipulate DOM (platform-agnostic)
 */

/**
 * 📚 ATTRIBUTE DIRECTIVE: Highlight on Hover
 * 
 * Usage: <div appHighlight></div>
 *        <div appHighlight="purple"></div>
 */
@Directive({
  selector: '[appHighlight]',  // Attribute selector
  standalone: true
})
export class HighlightDirective implements OnInit {
  
  /**
   * 📚 LESSON: ElementRef
   * 
   * Gives direct access to the host DOM element.
   * Use sparingly - prefer Renderer2 for DOM manipulation
   * for better SSR compatibility.
   */
  private readonly el = inject(ElementRef);
  
  /**
   * 📚 LESSON: Renderer2
   * 
   * Abstracts DOM manipulation for platform safety.
   * Works with SSR (Server-Side Rendering).
   * Preferred over direct ElementRef manipulation.
   */
  private readonly renderer = inject(Renderer2);
  
  /**
   * 📚 LESSON: Input with same name as directive
   * 
   * When input name matches directive selector,
   * you can set both with one attribute:
   * <div appHighlight="purple"> sets the color
   */
  @Input('appHighlight') highlightColor: string = '';
  
  @Input() defaultColor: string = '#667eea';
  
  private originalBackground: string = '';

  ngOnInit(): void {
    // Store original background for reset
    this.originalBackground = this.el.nativeElement.style.backgroundColor;
  }

  /**
   * 📚 LESSON: @HostListener
   * 
   * Listen to events on the HOST element (the element the directive is on)
   * 
   * Syntax: @HostListener('eventName', ['$event'])
   * 
   * Common events: 'mouseenter', 'mouseleave', 'click', 'focus', 'blur'
   */
  @HostListener('mouseenter')
  onMouseEnter(): void {
    const color = this.highlightColor || this.defaultColor;
    this.highlight(color);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.highlight(this.originalBackground || 'transparent');
  }

  private highlight(color: string): void {
    // Using Renderer2 for safe DOM manipulation
    this.renderer.setStyle(
      this.el.nativeElement, 
      'backgroundColor', 
      color
    );
    this.renderer.setStyle(
      this.el.nativeElement,
      'transition',
      'background-color 0.3s ease'
    );
  }
}


/**
 * 📚 ATTRIBUTE DIRECTIVE: Ripple Effect
 * 
 * Adds Material-like ripple effect on click
 * Usage: <button appRipple></button>
 */
@Directive({
  selector: '[appRipple]',
  standalone: true
})
export class RippleDirective {
  
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  
  @Input() rippleColor: string = 'rgba(255, 255, 255, 0.4)';

  /**
   * 📚 LESSON: @HostListener with $event
   * 
   * $event gives you access to the event object
   * Useful for getting click position, key pressed, etc.
   */
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    const button = this.el.nativeElement;
    const rect = button.getBoundingClientRect();
    
    // Create ripple element
    const ripple = this.renderer.createElement('span');
    
    // Calculate ripple position
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    // Style the ripple
    this.renderer.setStyle(ripple, 'position', 'absolute');
    this.renderer.setStyle(ripple, 'width', `${size}px`);
    this.renderer.setStyle(ripple, 'height', `${size}px`);
    this.renderer.setStyle(ripple, 'left', `${x}px`);
    this.renderer.setStyle(ripple, 'top', `${y}px`);
    this.renderer.setStyle(ripple, 'background', this.rippleColor);
    this.renderer.setStyle(ripple, 'borderRadius', '50%');
    this.renderer.setStyle(ripple, 'transform', 'scale(0)');
    this.renderer.setStyle(ripple, 'animation', 'ripple 0.6s linear');
    this.renderer.setStyle(ripple, 'pointerEvents', 'none');
    
    // Ensure parent has position relative
    this.renderer.setStyle(button, 'position', 'relative');
    this.renderer.setStyle(button, 'overflow', 'hidden');
    
    // Add ripple to DOM
    this.renderer.appendChild(button, ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
      this.renderer.removeChild(button, ripple);
    }, 600);
  }
}


/**
 * 📚 ATTRIBUTE DIRECTIVE: Using @HostBinding
 * 
 * @HostBinding binds to properties of the host element
 * 
 * Usage: <button appButtonState></button>
 */
@Directive({
  selector: '[appButtonState]',
  standalone: true
})
export class ButtonStateDirective {
  
  private isActive = false;
  
  /**
   * 📚 LESSON: @HostBinding
   * 
   * Binds a property to the host element.
   * 
   * @HostBinding('class.active') - adds/removes 'active' class
   * @HostBinding('style.color') - sets color style
   * @HostBinding('attr.disabled') - sets disabled attribute
   * @HostBinding('disabled') - sets disabled property
   */
  
  @HostBinding('class.is-active')
  get active(): boolean {
    return this.isActive;
  }
  
  @HostBinding('style.transform')
  get transform(): string {
    return this.isActive ? 'scale(0.98)' : 'scale(1)';
  }
  
  @HostBinding('attr.aria-pressed')
  get ariaPressed(): string {
    return String(this.isActive);
  }

  @HostListener('mousedown')
  onMouseDown(): void {
    this.isActive = true;
  }

  @HostListener('mouseup')
  @HostListener('mouseleave')
  onMouseUp(): void {
    this.isActive = false;
  }
}


/**
 * 📚 LESSON: Structural Directive Example
 * 
 * Custom *ngIf-like directive
 * Note: In Angular 17+, prefer @if/@for syntax for built-in cases
 * 
 * Usage: <div *appIf="condition">Content</div>
 */
import { TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appIf]',
  standalone: true
})
export class IfDirective {
  
  /**
   * 📚 LESSON: TemplateRef & ViewContainerRef
   * 
   * TemplateRef - Reference to the template content
   * ViewContainerRef - Container where we can insert views
   * 
   * These are injected automatically for structural directives
   */
  private readonly templateRef = inject(TemplateRef<any>);
  private readonly viewContainer = inject(ViewContainerRef);
  
  private hasView = false;
  
  /**
   * 📚 LESSON: Structural Directive Input
   * 
   * The input must match the directive selector for * syntax.
   * *appIf="condition" translates to [appIf]="condition"
   */
  @Input()
  set appIf(condition: boolean) {
    if (condition && !this.hasView) {
      // Create and insert the view
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!condition && this.hasView) {
      // Remove the view
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}


/**
 * 📚 LESSON: Structural Directive with Context
 * 
 * Advanced: Pass data to the template
 * 
 * Usage: 
 * <div *appRepeat="3; let i = index; let isFirst = first">
 *   Item {{ i }} - First: {{ isFirst }}
 * </div>
 */
@Directive({
  selector: '[appRepeat]',
  standalone: true
})
export class RepeatDirective {
  
  private readonly templateRef = inject(TemplateRef<any>);
  private readonly viewContainer = inject(ViewContainerRef);

  @Input()
  set appRepeat(count: number) {
    this.viewContainer.clear();
    
    for (let i = 0; i < count; i++) {
      /**
       * 📚 LESSON: Template Context
       * 
       * Second parameter to createEmbeddedView is the context.
       * This makes variables available in the template via 'let'.
       * 
       * $implicit - default value accessed without 'let x = ...'
       * Named properties - accessed with 'let x = propertyName'
       */
      this.viewContainer.createEmbeddedView(this.templateRef, {
        $implicit: i,  // Default value (let i)
        index: i,      // let i = index
        first: i === 0,
        last: i === count - 1,
        even: i % 2 === 0,
        odd: i % 2 === 1,
        count: count
      });
    }
  }
}
