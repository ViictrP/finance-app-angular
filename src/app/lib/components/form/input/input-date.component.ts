import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {format, parseISO} from 'date-fns';
import pt from 'date-fns/locale/pt';

@Component({
  selector: 'app-input-date',
  template: `
    <div class="relative">
      <input
        [(ngModel)]="formattedValue"
        (input)="valueChanged()"
        [disabled]="disabled"
        [ngClass]="{'text-neutral-500' : disabled}"
        [placeholder]="placeholder"
        [type]="inputType"
        class="{{icon ? 'pl-10' : 'pl-5'}} text-zinc-900 dark:text-zinc-200 pr-9 py-3 text-xl w-full rounded-md mb-1 dark:bg-zinc-900 border-1 focus:ring {{invalid && touched ? 'border-red-500 focus:ring-red-500' : 'focus:ring-sky-500 border-zinc-200 dark:border-zinc-900'}} transition ease-in-out duration-150"
      />
      <i class="absolute top-[15px] left-2 text-2xl text-zinc-700 dark:text-zinc-300 {{icon}}"></i>
      <button
        *ngIf="formattedValue && !disabled && !hideClearButton"
        (click)="clear()"
        class="absolute top-[18px] right-4 text-xl"
        type="button">
        <i class="ph-x-circle-fill text-zinc-500"></i>
      </button>
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
export class InputDateComponent implements ControlValueAccessor, OnInit {
  @Input() invalid = false;
  @Input() placeholder = '';
  @Input() icon = '';
  @Input() id = '';
  @Input() inputType: 'date' | 'month' = 'date';
  @Input() disabled = false;
  @Input() value?: Date;
  @Input() hideClearButton = false;
  @Output() changed = new EventEmitter<Date>();
  touched = false;
  formattedValue = ''

  ngOnInit(): void {
    if (this.value) {
      this.formattedValue = format(this.value, 'yyyy-MM', {locale: pt});
    }
  }

  onChange = (_: any) => {
  };

  onTouched = () => {
  };

  valueChanged() {
    this.value = parseISO(this.formattedValue);
    this.markAsTouched();
    this.onChange(this.value);
    this.changed.emit(this.value);
  }

  private markAsTouched() {
    this.touched = true;
    this.onTouched();
  }

  clear() {
    this.value = undefined;
    this.formattedValue = '';
    this.markAsTouched();
    this.onChange(this.value);
    this.changed.emit(this.value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: Date): void {
    this.value = value;
    const dateFormat = this.inputType === 'month' ? 'yyyy-MM' : 'yyyy-MM-dd';
    this.formattedValue = format(value, dateFormat, {locale: pt});
  }
}
