import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import TransactionDto from '../../dto/transaction.dto';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class RecurringExpensesService {

  constructor(private readonly httpClient: HttpClient) {
  }

  save(transaction: TransactionDto): Observable<TransactionDto> {
    return this.httpClient.post<TransactionDto>(`${environment.server_host}/recurring-expenses`, transaction);
  }

  delete(transaction: TransactionDto): Observable<unknown> {
    return this.httpClient.delete(`${environment.server_host}/recurring-expenses/${transaction.id}`);
  }
}
