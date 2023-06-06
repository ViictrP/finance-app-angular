import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import CreditCard from '../../entities/CreditCard';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable()
export class CreditCardService {

  constructor(private readonly httpClient: HttpClient) {
  }

  save(creditCard: CreditCard, shouldUpdate: boolean): Observable<CreditCard> {
    const url = `${environment.server_host}/credit-cards`;

    if (shouldUpdate) {
      return this.httpClient.put<CreditCard>(url + `/${creditCard.id}`, creditCard);
    } else {
      return this.httpClient.post<CreditCard>(url, creditCard);
    }
  }

  delete(creditCard: CreditCard): Observable<unknown> {
    return this.httpClient.delete(`${environment.server_host}/credit-cards/${creditCard.id}`);
  }
}
