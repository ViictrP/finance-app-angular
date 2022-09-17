import {ButtonComponent} from './button.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent]
    });
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  });

  it('Should be created', () => {
    expect(component).toBeTruthy();
  });

  it('Should call on click', () => {
    const mock = {emit: jest.fn()};
    component.clickEvent = mock as any;
    component.onClick();

    expect(mock.emit).toHaveBeenCalled();
  });
});
