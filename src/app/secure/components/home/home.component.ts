import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import User from '../../../entities/User';
import {UserService} from '../../services/user.service';
import Transaction from '../../../entities/Transaction';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user?: User;
  filteredTransactions: Transaction[] = [];
  private subs = new Subscription();

  constructor(private readonly userService: UserService) {
  }

  get transactions(): Transaction[] {
    return this.user!.transactions;
  }

  ngOnInit(): void {
    this.subs.add(this.userService.currentUser.subscribe(user => {
      this.user = user;
      this.filteredTransactions = this.user?.transactions ?? [];
    }));
  }

  filterTransactions(text: string) {
    if (text) {
      this.filteredTransactions = this.transactions.filter(
        t => t.description.toLowerCase().includes(text.toLowerCase())
      );
    } else {
      this.filteredTransactions = this.transactions;
    }
  }
}
