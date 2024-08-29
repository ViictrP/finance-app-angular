import { Injectable, signal } from '@angular/core';
import {
    GoogleAuthProvider,
    Auth,
    signInWithPopup,
    signOut,
} from '@angular/fire/auth';
import UserDTO from '../dto/user.dto';
import { CookieService } from 'ngx-cookie-service';
import { ACCESS_TOKEN, USER_INFO } from '../constants/keys';

interface AuthUser {
    accessToken: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    _user = signal<UserDTO | null>(null);

    constructor(
        private readonly auth: Auth,
        private readonly cookieService: CookieService
    ) {}

    get user(): UserDTO {
        let user = this._user();
        if (!user) {
            user = JSON.parse(this.cookieService.get(USER_INFO));
            this._user.set(user);
        }
        return user!;
    }

    isAuthenticated(): boolean {
        return this.cookieService.check(ACCESS_TOKEN);
    }

    isTokenNotExpired(): boolean {
        const accessToken = this.cookieService.get(ACCESS_TOKEN);
        if (!accessToken) {
            return false;
        }

        const decoded = this.decodeToken(accessToken);

        if (!decoded.exp) {
            return false;
        }

        const expiryTime = decoded.exp * 1000;
        return Date.now() <= expiryTime;
    }

    private decodeToken(accessToken: string): { exp: number } {
        const payload = accessToken.split('.')[1];
        const decodedPayload = atob(payload);
        return JSON.parse(decodedPayload);
    }

    async signIn(): Promise<boolean> {
        try {
            const credentials = await signInWithPopup(
                this.auth,
                new GoogleAuthProvider()
            );
            const { user } = credentials;
            this.cookieService.set(
                ACCESS_TOKEN,
                (credentials.user as unknown as AuthUser).accessToken
            );
            const userInfo = {
                name: user.displayName as string,
                email: user.email as string,
                profilePictureUrl: user.photoURL as string,
            };
            this._user.set(userInfo);
            this.cookieService.set(
                USER_INFO,
                JSON.stringify(userInfo) as string
            );
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async logout(): Promise<boolean> {
        try {
            this.cookieService.delete(ACCESS_TOKEN);
            await signOut(this.auth);
            return true;
        } catch (err) {
            return false;
        }
    }
}
