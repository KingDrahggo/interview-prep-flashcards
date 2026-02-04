import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * 📚 LESSON: Root Component
 * 
 * The App component is the ROOT of the component tree.
 * All other components are children of this.
 * 
 * <router-outlet> is where routed components will be rendered.
 * Think of it as a placeholder.
 */

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <!--
      📚 LESSON: RouterOutlet
      
      This is where the routed component will be rendered.
      When URL is /study, StudyComponent renders here.
      When URL is /quiz, QuizComponent would render here.
      
      The RouterOutlet is a DIRECTIVE that acts as a placeholder.
    -->
    <router-outlet />
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }
  `]
})
export class App {}
