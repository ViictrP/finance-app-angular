import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastEvent } from './model/toast-event';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toaster',
  template: `
    <div class="toaster position-fixed top-0 end-0 px-3 py-2 m-16">
      <div *ngFor="let toast of currentToasts; index as i">
        <app-toast
          [type]="toast.type"
          [title]="toast.title"
          [message]="toast.message"
          (disposeEvent)="dispose(i)"
        ></app-toast>
      </div>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToasterComponent implements OnInit {
  currentToasts: ToastEvent[] = [];

  constructor(private readonly service: ToastService,
              private readonly changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.subscribeToToasts();
  }

  subscribeToToasts() {
    this.service.toastEvents$.subscribe((toasts) => {
      const currentToast: ToastEvent = {
        type: toasts.type,
        title: toasts.title,
        message: toasts.message,
      };
      this.currentToasts.push(currentToast);
      this.changeDetector.detectChanges();
    });
  }

  dispose(index: number) {
    this.currentToasts.splice(index, 1);
    this.changeDetector.detectChanges();
  }
}
