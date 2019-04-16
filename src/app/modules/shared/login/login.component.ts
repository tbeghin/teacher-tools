import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public isConnexionView: boolean;
  public connexionForm: FormGroup;
  public resetForm: FormGroup;

  constructor(private router: Router) {
    this.isConnexionView = true;
    this.connexionForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    this.resetForm = new FormGroup({
      email: new FormControl('', Validators.required)
    });
  }

  login(): void {
    if (this.connexionForm.valid) {
      if (this.connexionForm.controls['username'].value === 'admin' && this.connexionForm.controls['password'].value === 'admin') {
        this.router.navigate(['/']);
      } else {
        alert('Invalid credentials');
      }
    }
  }
}
