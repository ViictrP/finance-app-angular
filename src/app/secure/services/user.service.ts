import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import UserDto from '../../dto/user.dto';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserService {

  user$ = new BehaviorSubject<UserDto>({} as UserDto);
  currentUser = this.user$.asObservable();

  constructor(private readonly httpClient: HttpClient) {
  }


  private set user(user: UserDto) {
    this.user$.next(user);
  }

  getProfile(): Observable<UserDto> {
    return this.httpClient.get<UserDto>(`${environment.server_host}/me`).pipe(
      tap(profile => {
        profile.creditCards
          .forEach(creditCard => {
            creditCard.totalInvoiceAmount = creditCard.invoices[0]?.transactions
              .reduce((sum, current) =>
                sum + Number(current.amount), 0);
          });
      }),
      tap(data => this.user = data)
    );
  }

  updateProfile(user: UserDto): Observable<UserDto> {
    return this.httpClient.put<UserDto>(`${environment.server_host}/users`, user);
  }
}
