import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>
  let compiled: HTMLElement;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLElement;
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have the 'zoneless-calculator' title`, () => {
    expect(app.title).toEqual('zoneless-calculator');
  });

  it('should render router-outlet', () => {
    const tagRouter = compiled.querySelector('router-outlet')
    expect(tagRouter).not.toBeNull()
  });

  it('should has div whit css classes', () => {
    const divRouterWrapper = compiled.querySelector('div')
    const divClasses = divRouterWrapper?.classList.value.split(' ')
    const mustHaveClasess = 'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5'.split(' ')

    expect(divRouterWrapper).not.toBeNull()
    mustHaveClasess.forEach((className) => {
      expect(divClasses?.includes(className)).not.toBeFalse()
    })
  });

  it('should has a tag element', () => {
    const buyMeABeer = compiled.querySelector('a')
    const expectedTitle = "Buy me a beer"
    const expectedHref = "https://www.buymeacoffee.com/scottwindon"

    expect(buyMeABeer).not.toBeFalse()
    expect(buyMeABeer?.title).toBe(expectedTitle)
    expect(buyMeABeer?.getAttribute('href')).toBe(expectedHref)
  });
  // it('should', () => {});
});
