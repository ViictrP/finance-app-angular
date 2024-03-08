import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import currencyMasker from '../../helpers/currency.masker';
import { NgClass } from '@angular/common';

type InputType = 'text' | 'password' | 'currency';
type OnChangedFn = (_: unknown) => void;
type OnTouchedFn = () => void;

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
  ],
  template: `
    <input
      [id]="id"
      [name]="name ?? ''"
      [placeholder]="placeholder ?? ''"
      [(ngModel)]="value"
      [disabled]="disabled"
      (input)="valueChanged()"
      [ngClass]="{
        'text-zinc-900 dark:text-white' : disabled,
        'border-2 border-red-500 bg-white': required && touched && !value
      }"
      class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
      id="inline-full-name"
      type="text"
    />
    @if (required && touched && !value) {
      <p class="text-sm mt-2 text-red-500">{{ errorMessage ?? '' }}</p>
    }
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputComponent
    }
  ]
})
export default class InputComponent implements ControlValueAccessor {

  @Input({ required: true }) id!: string;
  @Input() name?: string;
  @Input() placeholder?: string;
  @Input() value?: string;
  @Input() disabled = false;
  @Input() errorMessage?: string;
  @Input() type: InputType = "text";
  @Input() required = false;
  @Output() changed = new EventEmitter<string>();

  touched = false;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange: OnChangedFn = (_: unknown) => {
  };

  onTouched: OnTouchedFn = () => {
  };

  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: OnChangedFn): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: OnTouchedFn): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private markAsTouched() {
    this.touched = true;
    this.onTouched();
  }

  private emitNewValue(val: string) {
    this.markAsTouched();
    this.onChange(val);
    this.changed.emit(String(val));
  }

  protected valueChanged() {
    if (this.type === 'currency') {
      const [masked, value] = currencyMasker(this.value!);
      this.value = masked;
      this.emitNewValue(String(value));
    } else {
      this.emitNewValue(this.value!);
    }
  }
}
