import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button
      [disabled]="disabled"
      class="block w-full px-4 py-3 text-xl bg-blue-500 rounded-lg transition ease-in-out duration-100 hover:bg-sky-500 hover:border-sky-900 disabled:bg-blue-900 disabled:text-gray-600 active:outline-pink-800 focus:outline-pink-800 focus:outline-8"
      (click)="onClick()"
      [type]="type">
      <ng-content></ng-content>
    </button>
  `
})
export class ButtonComponent {
  @Input() disabled = false;
  @Input() type = 'button';
  @Output() clickEvent = new EventEmitter();

  onClick() {
    this.clickEvent.emit();
  }
}
