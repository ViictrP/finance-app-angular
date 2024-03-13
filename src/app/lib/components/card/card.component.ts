import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    NgClass,
  ],
  template: `
    <div class="w-full h-auto {{backgroundColor ?? 'bg-white'}} rounded-xl shadow-sm">
      <ng-content></ng-content>
    </div>
  `,
})
export default  class CardComponent {

  @Input() backgroundColor? = 'bg-white';
}
