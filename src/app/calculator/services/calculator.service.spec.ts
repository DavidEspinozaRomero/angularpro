import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should has constructNumber()', () => {
    expect(typeof service.constructNumber).toBe('function')
  });

  it('should has calculateResult()', () => {
    expect(typeof service.calculateResult).toBe('function')
  });

  it('should have default values', () => {
    let { lastOperator, resultText, subResultText } = service
    expect(lastOperator()).toBe('+')
    expect(resultText()).toBe('0')
    expect(subResultText()).toBe('0')
  });

  it('should lastOperator, resultText be "0" ', () => {
    service.lastOperator.set('+')
    service.resultText.set('7')
    service.subResultText.set('3')

    service.constructNumber('C')

    expect(service.resultText()).toBe('0')
    expect(service.subResultText()).toBe('0')
    expect(service.lastOperator()).toBe('+')
  });

  it('should update resultText whit number input', () => {
    service.constructNumber('1')
    expect(service.resultText()).toBe('1')

    service.constructNumber('2')
    expect(service.resultText()).toBe('12')
  });

  it('should handle operators correctly', () => {
    service.constructNumber('1')
    service.constructNumber('-')

    expect(service.lastOperator()).toBe('-')
    expect(service.subResultText()).toBe('1')
    expect(service.resultText()).toBe('0')
  });

  it('should calculate result correctly for addition', () => {
    service.constructNumber('1')
    service.constructNumber('+')
    service.constructNumber('2')
    service.constructNumber('=')

    expect(service.resultText()).toBe('3')
  });

  it('should calculate result correctly for substraction', () => {
    service.constructNumber('1')
    service.constructNumber('0')
    service.constructNumber('-')
    service.constructNumber('4')
    service.constructNumber('=')

    expect(service.resultText()).toBe('6')
  });

  it('should calculate result correctly for multiplication', () => {
    service.constructNumber('1')
    service.constructNumber('0')
    service.constructNumber('*')
    service.constructNumber('4')
    service.constructNumber('=')

    expect(service.resultText()).toBe('40')
  });

  it('should calculate result correctly for division', () => {
    service.constructNumber('1')
    service.constructNumber('0')
    service.constructNumber('/')
    service.constructNumber('5')
    service.constructNumber('=')

    expect(service.resultText()).toBe('2')
  });

  it('should handle decimal point correctly', () => {
    service.constructNumber('1')
    service.constructNumber('.')
    service.constructNumber('5')

    expect(service.resultText()).toBe('1.5')
    service.constructNumber('.')
    expect(service.resultText()).toBe('1.5')
  });
  it('should handle decimal point correctly starting whit 0', () => {
    service.constructNumber('0')
    service.constructNumber('.')
    service.constructNumber('.')
    service.constructNumber('0')

    expect(service.resultText()).toBe('0.0')
  });
  it('should handle special operator "+/-" correctly', () => {
    service.constructNumber('5')
    service.constructNumber('+/-')

    expect(service.resultText()).toBe('-5')
  });

  it('should handle special operator "Backspace" correctly', () => {
    service.constructNumber('4')
    service.constructNumber('2')
    service.constructNumber('1')
    expect(service.resultText()).toBe('421')

    service.constructNumber('Backspace')
    expect(service.resultText()).toBe('42')

    service.constructNumber('Backspace')
    expect(service.resultText()).toBe('4')

    service.constructNumber('Backspace')
    expect(service.resultText()).toBe('0')

  });
  it('should handle max 10 digits correctly', () => {

    for (let index = 0; index < 10; index++) {
      service.constructNumber('1')
    }
    expect(service.resultText().length).toBe(10)


    service.constructNumber('0')
    expect(service.resultText().length).toBe(10)

  });
  // it('should handle special operator "%" correctly', () => {
  //   service.constructNumber('4')
  //   service.constructNumber('%')
  //   service.constructNumber('2')

  //   expect(service.resultText()).toBe('0')
  // });

  // it('should be created', () => {});
});
