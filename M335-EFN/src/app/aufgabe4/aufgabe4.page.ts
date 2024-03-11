import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Device } from "@capacitor/device";
import { IonicModule } from "@ionic/angular";
import {NgIf} from "@angular/common";
import {batteryDead, batteryCharging} from "ionicons/icons";
import {addIcons} from "ionicons";
import {ResultServiceService} from "../result-service.service";

@Component({
  selector: 'app-aufgabe4',
  templateUrl: './aufgabe4.page.html',
  styleUrls: ['./aufgabe4.page.scss'],
  standalone: true,
  imports: [IonicModule, NgIf]
})
export class Aufgabe4Page implements OnDestroy {
  isCharging: boolean = false;
  intervalId: any;
  timer: any;

  constructor(private router: Router, private resultService: ResultServiceService) {
    this.startChargingStatusCheck();
    addIcons({batteryCharging,batteryDead })
    this.startTimer();
  }

  async goToExercise6() {
    this.router.navigateByUrl('/aufgabe5');
  }

  startChargingStatusCheck() {
    this.checkChargingStatus();
    this.intervalId = setInterval(() => {
      this.checkChargingStatus();
    }, 1);
  }

  async checkChargingStatus() {
    const info = await Device.getBatteryInfo();
    this.isCharging = info.isCharging ?? false;
    this.isSuccessfull();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
  startTimer(): void {
    this.timer = setInterval(() => {
      console.log('Timer tick');
    }, 1000)
  }
  stopTimer(): void {
    clearInterval(this.timer);
  }
  isSuccessfull(): void{
    if(this.isCharging)  {
      this.resultService.getResult(this.timer);
      this.stopTimer();
    }
  }
}
