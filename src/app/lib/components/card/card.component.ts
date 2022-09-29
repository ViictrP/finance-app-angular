import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div class="py-2 px-4 w-full border-[0.5px] border-zinc-800 {{color}} rounded-lg shadow-md">
      <ng-content></ng-content>
    </div>
  `
})
export class CardComponent {

  @Input() color = 'bg-zinc-900'

  constructor() {
  }

}
