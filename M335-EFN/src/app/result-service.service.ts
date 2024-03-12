import { Injectable } from '@angular/core';
import {sjtabPage} from "./sjtab/sjtab.page";

@Injectable({
  providedIn: 'root'
})
export class ResultServiceService {
schnitzelCounter: number = 0;
potatoCounter: number = 0;
overallTime: number = 0;
timeString: string = '';
tasks: number = 0;
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
    }
    this.tasks++;
    this.setOverallTime(timeTaken);
  }

  setOverallTime(timeTaken: number): void{
    this.overallTime += timeTaken;
    if(this.tasks === 6)
    {
      this.convertTimeToString(this.overallTime);
    }
  }
  convertTimeToString(totalSeconds: number): void {
    const hours: number = Math.floor(totalSeconds / 3600);
    const remainingSeconds: number = totalSeconds % 3600;
    const minutes: number = Math.floor(remainingSeconds / 60);
    const seconds: number = remainingSeconds % 60;

    const hoursString: string = String(hours).padStart(2, '0');
    const minutesString: string = String(minutes).padStart(2, '0');
    const secondsString: string = String(seconds).padStart(2, '0');

    this.timeString = `${hoursString}:${minutesString}:${secondsString}`;
  }
}
