import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../../lib/components/modals/modal.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import BaseComponent from '../../base.component';
import LoadingComponent from '../../../../lib/components/loading/loading.component';
import InputComponent from '../../../../lib/components/form/input.component';
import BottonNavInputComponent from '../../../../lib/components/form/botton-nav.input.component';
import { NgClass } from '@angular/common';
import { InputDateComponent } from '../../../../lib/components/form/input-date.component';
import { ProfileService } from '../../../../services/profile.service';
import CreditCardDTO from '../../../../dto/credit-card.dto';
import { TransactionService } from '../../../../services/transaction.service';
import TransactionDTO from '../../../../dto/transaction.dto';
import CheckboxComponent from '../../../../lib/components/form/checkbox.component';
import { Observable } from 'rxjs';
import RecurringExpenseDTO from '../../../../dto/recurring-expense.dto';
import { RecurringExpenseService } from '../../../../services/recurring-expense.service';

@Component({
  selector: 'app-transactions-form',
  standalone: true,
  imports: [
    ModalComponent,
    LoadingComponent,
    InputComponent,
    BottonNavInputComponent,
    NgClass,
    ReactiveFormsModule,
    InputDateComponent,
    CheckboxComponent,
  ],
  templateUrl: './transactions-form.component.html',
  styleUrl: './transactions-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsFormComponent extends BaseComponent {

  @ViewChild('modal') modal?: ModalComponent;
  loadingProfile = false;
  formGroup: FormGroup;
  creditCards: CreditCardDTO[] = [];
  isRecurringExpense = false;
  today = new Date();

  constructor(readonly formBuilder: FormBuilder,
              changeDetectorRef: ChangeDetectorRef,
              private readonly transactionService: TransactionService,
              private readonly recurringExpenseService: RecurringExpenseService,
              readonly profileService: ProfileService) {
    super(changeDetectorRef);
    this.formGroup = formBuilder.group({
      description: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      category: [null, [Validators.required]],
      date: [null, [Validators.required]],
      installmentAmount: [null, []],
      creditCard: [null, []],
    });

    effect(() => {
      this.creditCards = profileService.profile()?.creditCards ?? [];
      this.loadingProfile = profileService.loading;
      changeDetectorRef.detectChanges();
    });
  }

  get options(): { id: number, value: string }[] {
    return this.creditCards.map(c => ({
      id: c.id,
      value: c.title,
      icon: 'ph-credit-card'
    }));
  }

  get creditCardControl() {
    return this.formGroup.controls['creditCard'];
  }

  isRecurringExpenseChanged(isRecurringExpense: boolean): void {
    this.isRecurringExpense = isRecurringExpense;

    if (isRecurringExpense) {
      this.creditCardControl.disable();
    } else {
      this.creditCardControl.enable();
    }
  }

  save() {
    let $create: Observable<TransactionDTO | RecurringExpenseDTO>;
    if (this.isRecurringExpense) {
      const payload: Partial<RecurringExpenseDTO> = {
        amount: this.formGroup.value.amount,
        description: this.formGroup.value.description,
        category: this.formGroup.value.category.id,
        date: this.formGroup.value.date
      };
      $create = this.recurringExpenseService.create(payload as RecurringExpenseDTO);
    } else {
      const payload = this.createTranctionPayload();
      $create = this.transactionService.create(payload as TransactionDTO);
    }

    this.subscribeAndRender($create, () => {
        this.modal?.show();
      },
    );
  }

  private createTranctionPayload() {
    const payload: Partial<TransactionDTO> = {
      date: this.formGroup.value.date,
      amount: this.formGroup.value.amount,
      description: this.formGroup.value.description,
      category: this.formGroup.value.category.id,
      installmentAmount: this.formGroup.value.installmentAmount ?? 1,
      isInstallment: this.formGroup.value.installmentAmount > 1
    };

    if (this.formGroup.value.creditCard && !this.isRecurringExpense) {
      const creditCard = this.creditCards.find(c => c.id === this.formGroup.value.creditCard.id);
      payload.creditCardId = creditCard?.id;
    }

    payload.isInstallment = payload.installmentNumber! > 1;
    return payload;
  }
}
