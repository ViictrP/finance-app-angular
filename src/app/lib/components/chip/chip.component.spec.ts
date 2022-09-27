import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ChipComponent} from './chip.component';

describe('ChipComponent', () => {
  let component: ChipComponent;
  let fixture: ComponentFixture<ChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChipComponent]
    });

    fixture = TestBed.createComponent(ChipComponent);
    component = fixture.componentInstance;
  });

  it('Should create the component', () => {
    expect(component).toBeTruthy();
  });
});
