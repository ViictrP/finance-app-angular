import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgClass } from '@angular/common';
import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';

type OnChangedFn = (_: unknown) => void;
type OnTouchedFn = () => void;

@Component({
  selector: 'app-input-date',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
  ],
  template: `
    <div [ngClass]="{'mb-10' : required}">
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
          [(ngModel)]="formattedValue"
          (ngModelChange)="valueChanged()"
          [disabled]="disabled"
          [type]="type"
          class="bg-transparent text-black appearance-none border-none rounded w-full py-2 pl-2 pr-4 text-gray-700 leading-tight focus:outline-none focus:ring-0"
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
      useExisting: InputDateComponent
    }
  ]
})
export class InputDateComponent implements ControlValueAccessor, OnInit{

  @Input({ required: true }) id!: string;
  @Input() name?: string;
  @Input() placeholder?: string;
  @Input() value?: Date;
  @Input() disabled = false;
  @Input() errorMessage?: string;
  @Input() required = false;
  @Input() icon = 'ph-credit-cards';
  @Input() type: 'date' | 'month' = 'date';
  @Output() changed = new EventEmitter<Date>();

  touched = false;
  formattedValue = ''

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange: OnChangedFn = (_: unknown) => {
  };

  onTouched: OnTouchedFn = () => {
  };

  ngOnInit(): void {
    if (this.value) {
      this.formattedValue = format(this.value, 'yyyy-MM', {locale: pt});
    }
  }

  writeValue(value: Date): void {
    this.value = value;
    if (value !== null) {
      const dateFormat = this.type === 'month' ? 'yyyy-MM' : 'yyyy-MM-dd';
      this.formattedValue = format(value, dateFormat, {locale: pt});
    }
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

  private emitNewValue(val: Date) {
    this.value = val;
    this.markAsTouched();
    this.onChange(val);
    this.changed.emit(val);
  }

  protected valueChanged() {
   const value = parseISO(this.formattedValue);
    this.emitNewValue(value);
  }
}
