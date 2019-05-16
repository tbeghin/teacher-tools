import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/internal/operators';
import {Observable} from 'rxjs';
import {SharedString} from '../models/constants/sharedString';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(`/authenticate`, {username, password})
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem(SharedString.tokenStorageName, JSON.stringify(user));
        }

        return user;
      }));
  }

  logout(): boolean {
    localStorage.removeItem(SharedString.tokenStorageName);
    return !this.isLoggedIn;
  }

  get isLoggedIn(): boolean {
    return this.jwtHelper.isTokenExpired();
  }
}
