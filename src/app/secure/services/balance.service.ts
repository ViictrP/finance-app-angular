import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Balance} from '../../entities/Balance';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor(private readonly httpClient: HttpClient) { }

  getBalance(month: string, year: number): Observable<Balance> {
    return this.httpClient.get<Balance>(`${environment.server_host}/balances?month=${month}&year=${year}`);
  }
}

