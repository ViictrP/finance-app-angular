import {Component} from '@angular/core';
import {LoginService} from '../../public/services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-secured',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent {

  constructor(private readonly loginService: LoginService,
              private readonly router: Router) {
  }

  logOut() {
    this.loginService.logOut();
    this.router.navigate(['/login']);
  }
}
