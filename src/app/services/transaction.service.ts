import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import TransactionDTO from '../dto/transaction.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private readonly apiUrl = environment.API_URL;

  constructor(private readonly httpClient: HttpClient) { }

  create(transaction: TransactionDTO): Observable<TransactionDTO> {
    return this.httpClient.post<TransactionDTO>(`${this.apiUrl}/v1/transactions`, transaction);
  }

  delete(transactionId: number, deleteAll: boolean): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/v1/transactions/${transactionId}?all=${deleteAll}`);
  }
}
