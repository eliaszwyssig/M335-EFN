import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule, DecimalPipe} from '@angular/common';
import { Geolocation, Position } from '@capacitor/geolocation';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {Router} from "@angular/router";
import {ResultServiceService} from "../result-service.service";


@Component({
  selector: 'app-aufgabe3',
  templateUrl: './aufgabe3.page.html',
  styleUrls: ['./aufgabe3.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, DecimalPipe]
})
export class Aufgabe3Page implements OnInit, OnDestroy{
  location = { lat: 0, lng: 0 };
  watchId: string | null = null;
  timer: any;
  targetDistance = 10; // Define the target distance in meters

  constructor(private router: Router, private resultService: ResultServiceService) {
    this.startTimer();
  }

  ngOnInit() {
    this.startWatchingPosition();
  }

  ngOnDestroy() {
    this.stopWatchingPosition();
  }

  async startWatchingPosition() {
    const options = {
      enableHighAccuracy: true,
      timeout: 10000
    };

    this.watchId = (await Geolocation.watchPosition(options, (position, err) => {
      if (position) {
        this.updateLocation(position);
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
    // Calculate distance between current location and the target distance
    if (this.location.lat !== 0 && this.location.lng !== 0) {
      const distanceToTarget = this.calculateDistanceFromTarget();
      if (distanceToTarget <= this.targetDistance) {
        this.targetReached();
      }
    }
  }

  targetReached() {
    this.stopWatchingPosition();
    this.isSuccessfull();
    this.router.navigateByUrl('/nächsteSeite');
  }

  startTimer(): void {
    this.timer = setInterval(() => {
      console.log('Timer tick');
    }, 1000)
  }

  stopTimer(): void {
    clearInterval(this.timer);
  }

  isSuccessfull(): void {
    this.resultService.getResult(this.timer);
    this.stopTimer();
  }

  calculateDistanceFromTarget(): number {
    // Haversine formula to calculate distance between two coordinates
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371e3; // Earth radius in meters
    const targetLat = 47.071586; // Hypothetical target latitude
    const targetLng = 8.348635; // Hypothetical target longitude
    const dLat = toRad(targetLat - this.location.lat);
    const dLng = toRad(targetLng - this.location.lng);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(this.location.lat)) * Math.cos(toRad(targetLat)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in meters
  }

  async goToExercise4() {
    this.router.navigateByUrl("/aufgabe4");
  }
}
