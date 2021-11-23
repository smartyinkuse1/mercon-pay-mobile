import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-payment-confirm',
  templateUrl: './payment-confirm.page.html',
  styleUrls: ['./payment-confirm.page.scss'],
})
export class PaymentConfirmPage implements OnInit {
  userId;
  recipient;
  transferForm: FormGroup = {} as FormGroup;
  submit = false;
  constructor(
    private route: ActivatedRoute, private userService: UserService, private router: Router,
    private toastController: ToastController) { }

  ngOnInit() {
    this.transferForm = new FormGroup({
      amount: new FormControl(null, {
        validators: [Validators.required, Validators.min(3)],
      }),
    });
  }

  ionViewWillEnter() {
    this.route.paramMap.subscribe(paramMap => {
      if (paramMap.has('id')) {
        this.userId = paramMap.get('id');
        this.userService.getUserById(this.userId).subscribe((res: any) => {
          this.recipient = res.data;
        });
      }
    });
  }

  get f() {
    return this.transferForm.controls;
  }

  onSubmit() {
    this.submit = true;
    console.log(this.transferForm.value);
    if (this.transferForm.invalid) {
      setTimeout(() => {
        this.submit = false;
      }, 1000);
      return;
    }
    this.userService.sendOtp().subscribe((res: any) =>{
      this.submit = false;
      this.router.navigateByUrl(`/consumer/verify-payment/${this.userId}/${this.transferForm.value.amount}`);
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
