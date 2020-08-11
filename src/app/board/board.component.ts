import { Component, OnInit } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

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
        style({opacity: 0, transform: 'translateY(0)'}),
        animate('500ms 0s ease-in')
      ]),
      transition('rest => final', [
        animate('200ms')
      ]),
      transition('final => rest', [
        animate('200ms')
      ])
    ]),
  ]})

export class BoardComponent implements OnInit {
  squares: string[];
  xIsNext: boolean;
  winner: string;
  draw: string;
  count: number;
  currentState = 'rest';

  constructor() { }

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
    this.currentState = "rest"
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number) {
    if (!this.squares[idx]) {
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }
    this.winner = this.calculateWinner();

  }

  calculateWinner() {
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
    if ((this.squares.every(x => x != null))) {
      this.currentState = "final";
      return 'draw';
    }
    return null;
  }

}


