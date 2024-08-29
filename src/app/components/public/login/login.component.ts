import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [NgOptimizedImage],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    constructor(
        private readonly authService: AuthService,
        private readonly router: Router
    ) {}

    async signIn() {
        this.authService.signIn().then((loggedIn) => {
            if (loggedIn) {
                this.router.navigate(['secure/home']);
            } else {
                console.log('authentication error ');
            }
        });
    }
}
