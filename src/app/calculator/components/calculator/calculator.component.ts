import { Component, computed, ElementRef, HostListener, inject, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from "../calculator-button/calculator-button.component";
import { CalculatorService } from '@/calculator/services/calculator.service';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
  host: {
    '(document:keyup)': 'handleKey($event)'
  }
})
export class CalculatorComponent {

  private calculatorService = inject(CalculatorService)

  resultText = computed(() => this.calculatorService.resultText())
  lastOperator = computed(() => this.calculatorService.lastOperator())
  subResultText = computed(() => this.calculatorService.subResultText())

  public calculatorButtons = viewChildren(CalculatorButtonComponent)

  handleClick(value: string) {
    this.calculatorService.constructNumber(value)
  }

  keyEquivalents: Record<string, string> = {
    Escape: 'C',
    Backspace: 'C',
    Enter: "=",
    '*': "x",
    '/': '÷'
  }

  // @HostListener('document:keyup', ['$event'])
  handleKey(event: KeyboardEvent) {
    const value = event.key

    const keyValue = this.keyEquivalents[value] ?? value
    this.handleClick(keyValue)
    this.calculatorButtons().forEach(button => {
      button.keyboardPressedStyle(keyValue)
    })
  }
}
