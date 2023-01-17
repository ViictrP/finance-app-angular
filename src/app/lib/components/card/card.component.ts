import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div
      (click)="clicked.emit()"
      [ngClass]="color"
      class="{{noPadding ? '' : 'py-2 px-4'}} w-full border-[0.5px] border-zinc-300 dark:border-zinc-800 {{borderMap[color]}} rounded-lg shadow-sm">
      <ng-content></ng-content>
    </div>
  `
})
export class CardComponent {

  @Input() color = '';
  @Input() noPadding = false;
  @Output() clicked = new EventEmitter<any>();

  constructor() {
  }

  colorMap: {[key: string]: string} = {
    'bg-purple-900': 'bg-purple-900',
    'bg-orange-500': 'bg-orange-500'
  };

  borderMap: {[key: string]: string} = {
    'bg-purple-900': 'border-purple-600',
    'bg-orange-500': 'border-orange-400',
    'bg-zinc-900': 'border-zinc-200 dark:border-zinc-800',
    'bg-blue-500': 'border-blue-400',
    'bg-red-500': 'border-red-400'
  };
}
