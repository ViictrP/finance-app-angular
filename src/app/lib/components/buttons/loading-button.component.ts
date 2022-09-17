import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-loading-button',
  template: `
    <button
      [disabled]="disabled"
      class="block w-full px-4 py-3 text-xl bg-blue-500 rounded-lg transition ease-in-out duration-100 hover:bg-sky-500 hover:border-sky-900 disabled:bg-blue-900 {{loading ? '' : 'disabled:text-gray-600'}} active:outline-pink-800 focus:outline-pink-800 focus:outline-8"
      (click)="onClick()"
      [type]="type">
      <div *ngIf="loading" class="flex justify-center gap-2 align-middle">
        <i class="ph-spinner-gap-fill animate-spin text-3xl"></i>
       {{loadingLabel}}
      </div>
      <div *ngIf="!loading">
        <ng-content></ng-content>
      </div>
    </button>
  `
})
export class LoadingButtonComponent {
  @Input() disabled = false;
  @Input() type = 'button';
  @Input() loadingLabel = 'processing...';
  @Input() loading = false;
  @Output() clickEvent = new EventEmitter();

  onClick() {
    this.clickEvent.emit();
  }
}
