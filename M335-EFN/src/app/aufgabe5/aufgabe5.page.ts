import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {Router} from "@angular/router";

@Component({
  selector: 'app-aufgabe5',
  templateUrl: './aufgabe5.page.html',
  styleUrls: ['./aufgabe5.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Aufgabe5Page implements OnInit{
  turnedRight: boolean = false;
  turnedLeft: boolean = false;

  ngOnInit() {
    window.addEventListener('orientationchange', this.checkOrientation);
  }
  constructor(private router: Router) {
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
  }
}




