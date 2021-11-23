import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';
@Component({
  selector: 'app-payment-search',
  templateUrl: './payment-search.page.html',
  styleUrls: ['./payment-search.page.scss'],
})
export class PaymentSearchPage implements OnInit {
  searchTextInput = new FormControl();
  searchTerm$ = new BehaviorSubject<string>('');
  searchedMerchants;
  constructor(private userService: UserService) {}

  ngOnInit() {}

  search(event): void {
    if (this.searchTextInput.value) {
      setTimeout(() => {
        this.userService
          .searchMerchants(this.searchTextInput.value)
          .subscribe((res: any) => {
            this.searchedMerchants = res.data;
            console.log(this.searchedMerchants);
          });
      }, 2000);

    }
  }
}
