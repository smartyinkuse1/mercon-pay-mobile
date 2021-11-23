import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-verify-payment',
  templateUrl: './verify-payment.page.html',
  styleUrls: ['./verify-payment.page.scss'],
})
export class VerifyPaymentPage implements OnInit {
  transferForm: FormGroup = {} as FormGroup;
  submit = false;
  amount;
  reciepientId;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private toastController: ToastController
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (paramMap.has('id')) {
        this.amount = paramMap.get('amount');
        this.reciepientId = paramMap.get('id');
        this.transferForm = new FormGroup({
          // eslint-disable-next-line @typescript-eslint/naming-convention
          otp: new FormControl(null, {
            validators: [Validators.required, Validators.minLength(5)],
          }),
          reciepientId: new FormControl(this.reciepientId),
          amount: new FormControl(+this.amount)
        });
      }
    });
  }

  ionViewWillEnter() {

  }

  get f() {
    return this.transferForm.controls;
  }

  onSubmit() {
    this.submit = true;
    if (this.transferForm.invalid) {
      setTimeout(() => {
        this.submit = false;
      }, 1000);
      return;
    }
    console.log(this.transferForm.value);
    this.userService.sendPayment(this.transferForm.value).subscribe((res: any) =>{
      this.submit = false;
      this.toastController.create({
        message: 'Transaction Successful',
        duration: 1500,
        color: 'success'
      }).then(toast => {
        toast.present();
        this.router.navigateByUrl('/consumer/payment-complete');
      });
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
