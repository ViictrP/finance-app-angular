import { Component, ElementRef, ViewChild } from '@angular/core';

export const TYPES = {
  ERROR: 'red',
  INFO: 'sky',
  WARN: 'yellow',
  SUCCESS: 'green'
};

@Component({
  selector: 'app-message',
  template: `
    <div #message [ngClass]="{'hidden': !isShowing}" class="absolute top-4 right-4 left-4 h-20 border-[1px] {{type!}} rounded-lg">
     <div class="relative flex items-center justify-center h-full">
       <app-icon-button class="absolute top-1 right-1" icon="ph-x" (click)="close()"></app-icon-button>
       <p class="text-xl">{{msg}}</p>
     </div>
    </div>
  `,
  styles: [`
    .fade-in {
      animation: fadeIn 250ms ease-in-out;
    }

    @keyframes fadeIn {
      0% {
        opacity: 0;
      }

      100% {
        opacity: 100%;
      }
    }
  `]
})
export class MessageComponent {
  isShowing = false;
  msg?: string;
  type?: string;
  @ViewChild('message') messageRef?: ElementRef;

  get message() {
    return this.messageRef!.nativeElement;
  }

  close() {
    this.msg = '';
    this.type = '';
    this.isShowing = false;
  }

  show(msg: string, type: keyof typeof TYPES) {
    this.msg = msg;
    this.type = `bg-${TYPES[type]}-500 border-${TYPES[type]}-400`;
    this.message.classList.toggle('fade-in');
    this.isShowing = true;
    setTimeout(() => {
      this.close();
    }, 3000);
  }
}
