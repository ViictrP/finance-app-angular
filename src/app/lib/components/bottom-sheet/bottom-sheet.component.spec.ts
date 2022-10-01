import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BottomSheetComponent} from './bottom-sheet.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {IconButtonComponent} from '../buttons/icon-button.component';

describe('BottomSheetComponent', () => {
  let component: BottomSheetComponent;
  let fixture: ComponentFixture<BottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BottomSheetComponent, IconButtonComponent],
      imports: [NoopAnimationsModule]
    });

    fixture = TestBed.createComponent(BottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should be created', () => {
    expect(component).toBeTruthy();
  });
});
