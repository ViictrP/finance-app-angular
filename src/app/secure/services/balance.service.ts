import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BalanceDto} from '../../dto/balance.dto';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor(private readonly httpClient: HttpClient) { }

  getBalance(month: string, year: number): Observable<BalanceDto> {
    return this.httpClient.get<BalanceDto>(`${environment.server_host}/balances?month=${month}&year=${year}`);
  }
}

