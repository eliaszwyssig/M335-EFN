import { Component } from '@angular/core';
import {IonHeader, IonToolbar, IonTitle, IonContent, IonButton} from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import {Router} from "@angular/router";

@Component({
  selector: 'app-sjtab',
  templateUrl: 'sjtab.page.html',
  styleUrls: ['sjtab.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
})

export class sjtabPage {
  constructor(public alertController: AlertController,
              private router: Router) { }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Gib deinen Namen ein',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Dein Name'
        }
      ],
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Bestätigung abgebrochen');
          }
        }, {
          text: 'Weiter',
          handler: async (data) => {
            if (data.name.trim() === '') {
              const errorAlert = await this.alertController.create({
                header: 'Fehler',
                message: 'Bitte gib einen Namen ein!',
                buttons: ['OK']
              });
              await errorAlert.present();
              return false;
            } else {
              this.router.navigateByUrl('/permissions');
              return true;
            }
          }
        }
      ]
    });

    await alert.present();
  }

  getPermissions() {
    this.presentAlert();
  }

}
