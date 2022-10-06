import {Component} from '@angular/core';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-transactio-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent {

  subs = new Subscription();
}
