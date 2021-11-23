import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.page.html',
  styleUrls: ['./withdraw.page.scss'],
})
export class WithdrawPage implements OnInit {
  withdrawForm: FormGroup = {} as FormGroup;
  submit = false;
  constructor(private userService: UserService, private router: Router, private toastController: ToastController) {
    this.withdrawForm = new FormGroup({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      amount: new FormControl(null, {
        validators: [Validators.required, Validators.min(3)],
      }),
      transType: new FormControl('withdraw')
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {

  }

  get f() {
    return this.withdrawForm.controls;
  }

  onSubmit() {
    this.submit = true;
    if (this.withdrawForm.invalid) {
      setTimeout(() => {
        this.submit = false;
      }, 1000);
      return;
    }
    console.log(this.withdrawForm.value);
    this.userService.withdraw(this.withdrawForm.value).subscribe(res =>{
      this.toastController.create({
        message: 'Your withdrawal is being processed',
        duration: 1500,
        color: 'success'
      }).then(toast => {
        toast.present();
      });
      this.router.navigate(['/merchant']);
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
