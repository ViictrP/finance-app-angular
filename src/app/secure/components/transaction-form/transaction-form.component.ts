import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from '../BaseComponent';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {SelectOption} from '../../../lib/components/form/select/select.component';
import TransactionService from '../../services/transaction.service';
import User from '../../../entities/User';
import Invoice from '../../../entities/Invoice';
import Transaction from '../../../entities/Transaction';
import {ModalComponent} from '../../../lib/components/modal/modal.component';

@Component({
  selector: 'app-transactio-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionFormComponent extends BaseComponent implements OnInit {

  @ViewChild('modal') modal?: ModalComponent;

  form: FormGroup;
  categoryOptions = [
    {
      value: 'food',
      label: 'Restaurante'
    },
    {
      value: 'credit-card',
      label: 'Cartão'
    },
    {
      value: 'home',
      label: 'Casa'
    },
    {
      value: 'shop',
      label: 'Shop'
    },
    {
      value: 'other',
      label: 'Outro'
    }
  ];
  creditCards: SelectOption[] = [];
  loading = false;
  success = false;
  user?: User;

  constructor(detector: ChangeDetectorRef,
              formBuilder: FormBuilder,
              private readonly userService: UserService,
              private readonly service: TransactionService) {
    super(detector);
    this.form = formBuilder.group({
      creditCard: [null, []],
      date: [new Date(), [Validators.required]],
      category: [null, [Validators.required]],
      description: [null, Validators.required],
      amount: [null, Validators.required],
      installmentAmount: [null, []]
    });
  }

  get creditCard() {
    return this.form.get('creditCard');
  }

  get date() {
    return this.form.get('date');
  }

  get category() {
    return this.form.get('category');
  }

  get description() {
    return this.form.get('description');
  }

  get amount() {
    return this.form.get('amount');
  }

  get installmentAmount() {
    return this.form.get('installmentAmount');
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

  save() {
    this.loading = true;
    const transaction: Transaction = {
      isInstallment: Number(this.form.value.installmentAmount) > 1,
      date: this.form.value.date,
      category: this.form.value.category,
      description: this.form.value.description,
      amount: this.form.value.amount,
      installmentAmount: this.form.value.installmentAmount
    };

    if (this.form.value.creditCard) {
      transaction.invoice = {
        creditCard: {
          id: this.form.value.creditCard
        }
      } as Invoice;
    }

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
