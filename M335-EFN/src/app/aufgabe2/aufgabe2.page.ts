import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from "@angular/router";
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
@Component({
  selector: 'app-aufgabe2',
  templateUrl: './aufgabe2.page.html',
  styleUrls: ['./aufgabe2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Aufgabe2Page implements OnInit {

  wrongQRCode: string;
  isDone: boolean;

  constructor(private router: Router) {
    this.wrongQRCode = "";
    this.isDone = false;
  }

  async ngOnInit() {
    await this.installGoogleBarcodeScannerModule();
  }

  async installGoogleBarcodeScannerModule() {
    await BarcodeScanner.installGoogleBarcodeScannerModule();
  }

  async scanQRCode() {
    const result = await BarcodeScanner.scan();
    if (result.barcodes[0].valueType === 'TEXT' && result.barcodes[0].displayValue === 'M335-EFN') {
      this.wrongQRCode = "";
      this.isDone = true
    } else {
      this.wrongQRCode = "Falscher QR-Code!";
    }
  }

  async goToExercise3() {
    this.router.navigateByUrl("/aufgabe3");
  }
}
