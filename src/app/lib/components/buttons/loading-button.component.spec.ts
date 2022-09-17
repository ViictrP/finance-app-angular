import {LoadingButtonComponent} from './loading-button.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';

describe('LoadingButtonComponent', () => {
  let component: LoadingButtonComponent;
  let fixture: ComponentFixture<LoadingButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadingButtonComponent]
    });
    fixture = TestBed.createComponent(LoadingButtonComponent);
    component = fixture.componentInstance;
  });

  it('Should be created', () => {
    expect(component).toBeTruthy();
  });

  it('Should call output event on click', () => {
    const mock = {emit: jest.fn()};
    component.clickEvent = mock as any;
    component.onClick();

    expect(mock.emit).toHaveBeenCalled();
  });
});
