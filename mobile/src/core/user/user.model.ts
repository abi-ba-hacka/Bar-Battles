import { Prize } from '../../shared/models/prize.model';
import { Beer } from '../../shared/models/beer.model';

export class User {
  id: number;
  name: string;
  points: number;
  prizes: Prize[];
  beers: Beer[];
  facebook: {
    id: number,
    name: string,
    token: string
  }

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name
    this.points = data.points;
    this.prizes = data.prizes;
    this.beers = data.beers;
    this.facebook = data.facebook;
  }
}
