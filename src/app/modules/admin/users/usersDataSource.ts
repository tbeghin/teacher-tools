import {DataSource} from '@angular/cdk/table';
import {CollectionViewer} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {SortDirection} from '@angular/material';
import {catchError, map, tap} from 'rxjs/operators';
import {IUser} from '../../shared/models/user';
import {UserService} from '../services/user.service';

export class UsersDataSource implements DataSource<IUser> {
  private _userSubject: BehaviorSubject<Array<IUser>>;
  private _loadingSubject: BehaviorSubject<boolean>;
  public loading$: Observable<boolean>;

  constructor(private _userService: UserService) {
    this._userSubject = new BehaviorSubject<Array<IUser>>([]);
    this._loadingSubject = new BehaviorSubject<boolean>(false);
    this.loading$ = this._loadingSubject.asObservable();
  }

  public connect(collectionViewer: CollectionViewer): Observable<Array<IUser>> {
    return this._userSubject.asObservable();
  }

  public disconnect(collectionViewer: CollectionViewer): void {
    this._userSubject.complete();
    this._loadingSubject.complete();
  }

  public loadUsers(sortDirection: SortDirection, sortName: string = ''): void {
    this._loadingSubject.next(true);

    this._userService.users
      .pipe(
        catchError(() => of([])),
        tap(() => this._loadingSubject.next(false)),
        map((users: Array<IUser>) => {
            switch (sortDirection) {
              case 'asc':
                users.sort((a, b) =>
                  this.sortingDataAccess(a, sortName) < this.sortingDataAccess(b, sortName)
                    ? -1 : this.sortingDataAccess(a, sortName) > this.sortingDataAccess(b, sortName)
                    ? 1 : 0);
                break;
              case 'desc':
                users.sort((a, b) =>
                  this.sortingDataAccess(a, sortName) < this.sortingDataAccess(b, sortName)
                    ? -1 : this.sortingDataAccess(a, sortName) > this.sortingDataAccess(b, sortName)
                    ? 1 : 0).reverse();
                break;
            }
            return users;
          }
        )
      ).subscribe(
      (users: Array<IUser>) => {
        this._userSubject.next(users);
      }
    );
  }

  private sortingDataAccess(item: IUser, property: string): string {
    const split: Array<string> = property.split('.');
    let result: any = item;
    split.forEach((prop: string) => {
      result = result[prop];
    });
    if (typeof result === 'string') {
      return result.toLowerCase();
    }
    return '';
  }
}
