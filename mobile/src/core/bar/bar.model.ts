import { User } from '../user/user.model';
import { Battle } from '../battle/battle.model';
import { Prize } from '../../shared/models/prize.model';


export class Bar {
  users: User[];
  points: number;
  name: string;
  id: string;
  image: string;
  battles: Battle[];
  activeBattle: Battle;
  prizes: Prize[];
  promotions: any[];
  location: string;

  constructor(data: any) {
    this.users = data.users;
    this.points = data.number;
    this.name = data.name;
    this.id = data.id;
    this.image = data.image;
    this.battles = data.battles;
    this.activeBattle = data.activeBattle;
    this.prizes = data.prizes;
    this.promotions = data.promotions;
    this.location = data.location;
  }
}
