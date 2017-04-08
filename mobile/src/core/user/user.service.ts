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

  edit(id: string, data: any) {
    return this.http.post(API.users + id, data, this.options)
      .map(res => res.json());
  }
}
