import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

export interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-select',
  template: `
    <div class="relative">
      <select
        [id]="id"
        [name]="name"
        [value]="value"
        [disabled]="disabled"
        [(ngModel)]="value"
        (change)="valueChanged()"
        [ngClass]="{'text-neutral-500' : disabled || value === '0'}"
        class="{{icon ? 'pl-10' : 'pl-5'}} pr-9 py-3 text-xl w-full rounded-md mb-1 dark:bg-zinc-900 border-1 focus:ring {{invalid && touched ? 'border-red-500 focus:ring-red-500' : 'focus:ring-sky-500 border-zinc-200 dark:border-zinc-900'}} transition ease-in-out duration-150"
      >
        <option [value]="0" class="text-neutral-100">{{placeholder}}</option>
        <option class="text-neutral-100 p-4" *ngFor="let option of options" [value]="option.value">{{ option.label }}</option>
      </select>
      <i class="absolute top-[15px] left-2 text-2xl text-zinc-300 {{icon}}"></i>
      <button
        *ngIf="value && !disabled && value !== '0'"
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
      multi:true,
      useExisting: SelectComponent
    }
  ]
})
export class SelectComponent implements ControlValueAccessor {
  @Input() id = '';
  @Input() value = '0';
  @Input() name = '';
  @Input() icon = '';
  @Input() invalid = false;
  @Input() placeholder = '';
  @Input() options: SelectOption[] = [];
  @Output() changed = new EventEmitter<string>();
  disabled = false;
  touched = false;

  onChange = (_: any) => {
  };

  onTouched = () => {
  };

  valueChanged() {
    this.markAsTouched();
    this.onChange(this.value);
    this.changed.emit(this.value);
  }

  private markAsTouched() {
    this.touched = true;
    this.onTouched();
  }

  clear() {
    this.value = '0';
    this.markAsTouched();
    this.onChange('');
    this.changed.emit(this.value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: string): void {
    this.value = value ?? '0';
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
