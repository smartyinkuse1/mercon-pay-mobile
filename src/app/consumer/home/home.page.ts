import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private routerOutlet: IonRouterOutlet) { }

  ngOnInit() {
    this.routerOutlet.swipeGesture = false;
  }

}
