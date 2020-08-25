import { Component, OnInit, Input } from '@angular/core';
import { ScoreTransService } from '../score-trans.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.scss'],
  animations: [
    trigger('kickoff', [
      state("nomove", style({
        opacity: 1
      })),
      state("clutch", style({
        opacity: 0
      })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(1000)
      ]),
      transition('nomove => clutch', [
        animate(1000, style({ opacity: 0 })),
      ]),
    ]),
  ]
})

export class ScoreBoardComponent implements OnInit {

  Score: [number, number];
  Active: boolean;

  checkActive() {
    if (this.Score != undefined) {
      this.Active = true;
    }
  }

  constructor(private ScoreData: ScoreTransService) {}

  ngOnInit() {
    this.ScoreData.currentScore.subscribe(Xwin => this.Score = Xwin);
  }
}
