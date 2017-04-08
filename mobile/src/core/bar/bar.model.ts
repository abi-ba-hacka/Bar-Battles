import { User } from '../user/user.model';
import { Battle } from '../battle/battle.model';
import { Prize } from '../../shared/models/prize.model';


export class Bar {
  users: User[];
  points: number;
  name: string;
  id: number;
  image: string;
  battle: Battle;
  prizes: Prize[];
  promotions: any[];

  constructor(data: any) {
    this.users = data.users;
    this.points = data.number;
    this.name = data.name;
    this.id = data.id;
    this.image = data.image;
    this.battle = data.battle;
    this.prizes = data.prizes;
    this.promotions = data.promotions;
  }
}
