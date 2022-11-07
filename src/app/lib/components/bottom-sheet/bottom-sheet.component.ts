import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetComponent {
  @Output() closed = new EventEmitter();
  @Input() title = '';
  isShowing = false;

  @ViewChild('bottomSheet') div?: ElementRef;

  get bottomSheet() {
    return this.div!.nativeElement;
  }

  show(): void {
    const body = document.body;
    body.classList.add('overflow-hidden', 'scrollbar-none');
    this.isShowing = true;
    this.bottomSheet.style.transform = 'translateY(0%)';
  }

  close(event?: any) {
    if (event) event.stopPropagation();
    const body = document.body;
    body.classList.remove('overflow-hidden', 'scrollbar-none');
    this.isShowing = false;
    this.bottomSheet.style.transform = 'translateY(100%)';
    this.closed.emit();
  }
}
