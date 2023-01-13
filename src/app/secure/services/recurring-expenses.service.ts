import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Transaction from '../../entities/Transaction';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class RecurringExpensesService {

  constructor(private readonly httpClient: HttpClient) {
  }

  save(transaction: Transaction): Observable<Transaction> {
    return this.httpClient.post<Transaction>(`${environment.server_host}/recurring-expenses`, transaction);
  }
}
