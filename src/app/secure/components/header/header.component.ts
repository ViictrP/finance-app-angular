import {Component} from '@angular/core';
import {LoginService} from '../../../public/services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private readonly loginService: LoginService,
              private readonly router: Router) {
  }

  ngOnInit(): void {
  }

  logOut() {
    this.loginService.logOut();
    this.router.navigate(['/login']);
  }
}
