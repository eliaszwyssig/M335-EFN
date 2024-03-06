import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {Router} from "@angular/router";

@Component({
  selector: 'app-aufgabe4',
  templateUrl: './aufgabe4.page.html',
  styleUrls: ['./aufgabe4.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Aufgabe4Page {

  constructor(private router: Router) {}


  async goToExercise5(){
    this.router.navigateByUrl("/aufgabe5");
  }
}
