import { ChangeDetectorRef, Component, effect } from '@angular/core';
import BaseComponent from '../../base.component';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../../../services/profile.service';
import CreditCardDTO from '../../../../dto/credit-card.dto';
import LoadingComponent from '../../../../lib/components/loading/loading.component';
import { CurrencyPipe, DatePipe } from '@angular/common';
import NoDataComponent from '../../../../lib/components/no-data/no-data.component';
import TransactionCardComponent from '../../../../lib/components/transaction-card/transactionCardComponent';
import TransactionDTO from '../../../../dto/transaction.dto';
import { IconButtonComponent } from '../../../../lib/components/buttons/icon-button.component';
import currencyMasker from '../../../../lib/helpers/currency.masker';
import { InputDateComponent } from '../../../../lib/components/form/input-date.component';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { InvoiceService } from '../../../../services/invoice.service';
import InvoiceDTO from '../../../../dto/invoice.dto';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [
    LoadingComponent,
    DatePipe,
    NoDataComponent,
    TransactionCardComponent,
    IconButtonComponent,
    CurrencyPipe,
    InputDateComponent,
  ],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss',
})
export class InvoiceComponent extends BaseComponent {

  today = new Date();
  isProfileLoading = false;
  creditCard?: CreditCardDTO;
  invoice?: InvoiceDTO;

  constructor(readonly changeDetector: ChangeDetectorRef,
              private readonly route: ActivatedRoute,
              readonly profileService: ProfileService,
              private readonly invoiceService: InvoiceService) {
    super(changeDetector);

    this.isProfileLoading = profileService.loading;
    effect(() => {
      const creditCardId = this.route.snapshot.paramMap.get('id');
      this.creditCard = profileService.profile()?.creditCards
        .find(c => c.id === creditCardId);
      this.invoice = this.creditCard?.invoices[0];
      this.isProfileLoading = profileService.loading;
      changeDetector.detectChanges();
    });
  }

  get transactions(): TransactionDTO[] {
    return this.invoice?.transactions ?? [];
  }

  get initialValue(): string {
    return format(this.today, 'yyyy-MM', { locale: ptBR }).toUpperCase();
  }

  calculateInvoiceTotal() {
    const reduced = this.transactions.reduce((sum, transaction) => sum + Number(transaction.amount), 0);
    return `R$${currencyMasker(reduced.toFixed(2).toString())[0]}`;
  }

  monthChanged(monthAndYear: string) {
    const [year, month] = monthAndYear.split(/-/);
    const formattedMonth = format(`${month}`, 'MMM', { locale: ptBR }).toUpperCase();

    this.subscribeAndRender(
      this.invoiceService.getInvoices(this.creditCard!.id, formattedMonth, year),
      invoice => {
        this.invoice = invoice;
      }
    )
  }
}
