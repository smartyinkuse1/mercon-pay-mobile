import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  role;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.authService.getLoggedInUser().subscribe((res: any)=> {
      this.role = res.data.role;
    });
  }

  onClick() {
    if (this.role === 'consumer') {
      this.router.navigateByUrl('/consumer');
    } else{
      this.router.navigateByUrl('/merchant');
    }
  }

}
