import { Bar } from '../bar/bar.model';

export class Battle {
  bars: Bar[];
  start: "TIMESTAMP";
  end: "TIMESTAMP";
  points: number;
  log: any[]; //BattleAction

  constructor(data: any) {
    this.bars = data.bars;
    this.start = data.start;
    this.end = data.end;
    this.points = data.points;
    this.log = data.log;
  }
}
