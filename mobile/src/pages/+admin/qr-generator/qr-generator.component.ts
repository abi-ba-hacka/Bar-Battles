import { Component } from '@angular/core';

@Component({
  selector: 'qr-generator',
  templateUrl: './qr-generator.component.html'
})

export class QRGeneratorPageComponent {

    data: string;

    generate() {
        this.data = "U2FsdGVkX19OvCYiQriKXUOXJuIPn7ZOjf24VAesioQ=";
        // TODO Should be this
        // this.data = EncryptionService.encrypt(this.qrData);
    }
}
