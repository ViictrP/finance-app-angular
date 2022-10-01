import {ComponentFixture, TestBed} from '@angular/core/testing';
import {IconButtonComponent} from './icon-button.component';

describe('IconButtonComponent', () => {
  let component: IconButtonComponent;
  let fixture: ComponentFixture<IconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IconButtonComponent]
    });

    fixture = TestBed.createComponent(IconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should be created', () => {
    expect(component).toBeTruthy();
  });
});
