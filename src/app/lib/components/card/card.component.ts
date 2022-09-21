import {Component} from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div class="py-2 px-4 w-full border-[0.5px] border-zinc-800 bg-zinc-900 rounded-lg shadow-md">
      <ng-content></ng-content>
    </div>
  `
})
export class CardComponent {

  constructor() {
  }

}
