import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {ResultServiceService} from "../result-service.service";
import {Route, Router} from "@angular/router";
import {lbtabPage} from "../lbtab/lbtab.page";

@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.page.html',
  styleUrls: ['./resultat.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ResultatPage implements OnInit {

  constructor(private resultService: ResultServiceService, private router: Router, private leaderboardEntry: lbtabPage) { }

  name: string = '';
  time: string = '';
  schnitzel: number = 0;
  potato: number = 0;
  ngOnInit() {
    this.name= this.resultService.name
    this.time = this.resultService.timeString;
    this.schnitzel= this.resultService.schnitzelCounter
    this.potato= this.resultService.potatoCounter
  }

  goToStartPage(): void {
    this.router.navigateByUrl("/");
    this.leaderboardEntry.addLeaderboardEntry(this.name, this.time,this.schnitzel,this.potato);
  }

}
