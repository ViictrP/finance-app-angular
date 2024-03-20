import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import { AsyncPipe, CurrencyPipe, DatePipe, JsonPipe, NgClass, NgOptimizedImage } from '@angular/common';
import {Router} from "@angular/router";
import UserDTO from '../../../dto/user.dto';
import ProfileDTO from '../../../dto/profile.dto';
import { ProfileService } from '../../../services/profile.service';
import { IconButtonComponent } from '../../../lib/components/buttons/icon-button.component';
import TransactionCardComponent from '../../../lib/components/transaction-card/transactionCardComponent';
import ChipComponent from '../../../lib/components/chip/chip.component';
import NoDataComponent from '../../../lib/components/no-data/no-data.component';
import LoadingComponent from '../../../lib/components/loading/loading.component';
import BaseComponent from '../base.component';
import { BalanceService } from '../../../services/balance.service';
import BalanceDTO from '../../../dto/balance.dto';
import { calculateExpensesHelper } from '../../../helper/calculate-expenses.helper';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    JsonPipe,
    NgOptimizedImage,
    AsyncPipe,
    CurrencyPipe,
    IconButtonComponent,
    NgClass,
    TransactionCardComponent,
    ChipComponent,
    NoDataComponent,
    LoadingComponent,
    DatePipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent extends BaseComponent {

  isProfileLoading = false;
  user: UserDTO;
  profile: ProfileDTO | null = null;
  today = new Date();
  balance?: BalanceDTO;
  recurringExpenseAmount?: number;
  expensesAmount?: number;
  creditCardsTotal: { [key: string]: number } = {};

  constructor(readonly authService: AuthService,
              private readonly router: Router,
              private readonly balanceService: BalanceService,
              readonly profileService: ProfileService,
              changeDetection: ChangeDetectorRef) {
    super(changeDetection);
    this.user = authService.user;

    this.isProfileLoading = profileService.loading;
    effect(() => {
      this.profile = profileService.profile();
      this.calculateExpensesAmout();
      this.isProfileLoading = profileService.loading;
      changeDetection.detectChanges();
    });
  }

  private calculateExpensesAmout() {
    const [total, creditCardsTotal] = calculateExpensesHelper((this.profile?.transactions ?? []), this.profile?.creditCards ?? []);
    this.recurringExpenseAmount = this.profile?.recurringExpenses?.reduce((sum, current) => sum + Number(current.amount), 0);
    this.expensesAmount = total + Number(this.recurringExpenseAmount ?? 0);
    this.creditCardsTotal = creditCardsTotal;
  }

  calculatePercentage(creditCardId: string) {
    return parseFloat(String((this.creditCardsTotal[creditCardId] / this.expensesAmount!) * 100)).toFixed(2);
  }

  async goToBalance() {
    return this.router.navigate(['secure/balance']);
  }
}
