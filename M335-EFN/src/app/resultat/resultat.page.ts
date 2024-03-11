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

  name: any;
  time: any;
  schnitzel: any;
  potato: any;
  ngOnInit() {
    this.name= this.resultService.name
    this.time= this.resultService.overallTime
    this.schnitzel= this.resultService.schnitzelCounter
    this.potato= this.resultService.potatoCounter
  }

}
