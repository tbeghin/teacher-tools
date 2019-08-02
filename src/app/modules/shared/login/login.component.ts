import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from './services/authentication.service';
import {catchError, filter, tap} from 'rxjs/internal/operators';
import {merge} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public isConnexionView: boolean;
  public connexionForm: FormGroup;
  public usernameControl: FormControl;
  public passwordControl: FormControl;
  public resetForm: FormGroup;

  constructor(private router: Router, private _authenticationService: AuthenticationService) {
  }

  public ngOnInit(): void {
    this.isConnexionView = true;
    this.usernameControl = new FormControl('', Validators.required);
    this.passwordControl = new FormControl('', Validators.required);
    this.connexionForm = new FormGroup({
      username: this.usernameControl,
      password: this.passwordControl
    });
    this.resetForm = new FormGroup({
      email: new FormControl('', Validators.required)
    });

    // reset login status
    this._authenticationService.logout();
    this.watchLog();
  }

  login(): void {
    if (this.connexionForm.valid) {
      this._authenticationService.login(this.usernameControl.value, this.passwordControl.value);
    }
  }

  private watchLog() {
    const logResult$ = this._authenticationService.isLogged$;
    const isLogged$ = logResult$
      .pipe(
        filter((isLogged: boolean) => isLogged),
        tap(() => this.router.navigate(['/']))
      );
    const isNotLog$ = logResult$
      .pipe(
        filter((isLogged: boolean) => !isLogged),
        tap(() => alert('Invalid credentials'))
      );
    merge(isLogged$, isNotLog$)
      .pipe(
        catchError((err => {
          throw new Error(`error in source. Details: ${err}`);
        }))
      ).subscribe();
  }
}
