import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {BaseComponent} from '../BaseComponent';

@Component({
  selector: 'app-transactio-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionFormComponent extends BaseComponent {

  constructor(detector: ChangeDetectorRef) {
    super(detector);
  }
}
