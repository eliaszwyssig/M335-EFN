import {Component, Injectable, OnInit} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonLabel,
  IonItem,
  IonImg, IonButton
} from '@ionic/angular/standalone';
import {LEADERBOARDMOCK} from "../mock-leaderboard";
import {NgFor} from "@angular/common";
import {Storage} from "@ionic/storage-angular";
import {Leaderboard} from "./leaderboard";

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-lbtab',
  templateUrl: 'lbtab.page.html',
  styleUrls: ['lbtab.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, NgFor, IonList, IonLabel, IonItem, IonImg, IonButton]
})
export class lbtabPage{
  leaderboards: Array<Leaderboard> = [];

  constructor(private storage: Storage) {
    this.loadLeaderboards();
  }
  async loadLeaderboards() {
    await this.storage.create();
    const storedLeaderboards = await this.storage.get('leaderboards');
    if (storedLeaderboards) {
      this.leaderboards = storedLeaderboards;
      this.sortLeaderboardsByTime();
    }
  }

  async saveLeaderboards() {
    await this.storage.create();
    await this.storage.set('leaderboards', this.leaderboards);
  }

  sortLeaderboardsByTime() {
    this.leaderboards.sort((a, b) => {
      const timeA = this.convertTimeToSeconds(a.time);
      const timeB = this.convertTimeToSeconds(b.time);
      return timeA - timeB;
    });
  }

  addLeaderboardEntry(playerName: string, time: string, schnitzel: number, potato: number) {
    const newEntry: Leaderboard = {
      playerName: playerName,
      date: new Date(),
      time: time,
      schnitzel: schnitzel,
      potato: potato
    };
    this.leaderboards.push(newEntry);
    this.saveLeaderboards();
    this.sortLeaderboardsByTime();
  }

  convertTimeToSeconds(timeString: string): number {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  }

}

