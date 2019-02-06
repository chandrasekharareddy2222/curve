import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/api/authenticate`, { username: username, password: password })
      .pipe(map(token => {
        // login successful if there's a jwt token in the response
        if (token && token.id_token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('token_jwt', JSON.stringify(token));
        }

        return token;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user_context');
    localStorage.removeItem('token_jwt');
  }

  setUserContext() {
    return this.http.get<any> (`${environment.apiUrl}/api/user-context`);
  }

  getUserContext() {
    const userContext = localStorage.getItem('user_context');
    if (userContext) {
      return JSON.parse(userContext);
    } else {
      this.logout();
    }
  }
}
