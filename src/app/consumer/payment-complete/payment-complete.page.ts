import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-payment-complete',
  templateUrl: './payment-complete.page.html',
  styleUrls: ['./payment-complete.page.scss'],
})
export class PaymentCompletePage implements OnInit {

  constructor(private routerOutlet: IonRouterOutlet) { }

  ngOnInit() {
    this.routerOutlet.swipeGesture = false;
  }

}
