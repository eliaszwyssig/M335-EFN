import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Aufgabe6Page} from "../aufgabe6/aufgabe6.page";
import {ResultServiceService} from "../result-service.service";
import {IonButton, IonIcon} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {closeCircleOutline} from "ionicons/icons";

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.scss'],
  imports: [
     IonIcon
  ],
  standalone: true
})
export class CancelComponent  {

  constructor(private router: Router, private resultService: ResultServiceService) {
    addIcons({ closeCircleOutline,});
    }
  goBackToStart(): void {
    this.router.navigateByUrl("/");
    this.resetVariables();
  }

  resetVariables(): void {
  this.resultService.potatoCounter = 0;
  this.resultService.schnitzelCounter = 0;
  this.resultService.overallTime = 0;
  this.resultService.tasks = 0;
  this.resultService.name = '';
  }
}
