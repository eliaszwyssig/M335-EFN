import { Component, OnDestroy, OnInit } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';
import { Router } from '@angular/router';
import { IonicModule } from "@ionic/angular";
import { DecimalPipe, NgIf } from "@angular/common";
import {ResultServiceService} from "../result-service.service";

@Component({
  selector: 'app-aufgabe1',
  templateUrl: './aufgabe1.page.html',
  styleUrls: ['./aufgabe1.page.scss'],
  standalone: true,
  imports: [IonicModule, DecimalPipe, NgIf]
})
export class Aufgabe1Page implements OnInit, OnDestroy {
  distance: number | null = null;
  location = { lat: 0, lng: 0 };
  targetLocation = { lat: 47.071586, lng: 8.348635 };
  watchId: string | null = null;
  timer: any;
  distanceMarkers: string = '';

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
        this.updateDistance();
      } else if (err) {
        console.error('Error watching position:', err);
      }
    })).toString();
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
    if (this.distance !== null && this.distance <= 3) {
      this.targetReached();
    } else {
      this.updateDistanceMarkers();
    }
  }

  updateDistanceMarkers() {
    const totalMarkers = 10;
    let progress = 0;

    if (this.distance !== null && this.distance > 0) {
      progress = Math.min(1, this.distance / this.distance);
    }

    const markersReached = Math.floor(progress * totalMarkers);
    this.distanceMarkers = '—'.repeat(markersReached) + '📍' + '—'.repeat(totalMarkers - markersReached);
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
  isSuccessfull(): void{
      this.resultService.getResult(this.timer);
      this.stopTimer();

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
