import {ComponentFixture, TestBed} from '@angular/core/testing';
import {InputDateComponent} from './input-date.component';

describe('InputDateComponent', () => {
  let component: InputDateComponent;
  let fixture: ComponentFixture<InputDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputDateComponent]
    });

    fixture = TestBed.createComponent(InputDateComponent);
    component = fixture.componentInstance;
  });

  test('Should create', () => {
    expect(component).toBeTruthy();
  });
});
