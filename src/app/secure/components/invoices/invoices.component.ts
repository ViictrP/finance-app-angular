import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import CreditCardDto from '../../../dto/credit-card.dto';
import UserDto from '../../../dto/user.dto';
import TransactionDto from '../../../dto/transaction.dto';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { InvoiceService } from '../../services/invoice.service';
import InvoiceDto from '../../../dto/invoice.dto';
import { BaseComponent } from '../BaseComponent';
import TransactionService from '../../services/transaction.service';
import { ModalComponent } from '../../../lib/components/modal/modal.component';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ChartComponent,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  colors: string[];
};

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicesComponent extends BaseComponent implements OnInit {
  @ViewChild('deleteTransactionModal') deleteTransactionModal: ModalComponent | undefined;
  id: string | null;
  user?: UserDto;
  creditCard?: CreditCardDto;
  invoice?: InvoiceDto;
  transactions: TransactionDto[] = [];
  invoiceTotalAmount = 0;
  today = new Date();
  loading = false;
  selectedTransaction?: TransactionDto;
  chartOptions: Partial<ChartOptions> = {};
  @ViewChild('chart') chart?: ChartComponent;
  categoryMap: Map<string, string> = new Map([
    ['other', 'Outro'],
    ['food', 'Restaurante'],
    ['home', 'Casa'],
    ['credit-card', 'Cartão'],
    ['shop', 'Shop'],
  ]);

  constructor(private readonly route: ActivatedRoute,
              private readonly userService: UserService,
              private readonly service: InvoiceService,
              private readonly transactionService: TransactionService,
              changeDetector: ChangeDetectorRef) {
    super(changeDetector);
    this.id = route.snapshot.paramMap.get('id');
  }

  get userTransactions() {
    if (this.creditCard?.invoices.length) {
      return this.creditCard?.invoices[0]?.transactions;
    }
    return [];
  }

  set selectedUser(user: UserDto) {
    this.user = user;
    this.creditCard = user?.creditCards?.find(c => c.id === this.id);
    this.invoice = this.creditCard?.invoices[0];
    this.transactions = this.userTransactions;
    this.invoiceTotalAmount = this.transactions?.reduce((sum, transaction) => sum + Number(transaction.amount), 0) ?? 0;
  }

  ngOnInit(): void {

    this.subscribeAndRender(this.userService.currentUser, (user) => {
      this.selectedUser = user;
      this.rerenderChart();
    });
  }

  private rerenderChart() {
    const map: Map<string, number> = new Map();
    this.transactions.forEach(t => {
      const category = map.get(t.category);
      const amount = Number(t.amount);
      if (!!category) {
        map.set(t.category, category + amount);
      } else {
        map.set(t.category, amount);
      }
    });
    this.chartOptions = {
      series: Array.from(map.values()).map(value => Number(value.toFixed(2))),
      chart: {
        type: 'donut',
      },
      labels: Array.from(map.keys()).map(k => this.categoryMap.get(k.toLowerCase())),
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }

  filterTransactions(text: string) {
    if (text) {
      this.transactions = this.userTransactions.filter(
        t => t.description.toLowerCase().includes(text.toLowerCase()),
      );
    } else {
      this.transactions = this.userTransactions ?? [];
    }
  }

  getMonthInvoice(value: Date) {
    this.loading = true;
    const year = value.getFullYear();
    const m = format(value, 'MMM', { locale: pt }).toUpperCase();
    this.subscribeAndRender(
      this.service.get(this.creditCard!.id, m, year),
      (invoice) => {
        this.transactions = invoice?.transactions ?? [];
        this.rerenderChart();
        this.invoice = invoice;
        this.invoiceTotalAmount = this.transactions?.reduce((sum, transaction) => sum + Number(transaction.amount), 0) ?? 0;
        this.loading = false;
      });
  }

  editTransaction(transaction: TransactionDto) {
    this.selectedTransaction = transaction;
    this.deleteTransactionModal?.show();
  }

  deleteTransaction(all = false) {
    if (this.selectedTransaction) {
      this.subscribeAndRender(
        this.transactionService.delete(this.selectedTransaction.id!, all),
        () => {
          const transactions = this.creditCard!
            .invoices[0]
            .transactions;

          transactions.splice(transactions.findIndex(t => t.id === this.selectedTransaction!.id!), 1);
          this.deleteTransactionModal?.close();
        },
      );
    }
  }
}
