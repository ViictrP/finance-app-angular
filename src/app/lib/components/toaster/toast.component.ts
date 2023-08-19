import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastEventType } from './model/toast-event-type';
import { fromEvent, take } from 'rxjs';
import { Toast } from 'bootstrap';

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

  toast!: Toast;

  ngOnInit(): void {
    this.show();
  }

  show() {
    this.toast = new Toast(
      this.toastEl.nativeElement,
      this.type === ToastEventType.ERROR
        ? {
          autohide: false,
        }
        : {
          delay: 5000,
        }
    );

    fromEvent(this.toastEl.nativeElement, 'hidden.bs.toast')
      .pipe(take(1))
      .subscribe(() => this.hide());

    this.toast.show();
  }

  hide() {
    this.toast.dispose();
    this.disposeEvent.emit();
  }
}
