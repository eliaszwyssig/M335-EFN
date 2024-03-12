import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Router} from "@angular/router";
import {ResultServiceService} from "../result-service.service";
import {CancelComponent} from "../cancel/cancel.component";
import { IonicModule, Platform, IonRouterOutlet } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-aufgabe5',
  templateUrl: './aufgabe5.page.html',
  styleUrls: ['./aufgabe5.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, CancelComponent]
})
export class Aufgabe5Page implements OnInit {
  timer: any;
  turnedRight: boolean = false;
  turnedLeft: boolean = false;
  sec: number = 0;
  private backSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private resultService: ResultServiceService,
    private platform: Platform,
    private routerOutlet: IonRouterOutlet
  ) {}

  ngOnInit() {
    window.addEventListener('orientationchange', this.checkOrientation);
    this.startTimer();
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
    this.router.navigateByUrl("/aufgabe6");
  }

  checkOrientation = () => {
    const orientation = screen.orientation.type;
    if (orientation === 'landscape-secondary') {
      this.turnedRight = true;
    } else if (orientation === 'landscape-primary') {
      this.turnedLeft = true;
    }
    this.isSuccessfull()
  }

  startTimer(): void {
    this.timer = setInterval(() => {
      this.sec++;
    }, 1000)
  }

  stopTimer(): void {
    clearInterval(this.timer);
  }

  isSuccessfull(): void {
    if (this.turnedRight && this.turnedLeft) {
      this.stopTimer();
      this.resultService.getResult(this.sec);

    }
  }
}




