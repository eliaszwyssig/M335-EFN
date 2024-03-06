import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-lbtab',
  templateUrl: 'lbtab.page.html',
  styleUrls: ['lbtab.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent]
})
export class lbtabPage {

  constructor() {}
}

