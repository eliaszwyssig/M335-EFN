import { Component, OnDestroy, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
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
  positionUpdateInterval: any; // Handle for the interval

  constructor(private router: Router) {}

  ngOnInit() {
    this.positionUpdateInterval = setInterval(() => {
      this.getCurrentPosition();
    }, 2000); // Update every 2 seconds
  }

  ngOnDestroy() {
    if (this.positionUpdateInterval) {
      clearInterval(this.positionUpdateInterval);
    }
  }

  async getCurrentPosition() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.location = {
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude
      };
      this.updateDistance();
    } catch (e) {
      console.error('Error getting location', e);
    }
  }

  updateDistance() {
    this.distance = this.haversineDistance(this.location, this.targetLocation);
    if (this.distance !== null && this.distance < 3) {
      this.targetReached();
    }
  }

  targetReached() {
    clearInterval(this.positionUpdateInterval); // Stop updating when the target is reached
    this.router.navigateByUrl('/nächsteSeite'); // Navigate to the next page
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
    return distance;
  }


  async goToExercise2() {
    this.router.navigateByUrl("/aufgabe2");
  }
}
