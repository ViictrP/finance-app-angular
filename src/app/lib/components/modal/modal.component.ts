import {Component, EventEmitter, Input, Output} from '@angular/core';

let input = Input();

@Component({
  selector: 'app-modal',
  template: `
    <div
      [ngClass]="{'hidden': !isShowing}"
      class="fade-in fixed flex flex-col items-center w-full h-full top-0 left-0 overflow-hidden scrollbar-none bg-zinc-900 bg-opacity-90 z-10 transition delay-1s">
      <div
        class="relative shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-800 w-64 m-auto border-[0.5px] border-gray-200 dark:border-gray-700">
        <div class="w-full h-full text-center">
          <div class="flex h-full flex-col justify-between">
            <ng-content></ng-content>
          </div>
        </div>
        <app-icon-button
          (click)="close($event)"
          *ngIf="showCloseButton"
          class="gap-0 absolute p-1 text-neutral-800 dark:text-neutral-200 bg-gray-50 dark:bg-gray-800 border-[0.5px] border-gray-200 dark:border-gray-700 rounded-full top-[-10px] right-[-10px]"
          size="small"
          icon="ph-x-fill">
        </app-icon-button>
      </div>
    </div>
  `
})
export class ModalComponent {

  isShowing = false;
  @Input() showCloseButton = true;
  @Output() closed = new EventEmitter<any>();

  show(): void {
    const body = document.body;
    body.classList.add('overflow-hidden', 'scrollbar-none');
    this.isShowing = true;
  }

  close(event?: any) {
    if (event) event.stopPropagation();
    const body = document.body;
    body.classList.remove('overflow-hidden', 'scrollbar-none');
    this.isShowing = false;
    this.closed.emit();
  }
}
