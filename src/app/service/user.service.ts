import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl= `${environment.baseApi}`;
  constructor(private http: HttpClient) { }

  getUserWalletBalance(id) {
    return this.http.get(`${this.baseUrl}wallet/user/${id}`);
  }
  getUserTransactions(id, page, limit) {
    return this.http.get(`${this.baseUrl}transaction/?user=${id}&status=2&page=${page}&limit=${limit}`);
  }
  getMerchantTransactions(id, page, limit) {
    return this.http.get(`${this.baseUrl}transaction/merchant?page=${page}&limit=${limit}`);
  }
  getUserDetails() {
    return this.http.get(`${this.baseUrl}auth/user`);
  }
  getUserById(id) {
    return this.http.get(`${this.baseUrl}auth/user/${id}`);
  }
  depositFund(depositData) {
    return this.http.post(`${this.baseUrl}wallet/deposit`, depositData);
  }
  searchMerchants(queryText) {
    return this.http.get(`${this.baseUrl}auth/search/?partialUserName=${queryText}`);
  }
  sendOtp() {
    return this.http.get(`${this.baseUrl}auth/send-otp`);
  }
  sendPayment(data) {
    return this.http.post(`${this.baseUrl}wallet/`, data);
  }
  withdraw(withdrawData) {
    return this.http.post(`${this.baseUrl}transaction/withdraw`, withdrawData);
  }
}
