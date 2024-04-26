import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import currencyMasker from '../../helpers/currency.masker';
import { NgClass, NgOptimizedImage } from '@angular/common';

type InputType = 'text' | 'password' | 'currency' | 'numeric';
type OnChangedFn = (_: unknown) => void;
type OnTouchedFn = () => void;

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    NgOptimizedImage,
  ],
  template: `
    <div class="min-h-20">
      <div
        [ngClass]="{
        'text-zinc-900 dark:text-white' : disabled,
        'border-red-500': required && touched && !value
      }"
        class="flex flex-row items-center justify-center bg-white appearance-none border-2 rounded w-full py-2 px-2 text-gray-700 leading-tight focus-within:outline-none focus-within:bg-white focus-within:border-transparent">
        <i class="text-gray-500 text-2xl {{icon}}"></i>
        <input
          [id]="id"
          [name]="name ?? ''"
          [placeholder]="placeholder ?? ''"
          [(ngModel)]="value"
          (keydown)="keydown($event)"
          (ngModelChange)="valueChanged($event)"
          [disabled]="disabled"
          type="text"
          class="bg-transparent text-black appearance-none border-none rounded w-full py-2 pl-2 pr-4 leading-tight focus:outline-none focus:ring-0"
        />
      </div>
      @if (required && touched && !value) {
        <p class="text-xs mt-2 text-red-500">{{ errorMessage ?? '' }}</p>
      }
    </div>
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
  @Input() icon = 'ph-credit-cards';
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

  keydown(event: KeyboardEvent) {
    if ((this.type === 'currency' || this.type === 'numeric') && isNaN(Number(event.key)) && event.key !== 'Backspace' && event.key !== 'Enter') {
      event.preventDefault();
    }
  }

  protected valueChanged(newValue: string) {
    if (this.type === 'currency') {
      const [masked, value] = currencyMasker(newValue);
      this.value = masked;
      this.emitNewValue(String(value));
    } else {
      this.emitNewValue(newValue);
    }
  }
}
