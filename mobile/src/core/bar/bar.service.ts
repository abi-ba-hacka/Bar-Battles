import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/observable/forkJoin';

import { Observable } from 'rxjs';
import { API } from '../../environments/environment';

@Injectable()
export class BarService {
  headers = new Headers({ 'Content-Type': 'application/json' });
  options = new RequestOptions({ headers: this.headers });

  constructor(
    private http: Http,
  ) {

  }

  getBar(id: string) {
    return this.http.get(API.bars + id)
      .map(res => res.json());
  }

  getBars(ids: string[]) {
    return Observable.forkJoin(
      ids.map(id => {
        return this.getBar(id);
      })
    )
  }

}
