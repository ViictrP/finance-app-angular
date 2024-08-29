import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconButtonComponent } from '../buttons/icon-button.component';

@Component({
    standalone: true,
    imports: [CommonModule, IconButtonComponent],
    template: `
        <div
            tabindex="0"
            (keydown)="close($event)"
            (click)="close($event)"
            [ngClass]="{ hidden: !isShowing }"
            style="backdrop-filter: blur(2px) contrast(100%); -webkit-backdrop-filter: blur(2px) contrast(60%);"
            class="fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-80 transition-all ease-in duration-75"
        ></div>
        <div
            #bottomSheet
            id="bottom-sheet"
            style="transform: translateY(100%)"
            class="fixed z-10 h-auto p-4 bottom-[64px] right-0 left-0 shadow-md border-t-[1px] border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-t-lg transition ease-in duration-200"
        >
            <div class="w-full z-50 flex flex-row justify-between mb-2">
                <p class="text-neutral-500 text-xl">{{ title }}</p>
                <app-icon-button
                    size="big"
                    icon="ph-x-fill"
                    (click)="close()"
                />
            </div>
            <ng-content />
        </div>
    `,
    selector: 'app-bottom-sheet',
})
export class BottomSheetComponent {
    @Output() closed = new EventEmitter();
    @Input() title = '';
    isShowing = false;

    @ViewChild('bottomSheet') div?: ElementRef;

    constructor() {}

    get bottomSheet() {
        return this.div!.nativeElement;
    }

    show(): void {
        const body = document.body;
        body.classList.add('overflow-hidden', 'scrollbar-none');
        this.isShowing = true;
        this.bottomSheet.style.transform = 'translateY(0%)';
    }

    close(event?: Event) {
        if (event) event.stopPropagation();
        const body = document.body;
        body.classList.remove('overflow-hidden', 'scrollbar-none');
        this.isShowing = false;
        this.bottomSheet.style.transform = 'translateY(100%)';
        this.closed.emit();
    }
}
