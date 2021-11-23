import { Component, OnInit } from '@angular/core';
import {
  BarcodeScanner,
  BarcodeScannerOptions,
} from '@ionic-native/barcode-scanner/ngx';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-payment-scan',
  templateUrl: './payment-scan.page.html',
  styleUrls: ['./payment-scan.page.scss'],
})
export class PaymentScanPage implements OnInit {
  scannedBarCode;
  barcodeScannerOptions: BarcodeScannerOptions;
  merchant;
  cardState = false;
  constructor(
    private scanner: BarcodeScanner,
    private authService: AuthService
  ) {}
  ngOnInit() {}

  ionViewWillEnter() {
    this.cardState = false;
  }

  scanBRcode() {
    this.scanner
      .scan()
      .then((res) => {
        this.scannedBarCode = res;
        this.authService
          .getUserName(this.scannedBarCode.text)
          .subscribe((data: any) => {
            this.cardState = true;
            this.merchant = data.data;
          });
      })
      .catch((err) => {
        alert(err);
      });
  }
}
