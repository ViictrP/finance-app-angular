import {Component, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-input',
  template: `
    <div class="relative">
      <input
        [id]="id"
        [name]="name"
        [(ngModel)]="value"
        [disabled]="disabled"
        [type]="type"
        [placeholder]="placeholder"
        (input)="valueChanged()"
        class="{{icon ? 'pl-10' : 'pl-5'}} pr-9 py-3 text-xl w-full rounded-md mb-1 border-1 border-zinc-900 bg-zinc-900 border-2 border-transparent focus:outline-0 focus:ring {{invalid && touched ? 'border-red-500 focus:ring-red-500' : 'focus:ring-sky-500'}} transition ease-in-out duration-150"
      />
      <i class="absolute top-[13px] left-2 text-2xl {{icon}}"></i>
      <button
        *ngIf="value"
        (click)="clear()"
        class="absolute top-[16px] right-4 text-xl"
        type="button">
        <i class="ph-x-circle-fill"></i>
      </button>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: InputComponent
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() id = '';
  @Input() value = '';
  @Input() name = '';
  @Input() type = 'text';
  @Input() icon = '';
  @Input() invalid = false;
  @Input() placeholder = 'Example';
  touched = false;
  disabled = false;

  onChange = (_: any) => {
  };

  onTouched = () => {
  };

  valueChanged() {
    this.markAsTouched();
    this.onChange(this.value);
  }

  private markAsTouched() {
    this.touched = true;
    this.onTouched();
  }

  clear() {
    this.value = '';
    this.markAsTouched();
    this.onChange(this.value);
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
