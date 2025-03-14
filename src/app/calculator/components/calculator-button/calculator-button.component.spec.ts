import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CalculatorButtonComponent } from './calculator-button.component';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [CalculatorButtonComponent],
  template: `
  <app-calculator-button>
    <span class="projected-content underline"> Test content</span>
  </app-calculator-button>
  `
})
class TestHostComponent { }

describe('CalculatorButtonComponent', () => {
  let fixture: ComponentFixture<CalculatorButtonComponent>;
  let component: CalculatorButtonComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorButtonComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CalculatorButtonComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply w-1/4 if doubleSize is false', () => {
    const hostCssClasses = compiled.classList.value.split(' ')

    expect(hostCssClasses).toContain('w-1/4')
    expect(component.isDoubleSize()).toBeFalse()
  });

  it('should apply w-2/4 if doubleSize is true', () => {
    fixture.componentRef.setInput('isDoubleSize', true)
    fixture.detectChanges()
    const hostCssClasses = compiled.classList.value.split(' ')

    expect(hostCssClasses).toContain('w-2/4')
    expect(component.isDoubleSize()).toBeTrue()
  });

  it('should emit onClick when handleClick is called', () => {
    spyOn(component.onClick, 'emit')
    component.handleClick()
    expect(component.onClick.emit).toHaveBeenCalled()
  })

  it('should set isPressed to true, when keyboardPressedStyle is called', (done) => {
    component.contentValue()!.nativeElement.innerText = '1'
    component.keyboardPressedStyle('1')
    expect(component.isPressed()).toBeTrue()

    setTimeout(() => {
      expect(component.isPressed()).toBeFalse()
      done()
    }, 210);

  })
  it('should not set isPressed to true, if key is not match', () => {
    component.contentValue()!.nativeElement.innerText = '2'
    component.keyboardPressedStyle('1')
    expect(component.isPressed()).toBeFalse()
  })

  it('should display projected content', () => { 
    const testHostFixture = TestBed.createComponent(TestHostComponent)
    const compiled:HTMLElement = testHostFixture.nativeElement

    expect(compiled.querySelector('.projected-content')).toBeTruthy()
  })
});
