import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, OnInit } from '@angular/core';
import LoadingComponent from '../../../lib/components/loading/loading.component';
import BaseComponent from '../base.component';
import { ProfileService } from '../../../services/profile.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputDateComponent } from '../../../lib/components/form/input-date.component';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { BalanceService } from '../../../services/balance.service';
import ChipComponent from '../../../lib/components/chip/chip.component';
import NoDataComponent from '../../../lib/components/no-data/no-data.component';
import TransactionCardComponent from '../../../lib/components/transaction-card/transactionCardComponent';
import BalanceDTO from '../../../dto/balance.dto';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [
    LoadingComponent,
    FormsModule,
    InputDateComponent,
    ReactiveFormsModule,
    ChipComponent,
    NoDataComponent,
    TransactionCardComponent,
    CurrencyPipe,
  ],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceComponent extends BaseComponent implements OnInit  {

  isProfileLoading = false;
  balance?: BalanceDTO;
  today = new Date();
  creditCardsTotal: { [key: string]: number } = {};

  constructor(readonly changeDetector: ChangeDetectorRef,
              readonly profileService: ProfileService,
              private readonly balanceService: BalanceService) {
    super(changeDetector);

    this.isProfileLoading = profileService.loading;
    effect(() => {
      this.isProfileLoading = profileService.loading;
      this.changeDetector.detectChanges();
    });
  }

  ngOnInit() {
    const month = format(this.today, 'MMM', { locale: ptBR }).toUpperCase();
    this.subscribeAndRender(
      this.balanceService.getBalance(month, this.today.getFullYear()),
      (balance) => {
        this.balance = balance;
      }
    );
  }

  calculatePercentage(creditCardId: string) {
    return parseFloat(String((this.balance!.creditCardExpenses[creditCardId] / this.balance!.expenses) * 100)).toFixed(2);
  }

  monthChanged(monthAndYear: Date) {
    const formattedMonth = format(monthAndYear, 'MMM', { locale: ptBR }).toUpperCase();

    this.subscribeAndRender(
      this.balanceService.getBalance(formattedMonth, monthAndYear.getFullYear()),
      (balance) => {
        this.balance = balance;
      }
    )
  }
}
