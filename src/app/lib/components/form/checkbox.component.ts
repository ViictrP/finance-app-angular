import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  template: `
    <div class="flex">
      <input
        [checked]="checked"
        type="checkbox"
        class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-default-checkbox"
        (change)="changed()"
      >
      <label
        for="hs-default-checkbox"
        class="text-sm text-gray-500 ms-3 dark:text-gray-400">
        {{ label }}
      </label>
    </div>
  `
})
export default class CheckboxComponent {

  @Input({ required: true }) label!: string;
  @Input() checked = false;
  @Output() checkedChanged = new EventEmitter<boolean>();

  changed() {
    this.checked = !this.checked;
    this.checkedChanged.emit(this.checked);
  }
}
