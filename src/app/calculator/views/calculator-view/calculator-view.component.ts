import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalculatorButtonComponent } from "../../components/calculator-button/calculator-button.component";
import { CalculatorComponent } from "../../components/calculator/calculator.component";

@Component({
  selector: 'app-calculator-view',
  standalone: true,
  imports: [CalculatorComponent],
  templateUrl: './calculator-view.component.html',
  styleUrl: './calculator-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class CalculatorViewComponent {

}
