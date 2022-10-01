import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
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
    this.animate = true;
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
