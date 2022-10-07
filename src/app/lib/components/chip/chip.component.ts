import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: ' app-chip',
  template: `
    <div
      (click)="clicked.emit()"
      [ngClass]="colorMap[color] || color"
      class="cursor-pointer flex px-4 py-1 w-min-[50px] text-center border-[0.5px] {{borderMap[color]}} rounded-full">
      <p class="m-auto"><span class="font-bold">{{title}}</span>&nbsp;&nbsp;<span class="text-xl">{{description}}</span></p>
    </div>
  `
})
export class ChipComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() color = 'bg-sky-900';
  @Output() clicked = new EventEmitter();

  colorMap: {[key: string]: string} = {
    'bg-purple-900': 'bg-purple-900',
    'bg-orange-500': 'bg-orange-500'
  };

  borderMap: {[key: string]: string} = {
    'bg-purple-900': 'border-purple-600',
    'bg-orange-500': 'border-orange-400',
    'bg-zinc-900': 'border-zinc-800',
    'bg-blue-500': 'border-blue-400',
    'bg-red-500': 'border-red-400'
  };
}
