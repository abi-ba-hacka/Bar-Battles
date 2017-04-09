import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/observable/forkJoin';

import { Observable } from 'rxjs';
import { API } from '../../environments/environment';


@Injectable()
export class UserService {
  headers = new Headers({ 'Content-Type': 'application/json' });
  options = new RequestOptions({ headers: this.headers });

  constructor(
    private http: Http
  ) {

  }

  getUserByFacebookId(id: string) {
    return this.http.get(API.users + 'facebook/' + id)
      .map(res => res.json());
  }

  getUser(id: string) {
    return this.http.get(API.users + id)
      .map(res => res.json());
  }

  edit(id: string, data: any) {
    return this.http.post(API.users + id, data, this.options)
      .map(res => res.json());
  }

  redeemQR(id: string, code: string) {
    return this.http.post(API.redeem, {userId: id, qrcode: code}, this.options)
      .map(res => res.json());
  }

  encrypt(data: any) {
    return this.http.post('https://6aed40e1.ngrok.io/encrypt/', {data}, this.options)
      .map(res => res.json());
  }

  getUsers(data: any) {
    return this.http
      .post(API.bar + 'users/', data, this.options)
      .map(res => res.json());
  }

  sendPrize(data: any) {
    return this.http
      .post(API.prize + 'send', data, this.options)
      .map(res => res.json());
  }
}
