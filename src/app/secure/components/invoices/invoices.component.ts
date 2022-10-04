import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user.service';
import CreditCard from '../../../entities/CreditCard';
import {Subscription} from 'rxjs';
import User from '../../../entities/User';
import Transaction from '../../../entities/Transaction';
import {format} from 'date-fns';
import pt from 'date-fns/locale/pt';
import {InvoiceService} from '../../services/invoice.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit, OnDestroy {

  id: string | null;
  user?: User;
  creditCard?: CreditCard;
  transactions: Transaction[] = [];
  subscription = new Subscription();
  invoiceTotalAmount = 0;
  today = new Date();

  constructor(private readonly route: ActivatedRoute,
              private readonly userService: UserService,
              private readonly service: InvoiceService) {
    this.id = route.snapshot.paramMap.get('id');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get userTransactions() {
    if (this.creditCard?.invoices.length) {
      return this.creditCard?.invoices[0]?.transactions;
    }
    return [];
  }

  get invoice() {
    return this.creditCard?.invoices[0];
  }

  set selectedUser(user: User) {
    this.user = user;
    this.creditCard = user?.creditCards?.find(c => c.id === this.id);
    this.transactions = this.userTransactions;
    this.invoiceTotalAmount = this.transactions?.reduce((sum, transaction) => sum + Number(transaction.amount), 0) ?? 0;
  }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(user => {
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
    const [year, month] = event.currentTarget.value.split(/-/);
    const date = new Date(year, month - 1, 1);
    const m = format(date, 'MMM', {locale: pt}).toUpperCase();
    this.subscription.add(
      this.service.getInvoice(this.creditCard!.id, m, year)
        .subscribe(invoice => {
          this.transactions = invoice?.transactions ?? [];
          this.invoiceTotalAmount = this.transactions?.reduce((sum, transaction) => sum + Number(transaction.amount), 0) ?? 0;
        })
    );
  }
}
