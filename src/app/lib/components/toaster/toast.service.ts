import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ToastEvent } from './model/toast-event';
import { ToastEventType } from './model/toast-event-type';

@Injectable()
export class ToastService {
  toastEvents$: Observable<ToastEvent>;
  private _toastEvents = new Subject<ToastEvent>();

  constructor() {
    this.toastEvents$ = this._toastEvents.asObservable();
  }

  showSuccess(title: string, message: string) {
    this.show(title, message, ToastEventType.SUCCESS);
  }

  showError(title: string, message: string) {
    this.show(title, message, ToastEventType.ERROR);
  }

  private show(title: string, message: string, type: ToastEventType) {
    this._toastEvents.next({
      title,
      message,
      type
    });
  }
}
