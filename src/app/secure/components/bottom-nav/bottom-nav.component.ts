import {Component, ViewChild} from '@angular/core';
import {BottomSheetComponent} from '../../../lib/components/bottom-sheet/bottom-sheet.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss']
})
export class BottomNavComponent {

  @ViewChild('bottomSheet') bottomSheet: BottomSheetComponent | undefined;

  constructor(private readonly router: Router) {
  }

  showBottomSheet() {
    this.bottomSheet?.show();
  }

  addCreditCard() {
    this.router.navigate(['/secure/credit-card-form']);
    this.bottomSheet?.close();
  }

  addTransaction() {
    this.router.navigate(['/secure/transaction-form']);
    this.bottomSheet?.close();
  }
}
