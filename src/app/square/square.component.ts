import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  template: `
    <button mat-button class="init" *ngIf="!value && (flag ==  null)">{{ value }}</button>
    <button mat-flat-button [disabled]="flag" class="disa" *ngIf="flag && (value == null)">{{ value }}</button>
    <button mat-button class="disa" color = "warn" *ngIf="value == 'X'">{{ value }}</button>
    <button mat-button class="disa" color = "primary" *ngIf="value == 'O'">{{ value }}</button>
  `,
  styles: ['button { width: 100%; height: 100%; font-size: 5em !important;}','.init{background-color: #1f1d40 ;}','.disa{background-color: #27254f;}',]
})
export class SquareComponent  {

  @Input() value: 'X' | 'O';
  @Input() flag: string;

}
