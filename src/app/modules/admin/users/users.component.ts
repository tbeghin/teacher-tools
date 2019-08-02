import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../services/user.service';
import {UsersDataSource} from './usersDataSource';
import {MatDialog, MatSort} from '@angular/material';
import {UserModalComponent} from '../user-modal/user-modal.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  public dataSource: UsersDataSource;
  public displayedColumns: Array<string>;

  constructor(
    public dialog: MatDialog,
    private userService: UserService
  ) {
  }

  public ngOnInit(): void {
    this.displayedColumns = ['email', 'firstName', 'lastName', 'username', 'action'];
    this.dataSource = new UsersDataSource(this.userService);
    this.loadUsers();
  }

  public addUser() {
    this.openModal();
  }

  public edit() {

  }

  public delete() {

  }

  private openModal() {
    this.dialog.open(UserModalComponent, {
      width: '500px'
    });
  }

  private loadUsers(): void {
    this.dataSource.loadUsers(this.sort.direction, this.sort.active);
  }
}
