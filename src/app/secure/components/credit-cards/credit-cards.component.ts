import {Component, OnInit} from '@angular/core';
import User from '../../../entities/User';
import {Subscription} from 'rxjs';
import {UserService} from '../../services/user.service';
import CreditCard from '../../../entities/CreditCard';

@Component({
  selector: 'app-credit-cards',
  templateUrl: './credit-cards.component.html',
  styleUrls: ['./credit-cards.component.scss']
})
export class CreditCardsComponent implements OnInit {

  user?: User;
  selectedCreditCard?: CreditCard;
  private subs = new Subscription();


  constructor(private readonly userService: UserService) {
  }


  ngOnInit(): void {
    this.subs.add(this.userService.currentUser.subscribe(user => {
      this.user = user;
    }));
  }

  selectCreditCard(elementId: string) {
    if (elementId) {
      this.selectedCreditCard = this.user?.creditCards.find(c => c.id === elementId);
    }
  }
}
