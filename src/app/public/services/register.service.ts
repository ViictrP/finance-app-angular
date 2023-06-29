import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import UserDto from '../../dto/user.dto';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable()
export class RegisterService {
  constructor(private readonly httpClient: HttpClient) {
  }

  register(user: UserDto): Observable<UserDto> {
    return this.httpClient.post<UserDto>(`${environment.server_host}/users`, user);
  }
}
