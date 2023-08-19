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
import { BaseComponent } from '../../../lib/components/BaseComponent';
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
  selectedTransaction?: TransactionDto;
  chartOptions: Partial<ChartOptions> = {};
  @ViewChild('chart') chart?: ChartComponent;
  categoryFilter = false;

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
      this.renderChart();
    });
  }

  private renderChart() {
    const map: Map<string, number> = new Map();
    const categoryMap: Map<string, string> = new Map([
      ['other', 'Outro'],
      ['food', 'Restaurante'],
      ['home', 'Casa'],
      ['credit-card', 'Cartão'],
      ['shop', 'Shop'],
    ]);
    this.transactions.forEach(t => {
      const category = map.get(t.category);
      const amount = Number(t.amount);
      if (!!category) {
        map.set(t.category, category + amount);
      } else {
        map.set(t.category, amount);
      }
    });
    const series = Array.from(map.values()).map(value => Number(value.toFixed(2)));
    const labels = Array.from(map.keys()).map(k => categoryMap.get(k.toLowerCase()));
    this.chartOptions = {
      series,
      chart: {
        type: 'donut',
        events: {
          dataPointSelection: (e: any, chart?: any, options?: any) => {
            const label = labels[options.selectedDataPoints[0][0]];
            const category = Array.from(categoryMap.entries()).find(v => v[1] === label);
            this.filterTransactionsByCategory(!!category ? category![0] : undefined);
          }
        }
      },
      labels,
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

  filterTransactionsByCategory(category?: string) {
    if (category) {
      this.categoryFilter = true;
      this.transactions = this.userTransactions.filter(
        t => t.category.toLowerCase().includes(category.toLowerCase())
      );
    } else {
      this.transactions = this.userTransactions ?? [];
    }
    this.detectChanges();
  }

  getMonthInvoice(value: Date) {
    const year = value.getFullYear();
    const m = format(value, 'MMM', { locale: pt }).toUpperCase();
    this.subscribeAndRender(
      this.service.get(this.creditCard!.id, m, year),
      (invoice) => {
        this.transactions = invoice?.transactions ?? [];
        this.renderChart();
        this.invoice = invoice;
        this.invoiceTotalAmount = this.transactions?.reduce((sum, transaction) => sum + Number(transaction.amount), 0) ?? 0;
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
