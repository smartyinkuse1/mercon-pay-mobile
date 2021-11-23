import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.page.html',
  styleUrls: ['./deposit.page.scss'],
})
export class DepositPage implements OnInit {
  depositForm: FormGroup = {} as FormGroup;
  submit = false;
  constructor(
    private userService: UserService,
    private router: Router,
    private toastController: ToastController,
    ) { }

  ngOnInit() {
    this.depositForm = new FormGroup({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      amount: new FormControl(null, {
        validators: [Validators.required, Validators.min(3)],
      }),
      transType: new FormControl('fund')
    });
  }

  ionViewWillEnter() {
    localStorage.removeItem('url');
  }

  get f() {
    return this.depositForm.controls;
  }

  onSubmit() {
    this.submit = true;
    if (this.depositForm.invalid) {
      setTimeout(() => {
        this.submit = false;
      }, 1000);
      return;
    }
    console.log(this.depositForm.value);
    this.userService.depositFund(this.depositForm.value).subscribe((res: any) =>{
      console.log(res.data.authorization_url);
      this.submit = false;
      localStorage.setItem('url', res.data.data.authorization_url);
      this.router.navigateByUrl('/consumer/approve');
    }, err => {
      this.submit = false;
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
