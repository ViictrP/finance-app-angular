import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import BalanceDTO from '../dto/balance.dto';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly httpClient: HttpClient) { }

  getBalance(month: string, year: string | number): Observable<BalanceDTO> {
    return this.httpClient.get<BalanceDTO>(`${this.apiUrl}/v1/users/balance?month=${month}&year=${year}`);
  }
}
