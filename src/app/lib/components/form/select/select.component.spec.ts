import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SelectComponent} from './select.component';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectComponent]
    });

    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
  });

  it('Should be created', () => {
    expect(component).toBeTruthy();
  });
});
