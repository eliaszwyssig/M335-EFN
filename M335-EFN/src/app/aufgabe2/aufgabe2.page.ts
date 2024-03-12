import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Router } from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule, Platform} from '@ionic/angular';
import {IonRouterOutlet} from "@ionic/angular/standalone";
import {ResultServiceService} from "../result-service.service";
import {CancelComponent} from "../cancel/cancel.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-aufgabe2',
  templateUrl: './aufgabe2.page.html',
  styleUrls: ['./aufgabe2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, CancelComponent, IonRouterOutlet]
})
export class Aufgabe2Page implements OnInit {
  isSupported = false;
  isDone: boolean = false;
  wrongQRCode: string = '';
  timer: any;
  sec: number =  0;
  private backSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private resultService: ResultServiceService,
    private platform: Platform,
    private routerOutlet: IonRouterOutlet
  ) {}

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
    this.startTimer();
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
          this.wrongQRCode = '';
          this.isSuccessfull();
        } else {
          this.isDone = false;
          this.wrongQRCode = 'Falscher QR-Code!';
        }
      } else {
        this.isDone = false;
        this.wrongQRCode = 'Kein QR-Code gescannt.';
      }
    } catch (error: unknown) {
      let errorMessage = 'Unbekannter Fehler';
      if (typeof error === "object" && error !== null && "message" in error) {
        errorMessage = (error as { message: string }).message;
      }
      this.wrongQRCode = `Fehler beim Scannen: ${errorMessage}`;
    }
  }startTimer(): void {
    this.timer = setInterval(() => {
      this.sec++;
    }, 1000)
  }
  stopTimer(): void {
    clearInterval(this.timer);
  }
  isSuccessfull(): void{
    this.stopTimer();
    this.resultService.getResult(this.sec);
  }

  goToExercise3() {
    if (this.isDone) {
      this.router.navigateByUrl('/aufgabe3');
    }
  }

  ionViewDidEnter() {
    this.backSubscription = this.platform.backButton.subscribeWithPriority(
      10,
      () => {
        if (!this.routerOutlet.canGoBack()) {
        }
      },
    );
  }
  ionViewWillLeave() {
    this.backSubscription?.unsubscribe();
  }

}
