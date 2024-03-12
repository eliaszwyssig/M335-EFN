import {Component, Injectable, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {Router} from "@angular/router";
import {ResultServiceService} from "../result-service.service";
import {CancelComponent} from "../cancel/cancel.component";

@Component({
  selector: 'app-aufgabe5',
  templateUrl: './aufgabe5.page.html',
  styleUrls: ['./aufgabe5.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, CancelComponent]
})
export class Aufgabe5Page implements OnInit{
  timer: any;
  turnedRight: boolean = false;
  turnedLeft: boolean = false;
  sec: number = 0;

  ngOnInit() {
    window.addEventListener('orientationchange', this.checkOrientation);
    this.startTimer();
  }
  constructor(private router: Router, private resultService: ResultServiceService) {

  }

  async goToExercise6(){
    this.router.navigateByUrl("/aufgabe6");
  }
  checkOrientation = ()  => {
    const orientation = screen.orientation.type;
    if (orientation === 'landscape-secondary') {
      this.turnedRight = true;
    } else if (orientation === 'landscape-primary') {
      this.turnedLeft = true;
    }
    this.isSuccessfull()
  }
  startTimer(): void {
    this.timer = setInterval(() => {
     this.sec++;
    }, 1000)
  }
  stopTimer(): void {
    clearInterval(this.timer);
  }
  isSuccessfull(): void{
    if(this.turnedRight && this.turnedLeft)  {
      this.stopTimer();
      this.resultService.getResult(this.sec);

    }
  }
}




