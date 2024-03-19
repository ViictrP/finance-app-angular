import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import RecurringExpenseDTO from '../dto/recurring-expense.dto';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecurringExpenseService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly httpClient: HttpClient) { }

  create(recurringExpense: RecurringExpenseDTO): Observable<RecurringExpenseDTO> {
    return this.httpClient.post<RecurringExpenseDTO>(`${this.apiUrl}/recurring-expenses`, recurringExpense);
  }
}
