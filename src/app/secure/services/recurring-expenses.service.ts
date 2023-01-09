import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RecurringExpensesService {

  constructor(private readonly httpClient: HttpClient) {
  }
}
