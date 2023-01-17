import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button
      [disabled]="disabled"
      [ngClass]="{'justify-center hover:bg-sky-500 disabled:bg-blue-900 bg-blue-500 rounded-lg hover:bg-sky-500 hover:border-sky-900': type !== 'plain'}"
      class="block flex px-4 py-3 flex-row items-center justify-start gap-4 w-full text-xl transition ease-in-out duration-100 text-zinc-800 dark:text-zinc-100 disabled:text-gray-300 dark:disabled:text-gray-600 active:outline-pink-800 focus:outline-pink-800 focus:outline-8"
      (click)="onClick()"
      [type]="type">
      <i class="mb-[1px] {{icon}}"></i>
      <p class="my-auto">
        <ng-content></ng-content>
      </p>
    </button>
  `
})
export class ButtonComponent {
  @Input() disabled = false;
  @Input() type: 'button' | 'plain' = 'button';
  @Input() icon = '';
  @Output() clickEvent = new EventEmitter();

  onClick() {
    this.clickEvent.emit();
  }
}
