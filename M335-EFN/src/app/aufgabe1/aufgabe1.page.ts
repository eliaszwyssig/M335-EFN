import { Component, OnDestroy, OnInit } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';
import { Router } from '@angular/router';
import {IonicModule} from "@ionic/angular";
import {DecimalPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-aufgabe1',
  templateUrl: './aufgabe1.page.html',
  styleUrls: ['./aufgabe1.page.scss'],
  standalone:true,
  imports: [IonicModule, DecimalPipe, NgIf]
})
export class Aufgabe1Page implements OnInit, OnDestroy {
  distance: number | null = null;
  watchId: string | null = null;
  location = { lat: 0, lng: 0 };
  targetLocation = { lat: 47.071586, lng: 8.348635 };

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
      timeout: 27000
    };

    // Fehlerbehebung: Entferne das 'await' Keyword, weil watchId ein Promise<string> zurückgibt.
    this.watchId = await Geolocation.watchPosition(options, (position, err) => {
      if (position) {
        this.updateLocation(position);
        this.updateDistance();
      } else if (err) {
        console.error('Error watching position:', err);
      }
    });
  }

  stopWatchingPosition() {
    if (this.watchId) {
      Geolocation.clearWatch({ id: this.watchId }).then(() => {
        this.watchId = null;
      });
    }
  }

  updateLocation(position: Position) {
    this.location.lat = position.coords.latitude;
    this.location.lng = position.coords.longitude;
  }

  updateDistance() {
    this.distance = this.haversineDistance(this.location, this.targetLocation);
    if (this.distance < 3) {
      this.targetReached();
    }
  }

  targetReached() {
    // Diese Funktion wird aufgerufen, wenn der Benutzer weniger als 3 Meter vom Ziel entfernt ist
    this.stopWatchingPosition(); // Optional: Beende die Positionsüberwachung, wenn das Ziel erreicht wurde
    this.router.navigateByUrl('/nächsteSeite'); // Navigiere zur nächsten Seite
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
    const distance = R * c;
    return distance; // Distanz in Metern
  }
  async goToExercise2() {
    this.router.navigateByUrl("/aufgabe2");
  }
}
