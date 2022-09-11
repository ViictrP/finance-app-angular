import {Component} from '@angular/core';
import {LoginService} from '../../../public/services/login.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import User from '../../../entities/User';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  user$?: Observable<User>;

  constructor(private readonly loginService: LoginService,
              private readonly userService: UserService,
              private readonly router: Router) {
  }

  ngOnInit(): void {
    this.user$ = this.userService.getProfile();
  }

  logOut() {
    this.loginService.logOut();
    this.router.navigate(['/login']);
  }
}
