import { ComponentFixture, TestBed } from '@angular/core/testing';

import CalculatorViewComponent from './calculator-view.component';

describe('CalculatorViewComponent', () => {
    let fixture: ComponentFixture<CalculatorViewComponent>;
    let component: CalculatorViewComponent;
    let compiled: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CalculatorViewComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(CalculatorViewComponent);
        component = fixture.componentInstance;
        compiled = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should contain calculator component', () => {
        const calculatorComponent = compiled.querySelector('app-calculator')
        expect(calculatorComponent).toBeTruthy();
    });

    it('should has css clases', () => {
        const mustHaveClases = 'w-screen mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden'.split(' ')
        const divContainer = compiled.querySelector('div')
        const componentClases = divContainer?.classList.value.split(' ')
        
        
        mustHaveClases.forEach((className) => {
            expect(componentClases?.includes(className)).toBeTrue();
        })
    });
});
