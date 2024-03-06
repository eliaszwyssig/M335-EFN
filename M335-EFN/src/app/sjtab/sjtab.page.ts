import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonInput,
  IonLabel,
  IonItem
} from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { Router } from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-sjtab',
  templateUrl: 'sjtab.page.html',
  styleUrls: ['sjtab.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, FormsModule, IonInput, IonLabel, IonItem, NgIf],
})

export class sjtabPage {
  showNameInput = false;
  playerName: string = '';

  constructor(public alertController: AlertController,
              private router: Router) { }

  toggleNameInput(show: boolean) {
    this.showNameInput = show;
    if (!show) {
      this.playerName = '';
    }
  }

  async submitName() {
    if (this.playerName.trim() === '') {
      const errorAlert = await this.alertController.create({
        header: 'Fehler',
        message: 'Bitte gib einen Namen ein!',
        buttons: ['OK']
      });
      await errorAlert.present();
    } else {
      this.router.navigateByUrl('/permissions');
    }
  }

}
