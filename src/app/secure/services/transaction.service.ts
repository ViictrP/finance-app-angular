import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import TransactionDto from '../../dto/transaction.dto';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable()
export default class TransactionService {

  constructor(private readonly httpClient: HttpClient) {
  }

  save(transaction: TransactionDto): Observable<TransactionDto> {
    return this.httpClient.post<TransactionDto>(`${environment.server_host}/transactions`, transaction);
  }

  delete(transactionId: string, all: boolean): Observable<void> {
    return this.httpClient.delete<void>(`${environment.server_host}/transactions/${transactionId}?all=${all}`);
  }
}
