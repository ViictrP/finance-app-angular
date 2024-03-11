import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { ButtonComponent } from '../buttons/button.component';

type OnChangedFn = (_: unknown) => void;
type OnTouchedFn = () => void;

@Component({
  selector: 'app-botton-nav-input',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule,
    NgClass,
    BottomSheetComponent,
    ButtonComponent,
  ],
  template: `
    <div class="h-14 mb-10">
      <div
        [ngClass]="{
        'text-zinc-900 dark:text-white' : disabled,
        'border-2 border-red-500 bg-white': required && touched && !value
      }"
        class="flex flex-row items-center justify-center bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-2 text-gray-700 leading-tight focus-within:outline-none focus-within:bg-white focus-within:border-transparent">
        @if (!!value) {
          <div class="w-8 h-5 {{value}} rounded-sm"></div>
        } @else {
          <i class="text-gray-500 text-2xl {{icon}}"></i>
        }
        <button
          [id]="id"
          [name]="name ?? ''"
          [disabled]="disabled"
          (click)="click()"
          type="button"
          [ngClass]="{'text-gray-50' : disabled}"
          class="bg-transparent appearance-none border-none rounded w-full py-2 pl-2 pr-4 text-gray-500 leading-tight focus:outline-none focus:ring-0">
          {{ value ? colorMap.get(value.toString()) : placeholder }}
        </button>
      </div>
      @if (required && touched && !value) {
        <p class="text-xs mt-2 text-red-500">{{ errorMessage ?? '' }}</p>
      }
      <app-bottom-sheet title="Escolha uma cor..." #bottomSheet (closed)="showingBottomSheet = false;">
        <div class="flex flex-col gap-2 justify-evenly text-neutral-50">
          <button
            type="button" (click)="optionClicked('bg-zinc-900')"
            class="text-zinc-900 w-1/3 p-3 flex flex-row items-center justify-start">
            <div class="w-8 h-5 bg-zinc-900 mr-3 rounded-sm"></div>
            <p>Preto</p>
          </button>
          <button
            type="button" (click)="optionClicked('bg-purple-900')"
            class="text-zinc-900 w-1/3 p-3 flex flex-row items-center justify-start">
            <div class="w-8 h-5 bg-purple-900 mr-3 rounded-sm"></div>
            <p>Roxo</p>
          </button>
          <button
            type="button" (click)="optionClicked('bg-orange-500')"
            class="text-zinc-900 w-1/3 p-3 flex flex-row items-center justify-start">
            <div class="w-8 h-5 bg-orange-500 mr-3 rounded-sm"></div>
            <p>Laranja</p>
          </button>
          <button
            type="button" (click)="optionClicked('bg-blue-500')"
            class="text-zinc-900 w-1/3 p-3 flex flex-row items-center justify-start">
            <div class="w-8 h-5 bg-blue-500 mr-3 rounded-sm"></div>
            <p>Azul</p>
          </button>
        </div>
      </app-bottom-sheet>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: BottonNavInputComponent
    }
  ]
})
export default class BottonNavInputComponent implements ControlValueAccessor {

  @Input({ required: true }) id!: string;
  @Input() name?: string;
  @Input() placeholder?: string;
  @Input() value?: string;
  @Input() disabled = false;
  @Input() errorMessage?: string;
  @Input() required = false;
  @Input() icon = 'ph-palette';
  @Output() changed = new EventEmitter<string>();

  @ViewChild('bottomSheet') bottomSheet: BottomSheetComponent | undefined;
  showingBottomSheet = false;

  touched = false;

  colorMap = new Map();

  constructor() {
    this.colorMap.set('bg-zinc-900', 'Preto');
    this.colorMap.set('bg-purple-900', 'Roxo');
    this.colorMap.set('bg-orange-500', 'Laranja');
    this.colorMap.set('bg-blue-500', 'Azul');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange: OnChangedFn = (_: unknown) => {
  };

  onTouched: OnTouchedFn = () => {
  };

  click() {
    this.touched = true;
    this.onTouched();
    this.bottomSheet?.show();
    this.showingBottomSheet = true;
  }

  optionClicked(color: string) {
    this.value = color;
    this.onChange(color);
    this.changed.emit(color);
    this.bottomSheet?.close();
  }

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
}
