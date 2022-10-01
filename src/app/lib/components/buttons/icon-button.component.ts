import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-icon-button',
  template: `
    <button (click)="clicked.emit()" class="inline-flex">
      <i class="m-auto {{sizeMap[size]}} {{icon}}"></i>
    </button>
  `
})
export class IconButtonComponent {
  @Input() icon = '';
  @Input() size: 'small' | 'medium' | 'big' | 'ultra-big' = 'medium';
  @Output() clicked = new EventEmitter();

  sizeMap = {
    'small': 'text-lg',
    'medium': 'text-xl',
    'big': 'text-2xl',
    'ultra-big': 'text-3xl'
  };
}
