import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {Router} from "@angular/router";
import {ResultServiceService} from "../result-service.service";

@Component({
  selector: 'app-aufgabe5',
  templateUrl: './aufgabe5.page.html',
  styleUrls: ['./aufgabe5.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Aufgabe5Page implements OnInit{
  timer: any;
  turnedRight: boolean = false;
  turnedLeft: boolean = false;

  ngOnInit() {
    window.addEventListener('orientationchange', this.checkOrientation);
  }
  constructor(private router: Router, private resultService: ResultServiceService) {
    this.startTimer();
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
      console.log('Timer tick');
    }, 1000)
  }
  stopTimer(): void {
    clearInterval(this.timer);
  }
  isSuccessfull(): void{
    if(this.turnedRight && this.turnedLeft)  {
      this.resultService.getResult(this.timer);
      this.stopTimer();
    }
  }
}




