import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import User from '../../entities/User';
import {environment} from '../../../environments/environment';

@Injectable()
export class UserService {

  user$ = new BehaviorSubject<User>({} as User);
  currentUser = this.user$.asObservable();

  constructor(private readonly httpClient: HttpClient) {
  }


  private set user(user: User) {
    this.user$.next(user);
  }

  getProfile(): Observable<User> {
    return this.httpClient.get<User>(`${environment.server_host}/me`).pipe(
      tap(data => this.user = data)
    );
  }
}
