import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.page.html',
  styleUrls: ['./approve.page.scss'],
})
export class ApprovePage implements OnInit {
  url;
  safeUrl;
  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.url = localStorage.getItem('url');
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

}
