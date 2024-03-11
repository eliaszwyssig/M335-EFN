import { Component, NgZone, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor(private router: Router, private zone: NgZone) {}

  ngOnInit() {
    BarcodeScanner.prepare();
  }

  async scanQRCode() {
    const allowed = await this.checkPermission();
    if (allowed) {
      const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
      if (result.hasContent) {
        this.zone.run(() => {
          if (result.content === 'M335-EFN') { // if the result matches your QR content
            this.isDone = true;
            this.wrongQRCode = '';
          } else {
            this.isDone = false;
            this.wrongQRCode = 'Falscher QR-Code!';
          }
        });
      }
    } else {
      this.wrongQRCode = 'Keine Kameraberechtigung!';
    }
  }

  private async checkPermission(): Promise<boolean> {
    // Check or request permission
    const status = await BarcodeScanner.checkPermission({ force: true });
    if (status.granted) {
      return true;
    }

    await BarcodeScanner.openAppSettings();
    return false;
  }

  async goToExercise3() {
    this.router.navigateByUrl('/aufgabe3');
  }

  ngOnDestroy() {
    BarcodeScanner.stopScan(); // Make sure to stop scanning if the view is left
  }
}
