import { Injectable } from '@angular/core';
import {sjtabPage} from "./sjtab/sjtab.page";

@Injectable({
  providedIn: 'root'
})
export class ResultServiceService {
schnitzelCounter: number = 0;
potatoCounter: number = 0;
overallTime: number = 0;
name: string = '';
  constructor() { }

  getResult(timeTaken: number): void {
    if(timeTaken <= 30)
    {
      this.schnitzelCounter++;
      console.log(this.schnitzelCounter);
    }
    else  {
      this.schnitzelCounter++;
      this.potatoCounter++;
      console.log('potato');
    }
    this.setOverallTime(timeTaken);
  }

  setOverallTime(timeTaken: number): void{
    this.overallTime += timeTaken;
    console.log(this.overallTime);
  }
}
