import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {Router} from "@angular/router";

@Component({
  selector: 'app-aufgabe3',
  templateUrl: './aufgabe3.page.html',
  styleUrls: ['./aufgabe3.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Aufgabe3Page{

  constructor(private router: Router) {}

  async goToExercise4(){
    this.router.navigateByUrl("/aufgabe4");
  }





}
