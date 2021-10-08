import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { ScoreTransService } from '../score-trans.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  animations: [
    trigger('faderino', [
      state("rest", style({
        opacity: 1
      })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(250)
      ]),
    ]),

    trigger('drop', [
      state("rest", style({
        opacity: 1,
        transform: 'translateY(-15%)'
      })),
      state("final", style({
        opacity: 0.75,
        transform: 'translateY(-5%)'
      })),
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(0)' }),
        animate('500ms 0s ease-in')
      ]),
      transition('rest => final', [
        animate('200ms')
      ]),
      transition('final => rest', [
        animate('200ms')
      ])
    ]),
  ]
})

export class BoardComponent implements OnInit {
  squares: string[];
  xIsNext: boolean;
  winner: string;
  draw: string;
  count: number;
  currentState = 'rest';
  Xwins: number;
  Ywins: number;
  Score: [number, number];
  mode: boolean;
  min: number;
  max: number;
  disableSinglePlayerToggle = false;
  disableHumanPlayerInteraction = false;

  constructor(private ScoreData: ScoreTransService) { }


  ngOnInit() {

    this.ScoreData.currentScore.subscribe(Xwins => this.Score = Xwins);
    this.resetScr();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
    this.currentState = "rest";
    this.disableSinglePlayerToggle = false;
  }

  resetScr() {
    this.Xwins = 0;
    this.Ywins = 0;
    this.Score = [this.Xwins, this.Ywins];
    this.ScoreData.changeScore(this.Score);
    this.newGame();
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  Smove() { //Calculates for computer moves in one of 2 ways
    let idx = this.rnd(0, 8);
    if (!this.squares[idx]) { //random
      this.xIsNext = !(this.xIsNext);
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !(this.xIsNext);
    }
    else {
      for (let i = 0; i < 9; i++) {  //sequential
        if (this.squares[i] == null) {
          this.xIsNext = !(this.xIsNext);
          this.squares.splice(i, 1, this.player);
          this.xIsNext = !(this.xIsNext);
          break;
        }
      }
    }
  }

  rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min); //RNG
  }

  checkGameOver() {
    this.winner = this.calculateWinner();
    if (this.winner == 'X') {
      this.Xwins++;
      this.Score = [this.Xwins, this.Ywins];
      this.ScoreData.changeScore(this.Score);
    }
    else if (this.winner == 'O') {
      this.Ywins++;
      this.Score = [this.Xwins, this.Ywins];
      this.ScoreData.changeScore(this.Score);
    }

  }

  makeMove(idx: number) {
    this.disableSinglePlayerToggle = true;
    if (!this.squares[idx]) {
      this.squares.splice(idx, 1, this.player);
      if (this.xIsNext == true && this.mode == true) {//LOGIC for the SINGLE player based on mode and current player
        const COMPUTER_TURN_DELAY = 750; // 500;

        this.checkGameOver();

        if (!this.winner) {
          this.disableHumanPlayerInteraction = true;

          setTimeout(()=> {
            this.Smove();
            this.disableHumanPlayerInteraction = false;
          }, COMPUTER_TURN_DELAY)
        }
      }
      else {
        this.xIsNext = !(this.xIsNext); // 2 player outcome
        this.checkGameOver();
      }
    }

  }

  calculateWinner() { //winner calculator
    this.count++;
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      //const [d, e, f, g, h, j, k, l, m] = draw[0];
      let x;
      if (
        (this.squares[a] &&
          this.squares[a] === this.squares[b] &&
          this.squares[a] === this.squares[c])
      ) {
        x = 5;
        this.currentState = "final";
        return this.squares[a];
      }
    }
    if ((this.squares.every(x => x != null))) { //DRAW condition!
      this.currentState = "final";
      return 'draw';
    }
    return null;
  }

}


