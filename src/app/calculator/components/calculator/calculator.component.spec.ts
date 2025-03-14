import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorComponent } from './calculator.component';
import { CalculatorService } from '@/calculator/services/calculator.service';


class MockCalculatorService {
  resultText = jasmine.createSpy('resultText').and.returnValue('123');
  subResultText = jasmine.createSpy('subResultText').and.returnValue('0');
  lastOperator = jasmine.createSpy('lastOperator').and.returnValue('+');
  constructNumber = jasmine.createSpy('constructNumber')
}
// const MockCalculatorService = () => {
//   resultText: jasmine.createSpy('resultText').and.returnValue('123');
//   subResultText: jasmine.createSpy('subResultText').and.returnValue('0');
//   lastOperator: jasmine.createSpy('lastOperator').and.returnValue('+');
//   constructNumber: jasmine.createSpy('constructNumber')
// }


describe('CalculatorComponent', () => {
  let fixture: ComponentFixture<CalculatorComponent>;
  let component: CalculatorComponent;
  let compiled: HTMLElement;
  let mockCalculatorService: MockCalculatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      // agregar mock para modificar segun sea necesario las respuestas
      providers: [{ provide: CalculatorService, useClass: MockCalculatorService }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    mockCalculatorService = TestBed.inject(CalculatorService) as any
    // mockCalculatorService = TestBed.inject(CalculatorService) as unknown as MockCalculatorService;

    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have init values be', () => {
    expect(component.resultText()).toBe('123');
    expect(component.subResultText()).toBe('0');
    expect(component.lastOperator()).toBe('+');
  });

  it('should display calculation values', () => {
    mockCalculatorService.resultText.and.returnValue('100')
    mockCalculatorService.subResultText.and.returnValue('123')
    mockCalculatorService.lastOperator.and.returnValue('-')
    fixture.detectChanges()

    expect(component.resultText()).toBe('100');
    expect(component.subResultText()).toBe('123');
    expect(component.lastOperator()).toBe('-');
  });
  it('should have 19 calculator-button-component', () => {
    const buttons = component.calculatorButtons()

    expect(buttons).toBeTruthy()
    expect(buttons.length).toBe(19)
  });
  it('should have buttons whit content', () => {
    const buttons = compiled.querySelectorAll('app-calculator-button')
    const shouldHaveButtons = ['x', '-', '+', '.', '=', 'C', '+/-', '%', '÷', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    let btnsContent: string[] = []
    buttons.forEach((button) => {
      btnsContent.push(button.textContent?.trim() ?? '')
    });
    shouldHaveButtons.forEach((buttonContent) => {
      expect(btnsContent.includes(buttonContent)).toBeTrue()
    })
  });

  it('should handle keyboard events correctly', () => {
    const eventEnter = new KeyboardEvent('keyup', { key: 'Enter' })

    document.dispatchEvent(eventEnter)

    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('=')
  });
  
  it('should display result text', () => {
    mockCalculatorService.resultText.and.returnValue('100')
    mockCalculatorService.subResultText.and.returnValue('123')
    mockCalculatorService.lastOperator.and.returnValue('-')
    fixture.detectChanges()

    expect(component.resultText()).toBe('100');
    expect(compiled.querySelector('#sub-result')?.textContent).toContain('123 -');
  });

  // it('should ', () => {
  //   expect(component).toBeTruthy();
  // });
});
