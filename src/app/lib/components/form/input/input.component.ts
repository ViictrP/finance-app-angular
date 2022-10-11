import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import currencyMasker from '../../../helper/currencyMasker';
import digitMasker from '../../../helper/digitMasker';

@Component({
  selector: 'app-input',
  template: `
    <div class="relative">
      <input
        [id]="id"
        [name]="name"
        [(ngModel)]="value"
        [disabled]="disabled"
        [type]="internalType"
        [placeholder]="placeholder"
        (input)="valueChanged()"
        [maxlength]="maxLength"
        [ngClass]="{'text-neutral-500' : disabled}"
        class="{{icon ? 'pl-10' : 'pl-5'}} pr-9 py-3 text-xl w-full rounded-md mb-1 bg-zinc-900 border-1 focus:ring {{invalid && touched ? 'border-red-500 focus:ring-red-500' : 'focus:ring-sky-500 border-zinc-900'}} transition ease-in-out duration-150"
      />
      <i class="absolute top-[15px] left-2 text-2xl text-zinc-300 {{icon}}"></i>
      <button
        *ngIf="value && !disabled"
        (click)="clear()"
        class="absolute top-[18px] right-4 text-xl"
        type="button">
        <i class="ph-x-circle-fill"></i>
      </button>
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
export class InputComponent implements ControlValueAccessor {
  @Input() id = '';
  @Input() value = '';
  @Input() name = '';
  @Input() inputType = 'text';
  @Input() icon = '';
  @Input() invalid = false;
  @Input() placeholder = 'Example';
  @Input() maxLength = '10000';
  @Output() changed = new EventEmitter<string>();
  touched = false;
  disabled = false;
  internalType = this.inputType === 'currency' ? 'text' : this.inputType;

  onChange = (_: any) => {
  };

  onTouched = () => {
  };

  valueChanged() {
    if (this.inputType === 'currency') {
      const [masked, value] = currencyMasker(this.value);
      this.value = masked;
      this.emitNewValue(String(value));
    } else if (this.inputType === 'number') {
      this.value = digitMasker(this.value);
      this.emitNewValue(this.value);
    } else {
      this.emitNewValue(this.value);
    }
  }

  private emitNewValue(val: string) {
    this.markAsTouched();
    this.onChange(val);
    this.changed.emit(String(val));
  }

  private markAsTouched() {
    this.touched = true;
    this.onTouched();
  }

  clear() {
    this.value = '';
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

  writeValue(value: string): void {
    this.value = value;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
