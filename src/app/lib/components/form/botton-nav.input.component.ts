import {
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import { NgClass, NgOptimizedImage } from '@angular/common';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    ReactiveFormsModule,
} from '@angular/forms';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { ButtonComponent } from '../buttons/button.component';

type OnChangedFn = (_: unknown) => void;
type OnTouchedFn = () => void;

interface Option {
    id: string | number;
    value: string;
    icon?: string;
}

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
                    'bg-gray-200 text-zinc-900 dark:text-white': disabled,
                    'bg-white': !disabled,
                    'border-red-500': required && touched && !value,
                }"
                class="flex flex-row items-center justify-center appearance-none border-2 border-gray-200 rounded w-full py-2 px-2 text-gray-700 leading-tight focus-within:outline-none focus-within:bg-white focus-within:border-transparent"
            >
                @if (!!value) {
                    @if (value.icon) {
                        <i class="text-gray-500 text-2xl {{ value!.icon }}"></i>
                    } @else {
                        <div class="w-8 h-5 {{ value.id }} rounded-sm"></div>
                    }
                } @else {
                    <i class="text-gray-500 text-2xl {{ icon }}"></i>
                }
                <button
                    [id]="id"
                    [name]="name ?? ''"
                    [disabled]="disabled"
                    (click)="click()"
                    type="button"
                    [ngClass]="{
                        'text-gray-50': disabled,
                        'text-black': !!value,
                        'text-gray-500': !value,
                    }"
                    class="text-left bg-transparent appearance-none border-none rounded w-full py-2 pl-2 pr-4 leading-tight focus:outline-none focus:ring-0"
                >
                    {{ value ? getOptionColor(value) : placeholder }}
                </button>
                <i class="text-gray-500 text-xl ph-caret-down"></i>
            </div>
            @if (required && touched && !value) {
                <p class="text-xs mt-2 text-red-500">
                    {{ errorMessage ?? '' }}
                </p>
            }
            <app-bottom-sheet
                title="Escolha uma opção..."
                #bottomSheet
                (closed)="showingBottomSheet = false"
            >
                <div class="flex flex-col gap-2 justify-evenly text-neutral-50">
                    @for (option of options; track option.id) {
                        <button
                            type="button"
                            (click)="optionClicked(option)"
                            class="text-zinc-900 w-full p-3 flex flex-row items-center justify-start"
                        >
                            @if (option.icon) {
                                <div class="w-8 h-5 mr-3 rounded-sm">
                                    <i
                                        class="text-gray-500 text-2xl {{
                                            option.icon
                                        }}"
                                    ></i>
                                </div>
                            } @else {
                                <div
                                    [ngClass]="option.value"
                                    class="w-8 h-5 mr-3 rounded-sm"
                                ></div>
                            }
                            <p>
                                {{
                                    type === 'color'
                                        ? colorMap.get(option.id)
                                        : option.value
                                }}
                            </p>
                        </button>
                    }
                </div>
            </app-bottom-sheet>
        </div>
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: BottonNavInputComponent,
        },
    ],
})
export default class BottonNavInputComponent implements ControlValueAccessor {
    @Input({ required: true }) id!: string;
    @Input() name?: string;
    @Input() placeholder?: string;
    @Input() value?: Option;
    @Input() disabled = false;
    @Input() errorMessage?: string;
    @Input() required = false;
    @Input() icon = 'ph-palette';
    @Input() options: Option[] = [];
    @Input() type: 'color' | 'other' = 'color';
    @Output() changed = new EventEmitter<string | number>();

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

    getOptionColor(option: Option): string {
        const color = this.colorMap.get(option.id);
        return color ?? option.value;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onChange: OnChangedFn = (_: unknown) => {};

    onTouched: OnTouchedFn = () => {};

    click() {
        this.touched = true;
        this.onTouched();
        this.bottomSheet?.show();
        this.showingBottomSheet = true;
    }

    optionClicked(option: Option) {
        this.value = option;
        this.onChange(option);
        this.changed.emit(option.id);
        this.bottomSheet?.close();
    }

    writeValue(value: Option): void {
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
