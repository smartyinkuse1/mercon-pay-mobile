import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  walletDetails;
  transactions;
  page = 1;
  limit = 5;
  userId;
  user;
  previous;
  next;
  constructor(private routerOutlet: IonRouterOutlet, private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.userId = this.authService.getUserId();
    this.routerOutlet.swipeGesture = false;
    this.userService.getUserWalletBalance(this.userId).subscribe((res: any)=> {
      this.walletDetails = res.data;
      console.log(this.walletDetails);
    });
    this.getTransactions(this.page, this.limit);
    this.userService.getUserDetails().subscribe((res: any) => {
      this.user = res.data;
      console.log(this.user);
    });
  }

  getTransactions(page, limit) {
    this.userService.getUserTransactions(this.userId, page, limit).subscribe((res: any)=> {
      this.transactions = res.data;
      console.log(res);
      this.previous = res.pagination.prev;
      this.next = res.pagination.next;
      console.log(this.previous, this.next);

    });
  }

  onPrev() {
    this.getTransactions(this.previous.page, this.previous.limit);
  }
  onNext() {
    this.getTransactions(this.next.page, this.next.limit);
  }

  onLogout() {
    this.authService.logout();
  }

}
