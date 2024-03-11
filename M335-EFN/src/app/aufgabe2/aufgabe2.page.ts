import {Component, NgZone, OnInit} from '@angular/core';
import {BarcodeScanner} from '@capacitor-mlkit/barcode-scanning';
import {Router} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-aufgabe2',
  templateUrl: './aufgabe2.page.html',
  styleUrls: ['./aufgabe2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Aufgabe2Page implements OnInit {
  wrongQRCode: string = '';
  isDone: boolean = false;

  constructor(private router: Router, private zone: NgZone) {
  }

  ngOnInit() {
  }

  async scanQRCode() {
    const status = await BarcodeScanner.checkPermissions();

    if (status.camera === 'denied' || status.camera === 'prompt') {
      this.wrongQRCode = 'Kamerazugriff verweigert. Bitte in den Einstellungen erlauben.';
      return;
    }

    if (status.camera === 'granted') {
      try {
        const result = await BarcodeScanner.scan();
        if (result.barcodes.length > 0) {
          const scannedCode = result.barcodes[0];
          this.zone.run(() => {
            if (scannedCode.displayValue === 'M335-EFN') {
              this.isDone = true;
              this.wrongQRCode = '';
            } else {
              this.isDone = false;
              this.wrongQRCode = 'Falscher QR-Code!';
            }
          });
        }
      } catch (error) {
        this.zone.run(() => {
          this.wrongQRCode = 'Fehler beim Scannen. Bitte versuche es erneut.';
        });
      }
    }
  }

  goToExercise3() {
    this.router.navigateByUrl('/aufgabe3');
  }

  ngOnDestroy() {
    BarcodeScanner.stopScan();
  }
}
