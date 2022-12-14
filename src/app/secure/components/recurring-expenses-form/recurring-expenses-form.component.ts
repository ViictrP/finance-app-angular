import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BaseComponent } from '../BaseComponent';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import User from '../../../entities/User';
import { RecurringExpensesService } from '../../services/recurring-expenses.service';

@Component({
  selector: 'app-recurring-expense-form',
  templateUrl: './recurring-expenses-form.component.html',
  styleUrls: ['./recurring-expenses-form.component.scss'],
})
export class RecurringExpensesFormComponent extends BaseComponent implements OnInit {

  user$?: Observable<User>;

  constructor(readonly changeDetector: ChangeDetectorRef,
              private readonly userService: UserService,
              private readonly service: RecurringExpensesService) {
    super(changeDetector);
  }

  ngOnInit(): void {
    this.user$ = this.userService.currentUser;
  }
}
