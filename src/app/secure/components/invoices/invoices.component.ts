import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user.service';
import CreditCard from '../../../entities/CreditCard';
import User from '../../../entities/User';
import Transaction from '../../../entities/Transaction';
import {format} from 'date-fns';
import pt from 'date-fns/locale/pt';
import {InvoiceService} from '../../services/invoice.service';
import Invoice from '../../../entities/Invoice';
import {BaseComponent} from '../BaseComponent';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoicesComponent extends BaseComponent implements OnInit {

  id: string | null;
  user?: User;
  creditCard?: CreditCard;
  invoice?: Invoice;
  transactions: Transaction[] = [];
  invoiceTotalAmount = 0;
  today = new Date();
  loading = false;

  constructor(private readonly route: ActivatedRoute,
              private readonly userService: UserService,
              private readonly service: InvoiceService,
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

  set selectedUser(user: User) {
    this.user = user;
    this.creditCard = user?.creditCards?.find(c => c.id === this.id);
    this.invoice = this.creditCard?.invoices[0];
    this.transactions = this.userTransactions;
    this.invoiceTotalAmount = this.transactions?.reduce((sum, transaction) => sum + Number(transaction.amount), 0) ?? 0;
  }

  ngOnInit(): void {
    this.subscribeAndRender(this.userService.currentUser, (user) => {
      this.selectedUser = user;
    });
  }

  filterTransactions(text: string) {
    if (text) {
      this.transactions = this.userTransactions.filter(
        t => t.description.toLowerCase().includes(text.toLowerCase())
      );
    } else {
      this.transactions = this.userTransactions ?? [];
    }
  }

  getMonthInvoice(event: any) {
    this.loading = true;
    const [year, month] = event.currentTarget.value.split(/-/);
    const date = new Date(year, month - 1, 1);
    const m = format(date, 'MMM', {locale: pt}).toUpperCase();
    this.subscribeAndRender(
      this.service.getInvoice(this.creditCard!.id, m, year),
      (invoice) => {
        this.transactions = invoice?.transactions ?? [];
        this.invoice = invoice;
        this.invoiceTotalAmount = this.transactions?.reduce((sum, transaction) => sum + Number(transaction.amount), 0) ?? 0;
        this.loading = false;
      });
  }
}
