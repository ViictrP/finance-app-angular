import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import CreditCard from '../../entities/CreditCard';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class CreditCardService {

  constructor(private readonly httpClient: HttpClient,
              private readonly cookieService: CookieService) {
  }

  saveCreditCard(creditCard: CreditCard, shouldUpdate: boolean): Observable<CreditCard> {
    const accessToken = this.cookieService.get('access_token');
    const url = `${environment.server_host}/credit-cards`;
    const headers = {
      headers: {
        'x-authentication-token': accessToken
      }
    };

    if (shouldUpdate) {
      return this.httpClient.put<CreditCard>(url + `/${creditCard.id}`, creditCard, headers);
    } else {
      return this.httpClient.post<CreditCard>(url, creditCard, headers);
    }
  }
}
