import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonLabel,
  IonItem,
  IonImg
} from '@ionic/angular/standalone';
import {LEADERBOARDMOCK} from "../mock-leaderboard";
import {NgFor} from "@angular/common";

@Component({
  selector: 'app-lbtab',
  templateUrl: 'lbtab.page.html',
  styleUrls: ['lbtab.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, NgFor, IonList, IonLabel, IonItem, IonImg]
})
export class lbtabPage{
  leaderboards = LEADERBOARDMOCK;


  constructor() {
    this.sortLeaderboardsByTime();
  }

  sortLeaderboardsByTime() {
    this.leaderboards.sort((a, b) => {
      const timeA = this.convertTimeToSeconds(a.time);
      const timeB = this.convertTimeToSeconds(b.time);
      return timeA - timeB;
    });
  }

  convertTimeToSeconds(timeString: string): number {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 3600 + minutes * 60 ;
  }




}

