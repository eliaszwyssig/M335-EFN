import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { IonicModule } from "@ionic/angular";
import { NgIf } from "@angular/common";
import { Router } from '@angular/router';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.page.html',
  styleUrls: ['./permissions.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgIf
  ]
})
export class PermissionsPage {
  cameraPermissionGranted = false;
  locationPermissionGranted = false;

  constructor(private router: Router) {}

  ionViewDidEnter() {
    this.checkPermissions();
  }

  async checkPermissions(): Promise<void> {
    const cameraStatus = await Camera.checkPermissions();
    this.cameraPermissionGranted = cameraStatus.camera === 'granted';

    const geolocationStatus = await Geolocation.checkPermissions();
    this.locationPermissionGranted = geolocationStatus.location === 'granted';
  }

  async requestCameraPermission(): Promise<void> {
    await Camera.requestPermissions({ permissions: ['camera'] });
    this.checkPermissions();
  }

  async requestGeolocationPermission(): Promise<void> {
    await Geolocation.requestPermissions({ permissions: ['location'] });
    this.checkPermissions();
  }

  startHunt() {
    if(this.cameraPermissionGranted && this.locationPermissionGranted) {
      this.router.navigateByUrl('/aufgabe1');
    } else {
    }
  }
}
