import {Component, Input} from '@angular/core';

@Component({
  selector: ' app-chip',
  template: `
    <div class="flex ml-4 px-4 py-1 w-min-[50px] bg-sky-900 text-center border-[0.5px] border-sky-700 rounded-full">
      <p class="m-auto"><span class="font-bold">{{title}}</span>&nbsp;&nbsp;<span class="text-xl">{{description}}</span></p>
    </div>
  `
})
export class ChipComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() color?: string;
}
