import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div
      [ngClass]="colorMap[color] || color"
      class="py-2 px-4 w-full border-[0.5px] border-zinc-800 {{borderMap[color]}} rounded-lg shadow-md">
      <ng-content></ng-content>
    </div>
  `
})
export class CardComponent {

  @Input() color = 'bg-zinc-900'

  constructor() {
  }

  colorMap: {[key: string]: string} = {
    'bg-purple-900': 'bg-purple-900',
    'bg-orange-500': 'bg-orange-500'
  };

  borderMap: {[key: string]: string} = {
    'bg-purple-900': 'border-purple-600',
    'bg-orange-500': 'border-orange-400',
    'bg-zinc-900': 'border-zinc-800',
    'bg-blue-500': 'border-blue-400'
  };
}
