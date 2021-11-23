import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup = {} as FormGroup;
  submit = false;
  constructor(private authService: AuthService, toastController: ToastController) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ],
      }),
      password: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(6)],
      })
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onLogin() {
    this.submit = true;
    if (this.loginForm.invalid) {
      setTimeout(() => {
        this.submit = false;
      }, 1000);
      return;
    }
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value);
    setTimeout(() => {
      this.submit = false;
    }, 600);
  }

}
