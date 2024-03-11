import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from "@angular/router";
// @ts-ignore
import {Geolocation, Position} from '@capacitor/geolocation';

@Component({
  selector: 'app-aufgabe1',
  templateUrl: './aufgabe1.page.html',
  styleUrls: ['./aufgabe1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Aufgabe1Page {
  distance: number = 0;
  watchId: string | undefined;
  location = {lat: 0, ltd: 0};

  constructor(private router: Router) { }

  ngOnInit() {
    this.startWatchingPosition(); // Starten der Positionsüberwachung beim Initialisieren der Seite
  }

  ngOnDestroy() {
    this.stopWatchingPosition(); // Stoppen der Positionsüberwachung beim Verlassen der Seite
  }

  async goToExercise2() {
    this.router.navigateByUrl("/aufgabe2");
  }

  async startWatchingPosition() {
    const options = {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000
    };

    this.watchId = await Geolocation.watchPosition(options, (position, err) => {
      if (position && !err) {
        this.location.lat = position.coords.latitude;
        this.location.ltd = position.coords.longitude;
        this.updateDistance(position);
      } else {
        console.error("Error getting current position:", err);
      }
    });
  }

  stopWatchingPosition() {
    if (this.watchId) {
      Geolocation.clearWatch({ id: this.watchId });
    }
  }

  async updateDistance(position: Position) {
    const coords1 = { latitude: position.coords.latitude, longitude: position.coords.longitude };
    const coords2 = { latitude: 47.071586, longitude: 8.348635 }; // Beispielkoordinaten, anpassen
    this.distance = this.haversineDistance(coords1, coords2);
    console.log("Distance:", this.distance);
  }

  haversineDistance(
    coords1: { latitude: number; longitude: number },
    coords2: { latitude: number; longitude: number },
  ) {
    const R = 6371e3; // Erdradius in Metern
    const lat1Rad = coords1.latitude * (Math.PI / 180);
    const lat2Rad = coords2.latitude * (Math.PI / 180);
    const deltaLat = (coords2.latitude - coords1.latitude) * (Math.PI / 180);
    const deltaLon = (coords2.longitude - coords1.longitude) * (Math.PI / 180);

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;

    return distance; // in Metern
  }
}
