import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {addIcons} from "ionicons";
import { wifiSharp} from "ionicons/icons";
import { Network,  } from '@capacitor/network';
import {ToastController} from "@ionic/angular/standalone";

@Component({
  selector: 'app-aufgabe6',
  templateUrl: './aufgabe6.page.html',
  styleUrls: ['./aufgabe6.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Aufgabe6Page {
  isConnectedToWifi = false;

  constructor(private toastController: ToastController) {
    addIcons({ wifiSharp });
    this.checkWifiConnection(); // Initial check
    setInterval(() => this.checkWifiConnection(), 5000); // Check every 5 seconds
  }

  async checkWifiConnection() {
    const status = await Network.getStatus();
    if (status.connected && status.connectionType === 'wifi') {
      this.isConnectedToWifi = true;
      this.presentToast('Gerät ist mit einem WLAN-Netzwerk verbunden');
    } else {
      this.isConnectedToWifi = false;
      this.presentToast('Gerät ist nicht mit einem WLAN-Netzwerk verbunden');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      position: "middle"
    });
    toast.present();
  }
}
