import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-icon-button',
  template: `
    <div class="flex justify-end">
      <button
        [ngClass]="{'gap-2': !!title}"
        (click)="clicked.emit()"
        class="inline-flex">
        <i class="m-auto {{sizeMap[size]}} {{icon}}"></i>
        <span class="m-auto {{sizeMap[size]}}">{{title}}</span>
      </button>
    </div>
  `
})
export class IconButtonComponent {
  @Input() icon = '';
  @Input() size: 'small' | 'medium' | 'big' | 'ultra-big' = 'medium';
  @Input() title?: string;
  @Output() clicked = new EventEmitter();

  sizeMap = {
    'small': 'text-lg',
    'medium': 'text-xl',
    'big': 'text-2xl',
    'ultra-big': 'text-3xl'
  };
}
