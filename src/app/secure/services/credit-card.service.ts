import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import CreditCardDto from '../../dto/credit-card.dto';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable()
export class CreditCardService {

  constructor(private readonly httpClient: HttpClient) {
  }

  save(creditCard: CreditCardDto, shouldUpdate: boolean): Observable<CreditCardDto> {
    const url = `${environment.server_host}/credit-cards`;

    if (shouldUpdate) {
      return this.httpClient.put<CreditCardDto>(url + `/${creditCard.id}`, creditCard);
    } else {
      return this.httpClient.post<CreditCardDto>(url, creditCard);
    }
  }

  delete(creditCard: CreditCardDto): Observable<unknown> {
    return this.httpClient.delete(`${environment.server_host}/credit-cards/${creditCard.id}`);
  }
}
