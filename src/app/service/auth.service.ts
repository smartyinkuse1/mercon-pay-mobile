import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userId = '';
  baseUrl= `${environment.baseApi}auth/`;
  isAuthenticated = false;
  isAdminAuthenticated = false;
  private eventLoginError = new BehaviorSubject<any>({} as any);
  private eventLoginError$ = this.eventLoginError.asObservable();
  private loading = new Subject<boolean>();
  private token = '';
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();


  constructor(private http: HttpClient, private router: Router, private toastController: ToastController) { }

  getToken() {
    return this.token;
  }
  getAuth() {
    return this.isAuthenticated;
  }
  getUserId() {
    return this.userId;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  login(loginData) {
    this.http.post(`${this.baseUrl}login`, loginData)
      .subscribe((res: any) => {
        console.log(res);
        const token: string = res.token;
        // eslint-disable-next-line no-underscore-dangle
        this.userId = res.userId;
        this.token = token;
        if (token) {
          const expiresIndur = 7200;
          this.setAuthTimer(expiresIndur);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresIndur * 1000);
          this.saveAuthData(token, expirationDate, this.userId);
          if (res.role === 'consumer') {
            this.router.navigate(['/consumer']);
          } else {
            this.router.navigate(['/merchant']);
          }
        }
      }, err=> {
        console.log(err);
        this.toastController.create({
          message: err.error.error,
          duration: 1500,
          color: 'danger'
        }).then(toast => {
          toast.present();
        });
      });
  }
  signup(signupData) {
    return this.http.post(`${this.baseUrl}register`, signupData);
  }
  verifyOtp(otpData) {
    return this.http.post(`${this.baseUrl}verify`, otpData);
  }
  forgotPassword(forgotData) {
    return this.http.post(`${this.baseUrl}forgotpassword`, forgotData);
  }
  getLoggedInUser() {
    return this.http.get(`${this.baseUrl}user`);
  }
  getUserName(userName) {
    return this.http.get(`${this.baseUrl}userName?partialUserName=${userName}`);
  }
  autoAutUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
    else {
      this.clearAuthData();
    }

  }
  logout() {
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/login']);
  }
  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expiration');
  }
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId') as string;
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userId
    };
  }
}
