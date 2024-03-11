import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aufgabe2',
  templateUrl: './aufgabe2.page.html',
  styleUrls: ['./aufgabe2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Aufgabe2Page implements OnInit {
  isSupported = false;
  isDone: boolean = false;
  scanAttempted: boolean = false;
  wrongQRCode: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  async scanQRCode() {
    if (!this.isSupported) {
      this.wrongQRCode = 'Barcode-Scanning wird auf diesem Gerät nicht unterstützt.';
      return;
    }

    const granted = await this.requestPermissions();
    if (!granted) {
      this.wrongQRCode = 'Kamerazugriff verweigert. Bitte in den Einstellungen erlauben.';
      return;
    }

    const result = await BarcodeScanner.scan();
    this.scanAttempted = true;

    if (result.barcodes.length > 0) {
      if (result.barcodes[0].rawValue === 'M335-EFN') {
        this.isDone = true;
        this.wrongQRCode = '';
        // Führe die Logik für den Abschluss der Aufgabe hier aus
      } else {
        this.wrongQRCode = 'Falscher QR-Code!';
        this.isDone = false;
      }
    } else {
      this.wrongQRCode = 'Kein QR-Code gescannt.';
      this.isDone = false;
    }
  }

  async requestPermissions(): Promise<boolean> {
    const status = await BarcodeScanner.checkPermissions();

    if (status.camera === 'granted') {
      return true;
    }

    const requestResult = await BarcodeScanner.requestPermissions();
    return requestResult.camera === 'granted';
  }

  async goToExercise3() {
    if (this.isDone) {
      this.router.navigateByUrl('/aufgabe3');
    }
  }
}
