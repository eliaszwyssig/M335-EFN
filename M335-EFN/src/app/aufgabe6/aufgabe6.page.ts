import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {addIcons} from "ionicons";
import { Network,  } from '@capacitor/network';
import {ResultServiceService} from "../result-service.service";
import {wifiSharp} from "ionicons/icons";
import {Router} from "@angular/router";



@Component({
  selector: 'app-aufgabe6',
  templateUrl: './aufgabe6.page.html',
  styleUrls: ['./aufgabe6.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Aufgabe6Page implements OnInit{
  isConnectedToWifi = false;
  isDisconnectedToWifi: boolean = false;
  timer: any;
  sec: number = 0;

  constructor(private router: Router, private resultService: ResultServiceService) {
    addIcons({ wifiSharp });
    this.checkWifiConnection();
    setInterval(() => this.checkWifiConnection(), 5000);
    ;
  }
  ngOnInit() {this.startTimer();
  }

  async checkWifiConnection() {
    const status = await Network.getStatus();
    if (status.connected && status.connectionType === 'wifi') {
      this.isConnectedToWifi = true;
    } else {
      this.isDisconnectedToWifi = true;
    }
    if(this.isConnectedToWifi && this.isDisconnectedToWifi) {
      this.isSuccessfull();
    }
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
    if (this.isDisconnectedToWifi && this.isConnectedToWifi){this.stopTimer();
    this.resultService.getResult(this.sec);

    }
  }

  async goToResults(){
    this.router.navigateByUrl("/resultat");
  }


}
