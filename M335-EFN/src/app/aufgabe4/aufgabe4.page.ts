import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Device } from "@capacitor/device";
import { IonicModule, Platform} from "@ionic/angular";
import { NgIf } from "@angular/common";
import { batteryDead, batteryCharging } from "ionicons/icons";
import { addIcons } from "ionicons";
import {IonRouterOutlet} from "@ionic/angular/standalone";
import { ResultServiceService } from "../result-service.service";
import {CancelComponent} from "../cancel/cancel.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-aufgabe4',
  templateUrl: './aufgabe4.page.html',
  styleUrls: ['./aufgabe4.page.scss'],
  standalone: true,
  imports: [IonicModule, NgIf, CancelComponent, IonRouterOutlet]
})
export class Aufgabe4Page implements OnInit, OnDestroy {
  isCharging: boolean = false;
  intervalId: any;
  timer: any;
  sec: number = 0;
  isSuccessfullCalled: boolean = false;
  private backSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private resultService: ResultServiceService,
    private platform: Platform,
    private routerOutlet: IonRouterOutlet
  ) {
    addIcons({ batteryCharging, batteryDead });
  }

  ngOnInit() {
    this.startTimer();
    this.startChargingStatusCheck();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    this.stopTimer();
    this.backSubscription?.unsubscribe();
  }

  ionViewDidEnter() {
    this.backSubscription = this.platform.backButton.subscribeWithPriority(
      10,
      () => {
        if (!this.routerOutlet.canGoBack()) {
          // Optional: Alert message, toast, or no action
        }
      },
    );
  }

  ionViewWillLeave() {
    this.backSubscription?.unsubscribe();
  }

  async goToExercise6() {
    this.router.navigateByUrl('/aufgabe5');
  }

  startChargingStatusCheck() {
    this.intervalId = setInterval(() => {
      this.checkChargingStatus();
    }, 1000); // Check every 1 second
  }

  async checkChargingStatus() {
    const info = await Device.getBatteryInfo();
    const isCharging = info.isCharging ?? false;
    if (isCharging && !this.isSuccessfullCalled) {
      this.isSuccessfullCalled = true;
      this.isSuccessfull();
    }
    this.isCharging = isCharging;
  }



  startTimer(): void {
    this.timer = setInterval(() => {
      this.sec++;
    }, 1000); // Start timer to tick every 1 second
  }

  stopTimer(): void {
    clearInterval(this.timer);
  }

  isSuccessfull(): void {
    this.stopTimer();
    this.resultService.getResult(this.sec); // Assuming getResult needs the timer ID
  }
}
