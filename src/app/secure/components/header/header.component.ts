import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../../public/services/login.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import UserDto from '../../../dto/user.dto';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user$?: Observable<UserDto>;

  constructor(private readonly loginService: LoginService,
              private readonly userService: UserService,
              private readonly router: Router) {
  }

  ngOnInit(): void {
    this.user$ = this.userService.getProfile();
  }

  editProfile() {
    this.router.navigate(['/secure/profile']);
  }

  logOut() {
    this.loginService.logOut();
    this.router.navigate(['/public/login']);
  }
}
