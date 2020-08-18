import { Component, OnInit, Input } from '@angular/core';
import { ScoreTransService } from '../score-trans.service';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.scss']
})

export class ScoreBoardComponent implements OnInit {

  Score: [number, number];


  constructor(private ScoreData: ScoreTransService) { }

  ngOnInit() {
    this.ScoreData.currentScore.subscribe(Xwin => this.Score = Xwin);
  }

}
