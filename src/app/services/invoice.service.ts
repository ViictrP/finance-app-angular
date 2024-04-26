import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import InvoiceDTO from '../dto/invoice.dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private readonly apiUrl = environment.API_URL;

  constructor(private readonly httpClient: HttpClient) { }

  getInvoices(creditCardId: number, month: string, year: string | number): Observable<InvoiceDTO[]> {
    return this.httpClient.get<InvoiceDTO[]>(`${this.apiUrl}/v1/credit-cards/${creditCardId}/invoices?month=${month}&year=${year}`);
  }
}
