import {Injectable} from '@angular/core';
import {filter, map, startWith, tap} from 'rxjs/internal/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from '../../../../../environments/environment';
import {HubService} from '../../../../services/hub.service';
import {UserService} from '../../../admin/services/user.service';
import {BehaviorSubject, merge, Observable, Subject} from 'rxjs';
import {IUser, User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public isLogged$: Observable<boolean>;
  public currentUser$: Observable<IUser>;

  constructor(private hub: HubService, private userService: UserService, private jwtHelper: JwtHelperService) {
    this.initService();
    this.setCurrentUser();
  }

  get isLoggedIn(): boolean {
    const token = localStorage.getItem(environment.tokenStorageName);
    return !this.jwtHelper.isTokenExpired(token);
  }

  public login(username: string, password: string): void {
    this.hub.sendMessage('authentication', {username, password});
  }

  public logout(): void {
    localStorage.removeItem(environment.tokenStorageName);
  }

  private initService(): void {
    const getToken$ = this.hub.connectionToQueue('getToken');
    const isLogged$ = getToken$
      .pipe(
        filter((token: string) => !!token),
        tap((token: string) => localStorage.setItem(environment.tokenStorageName, token)),
        tap((token: string) => this.getUserById(token)),
        map(() => true),
      );
    const isNotLogged$ = getToken$
      .pipe(
        filter((token: string) => !token),
        map(() => false),
      );
    this.isLogged$ = merge(isLogged$, isNotLogged$);
    this.currentUser$ = this.hub.connectionToQueue('user').pipe(startWith(new User()));
  }

  private setCurrentUser(): void {
    const token = localStorage.getItem(environment.tokenStorageName);
    if (!!token) {
      this.getUserById(token);
    }
  }

  private getUserById(token: string): void {
    const decodeToken = this.jwtHelper.decodeToken(token);
    const id = decodeToken.userId;
    this.hub.sendMessage('getUserById', id);
  }
}
