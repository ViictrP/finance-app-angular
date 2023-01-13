import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../BaseComponent';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import User from '../../../entities/User';
import { RecurringExpensesService } from '../../services/recurring-expenses.service';
import Transaction from '../../../entities/Transaction';
import { ModalComponent } from '../../../lib/components/modal/modal.component';

@Component({
  selector: 'app-recurring-expense-form',
  templateUrl: './recurring-expenses-form.component.html',
  styleUrls: ['./recurring-expenses-form.component.scss'],
})
export class RecurringExpensesFormComponent extends BaseComponent implements OnInit {
  @ViewChild('modal') modal?: ModalComponent;
  user$?: Observable<User>;
  loading = false;
  success = false;

  constructor(private readonly changeDetector: ChangeDetectorRef,
              private readonly userService: UserService,
              private readonly service: RecurringExpensesService) {
    super(changeDetector);
  }

  ngOnInit(): void {
    this.user$ = this.userService.currentUser;
  }

  save(transaction: Transaction) {
    this.loading = true;

    this.subscribeAndRender(
      this.service.save(transaction),
      () => {
        this.success = true;
        this.loading = false;
        this.modal?.show();
        this.success = false;
      }
    )
  }
}
