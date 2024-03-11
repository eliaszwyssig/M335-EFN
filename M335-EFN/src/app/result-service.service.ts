import { Injectable } from '@angular/core';
import {sjtabPage} from "./sjtab/sjtab.page";

@Injectable({
  providedIn: 'root'
})
export class ResultServiceService {
schnitzelCounter: number = 0;
potatoCounter: number = 0;
overallTime: number = 0;
tasks: number = 0;
name: string = '';
  constructor() { }

  getResult(timeTaken: number): void {
    this.tasks++;
    this.setOverallTime(timeTaken);

    if(timeTaken <= 3)
    {
      this.schnitzelCounter++;
    }
    else {
      this.schnitzelCounter++
      this.potatoCounter++;
    }

  }

  setOverallTime(timeTaken: number): void{
    this.overallTime + timeTaken;
  }
}
