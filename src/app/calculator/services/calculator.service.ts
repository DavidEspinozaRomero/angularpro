import { Injectable, signal } from '@angular/core';

const numbers = ['0', '1', '2', , '3', '4', '5', '6', '7', '8', '9']
const operators = ['+', '-', '*', '/', '÷', 'x']
const specialOpertors = ['+/-', '%', 'Backspace', 'C', '=', '.']

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  public resultText = signal("0")
  public subResultText = signal("0")
  public lastOperator = signal("+")

  constructNumber(value: string): void {
    //Validar input
    if (![...numbers, ...operators, ...specialOpertors].includes(value)) {
      console.log('invalid input:' + value);
    }

    // =
    if (value === "=") {
      console.log('calcular resultado');
      this.calculateResult();
      return;
    }

    //  C
    if (value === "C") {
      this.resultText.set("0")
      this.subResultText.set("0")
      this.lastOperator.set("+")
      return
    }

    // Backspace
    // Todo: considerar numeros negativos
    if (value === "Backspace") {
      if (this.resultText() === '0') return;
      if (this.resultText().length === 2 && this.resultText().includes('-')) {
        this.resultText.set('0')
        return;
      };
      if (this.resultText().length === 1) {
        this.resultText.set('0')
        return;
      };
      this.resultText.update(currentValue => currentValue.slice(0, -1))
      return;

    }

    // aplicar operador
    if (operators.includes(value)) {
      this.lastOperator.set(value)
      this.subResultText.set(this.resultText())
      this.resultText.set('0')
      return;
    }

    // Maximo de 10 digitos
    if (this.resultText().length > 10) {
      console.log('Max digits reach');
      return
    };

    // validar punto decimal
    if (value === '.') {
      if (this.resultText().includes('.')) return;

      this.resultText.update(currentValue => currentValue + '.')
      return;
    }

    // Manejo del cero inicial
    if (value === '0' && (this.resultText() === '0' || this.resultText() === '-0')) {
      return;
    }

    // Cambiar el signo
    if (value === '+/-') {
      if (this.resultText().includes('-')) {
        this.resultText.update(currentValue => currentValue.replace('-', ''))
        return;
      }
      this.resultText.update(currentValue => `-${currentValue}`)
      return;
    }

    // Numeros
    this.resultText.update(currentValue => {
      if (currentValue.includes('-0')) {
        return '-' + value
      }
      if (currentValue.includes('0')) return value;

      return currentValue + value
    })
  }

  calculateResult() {
    let result = 0;
    const number1 = parseFloat(this.subResultText());
    const number2 = parseFloat(this.resultText());

    switch (this.lastOperator()) {
      case "+":
        result = number1 + number2
        break;
      case "-":
        result = number1 - number2
        break;
      case "x":
        result = number1 * number2
        break;
      case "*":
        result = number1 * number2
        break;
      case "÷":
        result = number1 / number2
        break;
      case "/":
        result = number1 / number2
        break;
      // case "%":
      //   result = this.porcentaje(number1, number2);
      //   break;
      default:
        console.log('cant calculate');

    }
    this.subResultText.set("0");
    this.resultText.set(result.toString())
    return
  }

}
