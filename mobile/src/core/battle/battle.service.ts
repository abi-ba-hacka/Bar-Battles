import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/observable/forkJoin';

import { Observable } from 'rxjs';
import { API } from '../../environments/environment';

@Injectable()
export class BattleService {

  constructor(
    private http: Http
  ) {

  }

  getBattle(id: string) {
    return this.http.get(API.battles + id)
      .map(res => res.json());
  }
}
