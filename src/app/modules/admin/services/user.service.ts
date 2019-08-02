import {Injectable} from '@angular/core';
import {HubService} from '../../../services/hub.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {startWith, tap} from 'rxjs/internal/operators';
import {IUser, User} from '../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public users: BehaviorSubject<Array<IUser>>;

  constructor(private hub: HubService) {
    this.initService();
  }

  public addUser(newUser: IUser) {
    this.hub.sendMessage('addUser', newUser);
  }

  private initService(): void {
    this.users = new BehaviorSubject([]);
    this.hub.sendMessage('getUsers');
    this.hub.connectionToQueue('userList').subscribe(
      (users: Array<IUser>) => {
        this.users.next(users);
      }
    );
  }
}
