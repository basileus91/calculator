import {Component} from '@angular/core';
import {RandomNumberService} from './random-number.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-calculator-app';
  subDisplayText = '';
  mainDisplayText = '';
  operand1: number = null;
  operand2: number = null;
  operator = '';
  calculationString = '';
  // This string  denotes the operation being performed
  answered = false;
  //  flag to check whether the solution has been processed
  operatorSet = false;
  lastExpression = [];

  constructor(private readonly randomNumberService: RandomNumberService) {
  }

  pressKey(key: string): void {
    if (key === '/' || key === 'x' || key === '-' || key === '+') {
      const lastKey = this.mainDisplayText[this.mainDisplayText.length - 1];
      if (lastKey === '/' || lastKey === 'x' || lastKey === '-' || lastKey === '+') {
        this.operatorSet = true;
      }
      if ((this.operatorSet) || (this.mainDisplayText === '')) {
        return;
      }
      this.operand1 = parseFloat(this.mainDisplayText);
      this.operator = key;
      this.operatorSet = true;
    }
    if (this.mainDisplayText.length === 10) {
      return;
    }
    this.mainDisplayText += key;
  }

  allClear(): void {
    this.mainDisplayText = '';
    this.subDisplayText = '';
    this.operatorSet = false;
    this.answered = false;
    this.operand1 = null;
    this.operand2 = null;
  }

  getAnswer(): void {
    this.calculationString = this.mainDisplayText;
    // tslint:disable-next-line:no-eval
    console.log(eval('3+4+6'));
    this.operand2 = parseFloat(this.mainDisplayText.split(this.operator)[1]);
    if (this.operator === '/') {
      // tslint:disable-next-line:no-eval
      this.mainDisplayText = eval(String(this.operand1 / this.operand2)).toString();
      if (this.mainDisplayText.length > 9) {
        this.mainDisplayText = this.mainDisplayText.substr(0, 9);
      }
      this.lastExpression.push(this.operand1 + ' / ' + this.operand2 + ' = ' + (this.operand1 / this.operand2));
    } else if (this.operator === 'x') {
      // this.mainDisplayText = (this.operand1 * this.operand2).toString();
      // tslint:disable-next-line:no-eval
      this.mainDisplayText = eval(String(this.operand1 * this.operand2)).toString();
      this.lastExpression.push(this.operand1 + ' * ' + this.operand2 + ' = ' + (this.operand1 * this.operand2));
      if (this.mainDisplayText.length > 9) {
        this.mainDisplayText = 'ERROR';
        this.subDisplayText = 'Range Exceeded';
      }
    } else if (this.operator === '-') {
      // this.mainDisplayText = (this.operand1 - this.operand2).toString();
      // tslint:disable-next-line:no-eval
      this.mainDisplayText = eval(String(this.operand1 - this.operand2)).toString();
      this.lastExpression.push(this.operand1 + ' - ' + this.operand2 + ' = ' + (this.operand1 - this.operand2));
    } else if (this.operator === '+') {
      // this.mainDisplayText = (this.operand1 + this.operand2).toString();
      // tslint:disable-next-line:no-eval
      this.mainDisplayText = eval(String(this.operand1 + this.operand2)).toString();
      this.lastExpression.push(this.operand1 + ' + ' + this.operand2 + ' = ' + (this.operand1 + this.operand2));
      if (this.mainDisplayText.length > 9) {
        this.mainDisplayText = 'ERROR';
        this.subDisplayText = 'Range Exceeded';
      }
    } else {
      this.subDisplayText = 'ERROR: Invalid Operation';
    }
    this.answered = true;
  }

  rand(): void {
    this.randomNumberService.getRandomNumber().subscribe(
      (generatedNumber: number) => {
          this.mainDisplayText += generatedNumber;
        }
    );
  }
}
