import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-sjtab',
  templateUrl: 'sjtab.page.html',
  styleUrls: ['sjtab.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
})
export class SjtabPage {
  constructor() {}
}
