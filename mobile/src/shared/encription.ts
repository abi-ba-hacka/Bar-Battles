import { Injectable } from '@angular/core';

import * as CryptoJS from "crypto-js";

@Injectable()
export class EncriptionService {

    private key: string = "banana12345";

    encrypt(data: any) {
        let encrypted = CryptoJS.AES.encrypt(data, this.key).toString();
        console.log("encrypted");
        console.log(encrypted);
        return encrypted;
    }

    decrypt(data: any) {
        let decrypted = CryptoJS.AES.decrypt(data, this.key).toString(CryptoJS.enc.Utf8);
        console.log("decrypted");
        console.log(decrypted);
        return decrypted;
    }
}
