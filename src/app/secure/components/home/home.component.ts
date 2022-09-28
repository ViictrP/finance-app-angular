import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import User from '../../../entities/User';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user?: User;
  private subs = new Subscription();

  constructor(private readonly userService: UserService) {
  }

  ngOnInit(): void {
    this.subs.add(this.userService.currentUser.subscribe(user => {
      this.user = user;
    }));
  }

}
