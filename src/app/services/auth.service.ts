import {inject, Injectable, signal} from '@angular/core';
import {GoogleAuthProvider, Auth, signInWithPopup, signOut} from '@angular/fire/auth';
import UserDTO from "../dto/user.dto";
import {CookieService} from "ngx-cookie-service";

const ACCESS_TOKEN = 'accessToken';
const USER_INFO = 'userInfo';

interface AuthUser {
  accessToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly cookieService: CookieService;
  _user = signal<UserDTO | null>(null);

  constructor(private readonly auth: Auth) {
    this.cookieService = inject(CookieService);
  }

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

  async signIn(): Promise<boolean> {
    try {
      const credentials = await signInWithPopup(this.auth, new GoogleAuthProvider());
      const { user } = credentials;
      this.cookieService.set(ACCESS_TOKEN, (credentials.user as unknown as AuthUser).accessToken as string);
      const userInfo = {
        name: user.displayName as string,
        email: user.email as string,
        profilePictureUrl: user.photoURL as string
      };
      this._user.set(userInfo);
      this.cookieService.set(USER_INFO, JSON.stringify(userInfo) as string);
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