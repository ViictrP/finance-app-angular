import { Component, EventEmitter, Input, Output } from '@angular/core';
import CardComponent from './card.component';
import { NgClass } from '@angular/common';
import ObservableDirective from './observable.directive';
import { IconButtonComponent } from '../buttons/icon-button.component';

interface CarouselItem {
    id: number;
    title: string;
    backgroundColor: string;
}

@Component({
    selector: 'app-card-carousel',
    standalone: true,
    template: `
        <div class="card-carousel-container">
            @for (item of items; track item.id) {
                <app-card [backgroundColor]="item.backgroundColor">
                    <div
                        [id]="item.id"
                        style="scroll-snap-align: start; flex: 0 0 100%"
                        [ngClass]="{ active: item.id === selectedItem.id }"
                        appObserveElement
                        [isContinuous]="true"
                        (isIntersecting)="selectItem($event)"
                        class="card-carousel-item"
                    >
                        <div class="flex flex-row justify-between items-center">
                            <p class="text-white">{{ item.title }}</p>
                            <div class="flex flex-row justify-evenly gap-4">
                                <app-icon-button
                                    class="text-white"
                                    icon="ph-pencil-simple-line"
                                    size="big"
                                    (clicked)="editClicked.emit(item.id)"
                                />
                                <app-icon-button
                                    class="text-white"
                                    icon="ph-trash-simple"
                                    size="big"
                                    (clicked)="deleteClicked.emit(item.id)"
                                />
                            </div>
                        </div>
                    </div>
                </app-card>
            }
        </div>
    `,
    imports: [CardComponent, NgClass, ObservableDirective, IconButtonComponent],
    styles: `
        .card-carousel-container {
            scroll-snap-type: x mandatory;
            scroll-snap-stop: normal;
            scroll-behavior: smooth;
            scroll-padding: 2rem;
            @apply px-4 py-8 flex overflow-auto gap-4 scrollbar-none;
        }

        .card-carousel-item {
            @apply w-[80vw] h-[150px] block text-xl p-4;
            transition: all ease-in-out 100ms;
            @apply border-2 border-transparent;
        }

        .card-carousel-item.active::before {
            @apply border-4 border-orange-500 rounded-lg;
        }
    `,
})
export default class CardCarouselComponent {
    @Input({ required: true }) items: CarouselItem[] = [];
    @Output() itemChanged = new EventEmitter<number>();
    @Output() editClicked = new EventEmitter<number>();
    @Output() deleteClicked = new EventEmitter<number>();

    selectedItem: CarouselItem;

    constructor() {
        this.selectedItem = this.items[0] ?? {};
    }

    selectItem(itemId: string) {
        if (itemId) {
            this.itemChanged.emit(Number(itemId));
        }
    }
}
