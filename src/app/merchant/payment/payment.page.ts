import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  encodedData: any;
  barcodeScannerOptions: BarcodeScannerOptions;
  constructor(private scanner: BarcodeScanner, private authService: AuthService ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.authService.getLoggedInUser().subscribe((res: any) => {
      this.scanner.encode(this.scanner.Encode.TEXT_TYPE, res.data.userName).then(data=> {
        this.encodedData = data;
      });
    });
  }
}
