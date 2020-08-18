import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ScoreTransService {

  Score: [number, number];
  private ScoreData = new BehaviorSubject(this.Score);
  currentScore = this.ScoreData.asObservable();

  constructor() { }

  changeScore(bruh: [number, number]) {
    this.ScoreData.next(bruh);
  }
}
