import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-lbtab',
  templateUrl: 'lbtab.page.html',
  styleUrls: ['lbtab.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent]
})
export class LbtabPage {

  constructor() {}

}
