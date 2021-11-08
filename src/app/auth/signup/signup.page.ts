import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  title = '';
  constructor(
    private route: ActivatedRoute
  ) { }
  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      if (param.has('value')) {
        this.title = param.get('value');
      }
    });
  }

}
