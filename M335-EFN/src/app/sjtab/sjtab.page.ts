import {Component, ElementRef} from '@angular/core';
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
import {ResultServiceService} from "../result-service.service";

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
  showError: boolean = false;
  nameInputField?: IonInput;

  constructor(public alertController: AlertController,
              private router: Router, private resultService: ResultServiceService) { }

  toggleNameInput(show: boolean) {
    this.showNameInput = show;
    if (!show) {
      this.playerName = '';
      this.showError = false;
    }
  }

  submitName() {
    if (this.playerName.trim() === '') {
      this.showError = true;
    } else {
      this.showError = false;
      this.resultService.name = this.playerName
      this.router.navigateByUrl('/permissions');
    }
    this.playerName = "";
  }

  resetError() {
    this.showError = false;
  }



}
