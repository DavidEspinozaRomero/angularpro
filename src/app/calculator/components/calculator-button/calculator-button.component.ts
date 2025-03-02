import { Component, HostBinding, input } from '@angular/core';

@Component({
  selector: 'app-calculator-button',
  standalone: true,
  imports: [],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.css',
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400'
  },
})
export class CalculatorButtonComponent {
  isCommand = input(false, {
    transform: (value: string | boolean) => typeof value === "string" ? value === '' : value
  })
  isDoubleSize = input(false, {
    transform: (value: string | boolean) => typeof value === "string" ? value === '' : value
  })

  @HostBinding('class.w-2/4') get doubleSize() {
    return this.isDoubleSize()
  }
}
