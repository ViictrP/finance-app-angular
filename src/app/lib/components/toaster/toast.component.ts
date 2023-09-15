import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastEventType } from './model/toast-event-type';

@Component({
  selector: 'app-toast',
  template: `
    <div
      #toastElement
      class="toast fade toast-width mt-2"
      [ngClass]="type"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-header">
        <strong class="me-auto">{{ title }}</strong>
        <button type="button" class="btn-close" aria-label="Close" (click)="hide()"></button>
      </div>
      <div class="toast-body">{{ message }}</div>
    </div>
  `
})
export class ToastComponent implements OnInit {
  @Output() disposeEvent = new EventEmitter();

  @ViewChild('toastElement', { static: true })
  toastEl!: ElementRef;

  @Input()
  type!: ToastEventType;

  @Input()
  title!: string;

  @Input()
  message!: string;

  ngOnInit(): void {
    this.show();
  }

  show() {

  }

  hide() {
    this.disposeEvent.emit();
  }
}
