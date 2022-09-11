import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import User from '../../../entities/User';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user$?: Observable<User>;

  constructor(private readonly userService: UserService) {

  }

  ngOnInit(): void {
    this.user$ = this.userService.currentUser;
  }

}
