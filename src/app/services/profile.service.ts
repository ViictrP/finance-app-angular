import { Injectable, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import ProfileDTO from '../dto/profile.dto';
import { environment } from '../../environments/environment';
import CreditCardDTO from '../dto/credit-card.dto';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private readonly apiUrl = environment.apiUrl;
  _profile = signal<ProfileDTO | null>(null);

  constructor(private readonly httpClient: HttpClient) {
  }

  getProfile(): Observable<ProfileDTO> {
    return this.httpClient.get<ProfileDTO>(`${this.apiUrl}/me`)
      .pipe(
        tap(profile => {
          this.calculateCreditCardsTotalInvoiceAmount(profile.creditCards);
          this.profile = profile;
        }),
      );
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

  private set profile(profile: ProfileDTO) {
    console.log(profile);
    this._profile.set(profile)
  }

  get profile(): Signal<ProfileDTO | null> {
    return this._profile;
  }
}