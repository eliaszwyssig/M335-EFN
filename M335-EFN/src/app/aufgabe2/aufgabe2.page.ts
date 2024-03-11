import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Router } from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

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

    try {
      const result = await BarcodeScanner.scan();

      if (result.barcodes.length > 0) {
        const scannedCode = result.barcodes[0];
        if (scannedCode.rawValue === 'M335-EFN') {
          this.isDone = true;
        } else {
          this.wrongQRCode = 'Falscher QR-Code!';
          this.isDone = false;
        }
      } else {
        this.wrongQRCode = 'Kein QR-Code gescannt.';
        this.isDone = false;
      }
    } catch (error) {
      this.wrongQRCode = 'Fehler beim Scannen. Bitte versuche es erneut.';
    }
  }

  goToExercise3() {
    if (this.isDone) {
      this.router.navigateByUrl('/aufgabe3');
    }
  }
}
