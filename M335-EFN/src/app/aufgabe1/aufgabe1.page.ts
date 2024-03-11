import { Component, OnDestroy, OnInit } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';
import { Router } from '@angular/router';
import { IonicModule } from "@ionic/angular";
import { DecimalPipe, NgIf } from "@angular/common";

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

  constructor(private router: Router) {}

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
    if (this.distance !== null && this.distance < 3) {
      this.targetReached();
    }
  }

  targetReached() {
    this.stopWatchingPosition();
    this.router.navigateByUrl('/nächsteSeite');
  }

  haversineDistance(source: { lat: number, lng: number }, target: { lat: number, lng: number }): number {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371e3; // Erdradius in Metern
    const dLat = toRad(target.lat - source.lat);
    const dLng = toRad(target.lng - source.lng);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(source.lat)) * Math.cos(toRad(target.lat)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distanz in Metern
  }

  async goToExercise2() {
    this.router.navigateByUrl("/aufgabe2");
  }
}
