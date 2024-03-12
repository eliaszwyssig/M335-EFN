import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule , Platform} from '@ionic/angular';
import {IonRouterOutlet} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import { Network  } from '@capacitor/network';
import {ResultServiceService} from "../result-service.service";
import {wifiSharp} from "ionicons/icons";
import {Router} from "@angular/router";
import {CancelComponent} from "../cancel/cancel.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-aufgabe6',
  templateUrl: './aufgabe6.page.html',
  styleUrls: ['./aufgabe6.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, CancelComponent, IonRouterOutlet]
})
export class Aufgabe6Page implements OnInit {
  private backSubscription: Subscription | undefined;
  isConnectedToWifi = false;
  isDisconnectedToWifi: boolean = false;
  timer: any;
  sec: number = 0;

  constructor(
    private router: Router,
    private resultService: ResultServiceService,
    private platform: Platform,
    private routerOutlet: IonRouterOutlet // Ergänzt für Back Button Subscription
  ) {
    addIcons({ wifiSharp });
  }

  ngOnInit() {
    this.startTimer();
    this.checkWifiConnection();
    setInterval(() => this.checkWifiConnection(), 5000);
    ;
  }

  ionViewDidEnter() {
    this.backSubscription = this.platform.backButton.subscribeWithPriority(10, () => {
      if (!this.routerOutlet.canGoBack()) {
        // Optional: Alert oder andere Aktion zur Bestätigung
      }
    });
  }

  ionViewWillLeave() {
    this.backSubscription?.unsubscribe();
  }

  async checkWifiConnection() {
    const status = await Network.getStatus();
    this.isConnectedToWifi = status.connected && status.connectionType === 'wifi';
    this.isDisconnectedToWifi = !this.isConnectedToWifi;
    if (this.isConnectedToWifi && this.isDisconnectedToWifi) {
      this.isSuccessfull();
    }
  }

  startTimer(): void {
    this.timer = setInterval(() => {
      this.sec++;
    }, 1000);
  }

  stopTimer(): void {
    clearInterval(this.timer);
  }

  isSuccessfull(): void {
    if (this.isDisconnectedToWifi && this.isConnectedToWifi) {
      this.stopTimer();
      this.resultService.getResult(this.sec);
    }
  }

  async goToResults() {
    this.router.navigateByUrl("/resultat");
  }


}
