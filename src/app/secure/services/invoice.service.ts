import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../../environments/environment';
import Invoice from '../../entities/Invoice';

@Injectable()
export class InvoiceService {

  constructor(private readonly httpClient: HttpClient,
              private readonly cookieService: CookieService) {
  }

  getInvoice(creditCardId: string, month: string, year: number): Observable<Invoice> {
    const accessToken = this.cookieService.get('access_token');
    return this.httpClient.get<Invoice>(`${environment.server_host}/credit-cards/${creditCardId}/invoices?month=${month}&year=${year}`, {
      headers: {
        'x-authentication-token': accessToken
      }
    });
  }
}
