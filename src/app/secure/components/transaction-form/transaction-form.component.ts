import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../BaseComponent';
import { UserService } from '../../services/user.service';
import { SelectOption } from '../../../lib/components/form/select/select.component';
import TransactionService from '../../services/transaction.service';
import User from '../../../entities/User';
import Transaction from '../../../entities/Transaction';
import { ModalComponent } from '../../../lib/components/modal/modal.component';

@Component({
  selector: 'app-transactio-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionFormComponent extends BaseComponent implements OnInit {

  @ViewChild('modal') modal?: ModalComponent;

  creditCards: SelectOption[] = [];
  loading = false;
  success = false;
  user?: User;

  constructor(detector: ChangeDetectorRef,
              private readonly userService: UserService,
              private readonly service: TransactionService) {
    super(detector);
  }

  ngOnInit(): void {
    this.subscribeAndRender(
      this.userService.currentUser,
      (user) => {
        this.user = user;
        this.creditCards = user?.creditCards?.map(creditCard => ({
          value: creditCard.id,
          label: creditCard.title
        }));
      }
    );
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
