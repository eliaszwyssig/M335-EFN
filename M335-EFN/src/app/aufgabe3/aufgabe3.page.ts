import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Geolocation, Position } from '@capacitor/geolocation';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ResultServiceService } from '../result-service.service';

@Component({
  selector: 'app-aufgabe3',
  templateUrl: './aufgabe3.page.html',
  styleUrls: ['./aufgabe3.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, DecimalPipe]
})
export class Aufgabe3Page implements OnInit, OnDestroy {
  currentDistance = 0;
  targetDistance = 10;
  startPosition: Position | null = null;
  watchId: string | null = null;

  constructor(
    private router: Router,
    private resultService: ResultServiceService
  ) {}

  ngOnInit() {
    this.startWatchingPosition();
  }

  ngOnDestroy() {
    this.stopWatchingPosition();
  }

  async startWatchingPosition() {
    const options = {
      enableHighAccuracy: true,
      timeout: Infinity
    };

    this.watchId = (await Geolocation.watchPosition(options, (position, err) => {
      if (position) {
        if (!this.startPosition) {
          this.startPosition = position;
        }
        this.updateLocation(position);
      } else if (err) {
        console.error('Error watching position:', err);
      }
    })).toString();
  }

  updateLocation(position: Position) {
    if (this.startPosition) {
      this.currentDistance = this.calculateDistance(this.startPosition, position);
      if (this.currentDistance >= this.targetDistance) {
        this.targetReached();
      }
    }
  }

  calculateDistance(start: Position, end: Position): number {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371e3; // Radius of the Earth in meters
    const dLat = toRad(end.coords.latitude - start.coords.latitude);
    const dLng = toRad(end.coords.longitude - start.coords.longitude);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(start.coords.latitude)) * Math.cos(toRad(end.coords.latitude)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in meters
  }

  targetReached() {
    this.stopWatchingPosition();
    this.router.navigateByUrl('/nächsteSeite');
  }

  stopWatchingPosition() {
    if (this.watchId) {
      Geolocation.clearWatch({ id: this.watchId });
    }
  }

  goToExercise4() {
    if (this.currentDistance >= this.targetDistance) {
      this.router.navigateByUrl('/aufgabe4');
    }
  }
}
