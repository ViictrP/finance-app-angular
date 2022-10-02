import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user.service';
import CreditCard from '../../../entities/CreditCard';
import {Subscription} from 'rxjs';
import User from '../../../entities/User';
import Transaction from '../../../entities/Transaction';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit, OnDestroy {

  id: string | null;
  user?: User;
  selectedCreditCard?: CreditCard;
  transactions: Transaction[] = [];
  subscription = new Subscription();
  invoiceTotalAmount = 0;
  today = new Date();

  constructor(private readonly route: ActivatedRoute,
              private readonly userService: UserService) {
    this.id = route.snapshot.paramMap.get('id');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get userTransactions() {
    if (this.selectedCreditCard?.invoices.length) {
      return this.selectedCreditCard?.invoices[0]?.transactions;
    }
    return [];
  }

  get invoice() {
    return this.selectedCreditCard?.invoices[0];
  }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(user => {
      this.user = user;
      this.selectedCreditCard = user?.creditCards?.find(c => c.id === this.id);
      this.transactions = this.userTransactions;
      this.invoiceTotalAmount = this.transactions?.reduce((sum, transaction) => sum + Number(transaction.amount), 0) ?? 0;
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
    console.log(event.currentTarget.value);
  }
}
