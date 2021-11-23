import { Route } from '@angular/compiler/src/core';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';
import { confirmedValidator } from '../../login/confirm-validor';

@Component({
  selector: 'app-signup-choice',
  templateUrl: './signup-choice.component.html',
  styleUrls: ['./signup-choice.component.scss'],
})
export class SignupChoiceComponent implements OnInit {
  @Input() title;
  signupForm: FormGroup = {} as FormGroup;
  submit = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    const consumersValidators = [];
    const merchantsValidators = [];
    const merchantBvnValidators = [];
    const merchantAccountValidators = [];
    if (this.title === 'consumer') {
      consumersValidators.push(Validators.required);
    } else {
      merchantsValidators.push(Validators.required);
      merchantsValidators.push(Validators.minLength(6));
      merchantBvnValidators.push(Validators.required);
      merchantBvnValidators.push(Validators.minLength(11));
      merchantAccountValidators.push(Validators.required);
      merchantAccountValidators.push(Validators.minLength(10));
    }
    this.signupForm = new FormGroup({
      email: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ],
      }),
      firstName: new FormControl(null, {
        validators: consumersValidators,
      }),
      lastName: new FormControl(null, {
        validators: consumersValidators,
      }),
      businessName: new FormControl(null, {
        validators: merchantsValidators,
      }),
      bvn: new FormControl(null, {
        validators: merchantBvnValidators,
      }),
      accountNumber: new FormControl(null, {
        validators: merchantAccountValidators,
      }),
      role: new FormControl(
        this.title === 'merchant' ? 'merchant' : 'consumer'
      ),
      userName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(6)],
      }),
      password: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(6)],
      }),
      confirmPassword: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(6)],
      }),
    });
  }

  get f() {
    return this.signupForm.controls;
  }

  onSignup() {
    this.submit = true;
    console.log(this.signupForm.value);
    console.log(this.f);
    if (this.signupForm.invalid) {
      setTimeout(() => {
        this.submit = false;
      }, 1000);
      return;
    }
    if (
      this.signupForm.value.password !== this.signupForm.value.confirmPassword
    ) {
      this.signupForm.get('confirmPassword').setErrors({
        notEqual: true,
      });
      this.submit = false;
      return;
    }
    this.submit = false;
    this.authService.signup(this.signupForm.value).subscribe(
      (res) => {
        this.router.navigate(['/verify']);
      },
      (err) => {
        this.submit = false;
        this.toastController
          .create({
            message: err.error.error,
            duration: 1500,
            color: 'danger',
          })
          .then((toast) => {
            toast.present();
          });
      }
    );
  }
}
