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
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly httpClient: HttpClient) {
  }

  createCreditCard(creditCard: CreditCardDTO): Observable<CreditCardDTO> {
    return this.httpClient.post<CreditCardDTO>(`${this.apiUrl}/credit-cards`, creditCard);
  }
}
