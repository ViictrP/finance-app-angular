import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {slideUpAnimation} from './animations/slide-up-animation';

@Component({
  selector: 'app-bottom-sheet',
  animations: [slideUpAnimation],
  template: `
    <div
      [ngClass]="{'hidden' : !isShowing}"
      class="fixed bottom-0 left-0 right-0 top-0 bg-black bg-opacity-80 transition-all ease-in-out duration-150">
      <div
        (click)="close($event)"
        style="height: 100vh;">
      </div>
      <div
        [@slideUpAnimation]="animate"
        class="fixed h-auto p-4 bottom-[64px] right-0 left-0 shadow-md bg-zinc-900 rounded-t-lg translate-y-100">
        <div class="w-full z-50 flex flex-row justify-between mb-2">
          <p class="text-neutral-500 text-xl">{{title}}</p>
          <app-icon-button size="big" icon="ph-x-fill" (click)="close()">
          </app-icon-button>
        </div>
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class BottomSheetComponent {
  @Output() closed = new EventEmitter();
  @Input() title = '';
  isShowing = false;
  animate = false;

  show(): void {
    const body = document.body;
    body.classList.add('overflow-hidden', 'scrollbar-none');
    this.isShowing = true;
    setTimeout(() => this.animate = true, 1500);
  }

  close(event?: any) {
    if (event) event.stopPropagation();
    const body = document.body;
    body.classList.remove('overflow-hidden', 'scrollbar-none');
    this.isShowing = false;
    this.animate = false;
    this.closed.emit();
  }
}
