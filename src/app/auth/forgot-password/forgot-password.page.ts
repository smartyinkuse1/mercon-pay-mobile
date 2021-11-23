import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  forgotForm: FormGroup = {} as FormGroup;
  submit = false;
  constructor(private authService: AuthService, private router: Router, private toastController: ToastController) { }

  ngOnInit() {
    this.forgotForm = new FormGroup({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      email: new FormControl(null, {
        validators: [Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),],
      })
    });
  }

  get f() {
    return this.forgotForm.controls;
  }

  onSubmit() {
    this.submit = true;
    if (this.forgotForm.invalid) {
      setTimeout(() => {
        this.submit = false;
      }, 1000);
      return;
    }
    console.log(this.forgotForm.value);
    this.authService.forgotPassword(this.forgotForm.value).subscribe(res =>{
      this.toastController.create({
        message: 'Check your mail for a reset link',
        duration: 1500,
        color: 'success'
      }).then(toast => {
        toast.present();
      });
      this.router.navigate(['/login']);
    }, err => {
      this.toastController.create({
        message: err.error.error,
        duration: 1500,
        color: 'danger'
      }).then(toast => {
        toast.present();
      });
      this.submit = false;
    });
  }

}
