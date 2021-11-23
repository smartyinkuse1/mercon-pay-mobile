import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage implements OnInit {
  verifyForm: FormGroup = {} as FormGroup;
  submit = false;
  constructor(private authService: AuthService, private router: Router, private toastController: ToastController) { }

  ngOnInit() {
    this.verifyForm = new FormGroup({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      OTP: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(5)],
      })
    });
  }

  get f() {
    return this.verifyForm.controls;
  }

  onSubmit() {
    this.submit = true;
    if (this.verifyForm.invalid) {
      setTimeout(() => {
        this.submit = false;
      }, 1000);
      return;
    }
    console.log(this.verifyForm.value);
    this.authService.verifyOtp(this.verifyForm.value).subscribe(res =>{
      this.router.navigate(['/login']);
    }, err => {
      this.toastController.create({
        message: err.error.error,
        duration: 1500,
        color: 'danger'
      }).then(toast => {
        toast.present();
      });
    });
  }

}
