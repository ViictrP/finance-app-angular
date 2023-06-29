import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import InvoiceDto from '../../dto/invoice.dto';

@Injectable()
export class InvoiceService {

  constructor(private readonly httpClient: HttpClient) {
  }

  get(creditCardId: string, month: string, year: number): Observable<InvoiceDto> {
    return this.httpClient.get<InvoiceDto>(`${environment.server_host}/credit-cards/${creditCardId}/invoices?month=${month}&year=${year}`);
  }
}
