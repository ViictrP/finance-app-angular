import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import CreditCardDTO from '../dto/credit-card.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export default class CreditCardService {

  loading = false;
  private readonly apiUrl = environment.API_URL;

  constructor(private readonly httpClient: HttpClient) {
  }

  create(creditCard: CreditCardDTO): Observable<CreditCardDTO> {
    return this.httpClient.post<CreditCardDTO>(`${this.apiUrl}/v1/credit-cards`, creditCard);
  }

  update(creditCard: CreditCardDTO): Observable<CreditCardDTO> {
    return this.httpClient.put<CreditCardDTO>(`${this.apiUrl}/v1/credit-cards/${creditCard.id}`, creditCard);
  }

  deleteCreditCard(creditCardId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/v1/credit-cards/${creditCardId}`);
  }
}
