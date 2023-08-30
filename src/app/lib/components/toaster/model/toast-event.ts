import { ToastEventType } from './toast-event-type';

export interface ToastEvent {
  title: string;
  message: string;
  type: ToastEventType;
}
