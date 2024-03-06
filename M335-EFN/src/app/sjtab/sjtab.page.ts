import { Component } from '@angular/core';
import {IonHeader, IonToolbar, IonTitle, IonContent, IonButton} from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-sjtab',
  templateUrl: 'sjtab.page.html',
  styleUrls: ['sjtab.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
})

export class sjtabPage {
  constructor(public alertController: AlertController) { }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Bestätigung',
      message: 'Das hat geklappt',
      buttons: ['OK']
    });
    await alert.present();
  }
  startHunt() {
    this.presentAlert();
  }

}
