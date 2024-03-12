import { Component, OnDestroy, OnInit } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';
import { Router } from '@angular/router';
import {IonicModule,  Platform} from "@ionic/angular";
import {IonRouterOutlet} from "@ionic/angular/standalone";
import { DecimalPipe, NgIf } from "@angular/common";
import {ResultServiceService} from "../result-service.service";
import {CancelComponent} from "../cancel/cancel.component";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-aufgabe1',
  templateUrl: './aufgabe1.page.html',
  styleUrls: ['./aufgabe1.page.scss'],
  standalone: true,
  imports: [IonicModule, DecimalPipe, NgIf, CancelComponent, IonRouterOutlet]
})
export class Aufgabe1Page implements OnInit, OnDestroy {
  private backSubscription: Subscription | undefined;
  distance: number | null = null;
  location = { lat: 0, lng: 0 };
  targetLocation = { lat: 47.071586, lng: 8.348635, initialDistance: 0 };
  watchId: string | null = null;
  timer: any;
  distanceMarkers: string = '';
  initialDistanceSet: boolean = false;
  sec: number = 0;

  constructor(private platform: Platform, private routerOutlet: IonRouterOutlet, private router: Router, private resultService: ResultServiceService) {
    this.startTimer();
  }

  ngOnInit() {
    this.startWatchingPosition();
    this.startTimer();
  }

  ngOnDestroy() {
    this.stopWatchingPosition();
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

  async startWatchingPosition() {
    if (!this.targetLocation.initialDistance) {
      this.targetLocation.initialDistance = this.haversineDistance(this.location, this.targetLocation);
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000
    };

    this.watchId = (await Geolocation.watchPosition(options, (position, err) => {
      if (position) {
        if (!this.initialDistanceSet) {
          this.initialDistanceSet = true;
          this.targetLocation.initialDistance = this.haversineDistance(
            { lat: position.coords.latitude, lng: position.coords.longitude },
            this.targetLocation
          );
        }
        this.updateLocation(position);
        this.updateDistance();
      } else if (err) {
        console.error('Error watching position:', err);
      }
    })).toString();
  }

  async updateCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.updateLocation(coordinates);
  }

  stopWatchingPosition() {
    if (this.watchId) {
      Geolocation.clearWatch({ id: this.watchId });
      this.watchId = null;
    }
  }

  updateLocation(position: Position) {
    this.location.lat = position.coords.latitude;
    this.location.lng = position.coords.longitude;
    this.updateDistance();
  }

  updateDistance() {
    this.distance = this.haversineDistance(this.location, this.targetLocation);
    if (this.distance !== null && this.distance <= 5) {
      this.targetReached();
    } else {
      this.updateDistanceMarkers();
    }
  }

  updateDistanceMarkers() {
    const totalMarkers = 10;
    let markersReached = 0;

    if (this.distance !== null) {
      const distanceCovered = this.targetLocation.initialDistance - this.distance;
      const progress = distanceCovered / (this.targetLocation.initialDistance - 3);
      markersReached = Math.min(totalMarkers, Math.floor(progress * totalMarkers));
    }
    this.distanceMarkers = '—'.repeat(markersReached) + (markersReached < totalMarkers ? '📍' : '') + '—'.repeat(totalMarkers - markersReached - (markersReached < totalMarkers ? 1 : 0));
  }

  targetReached() {
    this.stopWatchingPosition();

      this.isSuccessfull();

    this.router.navigateByUrl('/nächsteSeite');
  }
  startTimer(): void {
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
  haversineDistance(source: { lat: number, lng: number }, target: { lat: number, lng: number }): number {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371e3;
    const dLat = toRad(target.lat - source.lat);
    const dLng = toRad(target.lng - source.lng);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(source.lat)) * Math.cos(toRad(target.lat)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  async goToExercise2() {
    this.router.navigateByUrl("/aufgabe2");
  }
}
