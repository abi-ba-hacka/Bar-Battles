import { Component } from '@angular/core';

@Component({
  selector: 'bar-tab',
  templateUrl: './bar-tab.component.html'
})

export class BarTabComponent {
    private battleStarted: boolean = true;

    private barName: string = 'Refugio Callao y Viamonte';
    private barLocation: string = 'Callao y Viamonte, Buenos Aires';
    private barImage: string = 'http://i.imgur.com/w3QXWgc.png';

    private opponentBarName: string = 'Circuito Chico Km 24.7';
    private opponentBarLocation: string = 'Callao y Viamonte, Buenos Aires';
    private opponentBarImage: string = 'http://i.imgur.com/oRhjO6O.png';
}
