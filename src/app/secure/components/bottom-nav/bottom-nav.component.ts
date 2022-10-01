import {Component, ViewChild} from '@angular/core';
import {BottomSheetComponent} from '../../../lib/components/bottom-sheet/bottom-sheet.component';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss']
})
export class BottomNavComponent {

  @ViewChild('bottomSheet') bottomSheet: BottomSheetComponent | undefined;

  constructor() {
  }

  showBottomSheet() {
    this.bottomSheet?.show();
  }

  addCreditCard() {

  }

  addTransaction() {

  }
}
