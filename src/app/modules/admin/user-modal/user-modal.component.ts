import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {UserService} from '../services/user.service';
import {IUser, User} from '../../shared/models/user';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {
  public userFormGroup: FormGroup;
  public emailForm: FormControl;

  constructor(
    public dialogRef: MatDialogRef<UserModalComponent>,
    private userService: UserService
  ) {
  }

  public ngOnInit(): void {
    this.emailForm = new FormControl();
    this.userFormGroup = new FormGroup({
      email: this.emailForm,
    });
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public validate(): void {
    if (this.userFormGroup.valid) {
      const user = new User();
      user.email = this.emailForm.value;
      this.userService.addUser(user);
      this.dialogRef.close();
    }
  }
}
