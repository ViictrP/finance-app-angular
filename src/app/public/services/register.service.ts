import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import User from '../../entities/User';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable()
export class RegisterService {
  constructor(private readonly httpClient: HttpClient) {
  }

  register(user: User): Observable<User> {
    return this.httpClient.post<User>(`${environment.server_host}/users`, user);
  }
}
