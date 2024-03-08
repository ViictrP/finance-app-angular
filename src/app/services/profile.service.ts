import { inject, Injectable, Signal, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import ProfileDTO from '../dto/profile.dto';
import { environment } from '../../environments/environment';
import CreditCardDTO from '../dto/credit-card.dto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private readonly apiUrl = environment.apiUrl;
  _profile = signal<ProfileDTO | null>(null);
  router = inject(Router);

  constructor(private readonly httpClient: HttpClient) {
  }

  getProfile(): Observable<ProfileDTO> {
    return this.httpClient.get<ProfileDTO>(`${this.apiUrl}/me`)
      .pipe(
        tap(profile => {
          this.calculateCreditCardsTotalInvoiceAmount(profile.creditCards);
          this.profile = profile;
        }),
        catchError(this.handleError())
      );
  }

  private handleError() {
    return (err: unknown) => {
      if (err instanceof HttpErrorResponse) {
        if(err.status === 404) {
          this.router.navigate(['secure/create-profile']);
        } else if (err.status === 401) {
          this.router.navigate(['login']);
        }
      }
      return of();
    }
  }

  private calculateCreditCardsTotalInvoiceAmount(creditCards: CreditCardDTO[]): void {
    creditCards
      .forEach(creditCard => {
        const invoice = creditCard.invoices[0];
        if (invoice) {
          creditCard.totalInvoiceAmount = creditCard.invoices[0].transactions
            .reduce((sum, current) =>
              sum + Number(current.amount), 0);
        }
      });
  }

  createProfile(profile: ProfileDTO) {
    return this.httpClient.post<ProfileDTO>(`${this.apiUrl}/users`, profile)
      .pipe(tap(newProfile => {
        this.calculateCreditCardsTotalInvoiceAmount(newProfile.creditCards);
        this.profile = newProfile;
      }));
  }

  private set profile(profile: ProfileDTO) {
    this._profile.set(profile)
  }

  get profile(): Signal<ProfileDTO | null> {
    return this._profile;
  }
}
