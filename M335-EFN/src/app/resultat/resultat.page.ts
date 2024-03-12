import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {ResultServiceService} from "../result-service.service";

@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.page.html',
  styleUrls: ['./resultat.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ResultatPage implements OnInit {

  constructor(private resultService: ResultServiceService) { }

  name: any = 0;
  time: any = 0;
  schnitzel: any = 0;
  potato: any = 0;
  ngOnInit() {
    this.name= this.resultService.name
    this.time= this.resultService.overallTime
    this.schnitzel= this.resultService.schnitzelCounter
    this.potato= this.resultService.potatoCounter
  }

}
