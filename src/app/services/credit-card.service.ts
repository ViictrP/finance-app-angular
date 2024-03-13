import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import CreditCardDTO from '../dto/credit-card.dto';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export default class CreditCardService {

  loading = false;
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly httpClient: HttpClient) {
  }

  create(creditCard: CreditCardDTO): Observable<CreditCardDTO> {
    return this.httpClient.post<CreditCardDTO>(`${this.apiUrl}/credit-cards`, creditCard);
  }

  update(creditCard: CreditCardDTO): Observable<CreditCardDTO> {
    return this.httpClient.put<CreditCardDTO>(`${this.apiUrl}/credit-cards/${creditCard.id}`, creditCard);
  }

  deleteCreditCard(creditCardId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/credit-cards/${creditCardId}`);
  }
}
