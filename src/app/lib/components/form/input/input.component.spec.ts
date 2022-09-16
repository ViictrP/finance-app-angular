import {ComponentFixture, TestBed} from '@angular/core/testing';
import {InputComponent} from './input.component';
import {FormsModule} from '@angular/forms';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputComponent],
      imports: [FormsModule]
    });

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    component.onChange('');
    component.onTouched();
    expect(component).toBeTruthy();
  });

  it('Should write the value', () => {
    component.writeValue('Test');
    expect(component.value).toStrictEqual('Test');
  });

  it('Should disable the input', () => {
    component.setDisabledState(true);
    expect(component.disabled).toBeTruthy();
  });

  it('Should call onChange and mark input as touched when value changed', () => {
    const onChangeFn = jest.fn();
    const onTouchFn = jest.fn();
    component.value = 'Test';
    component.registerOnChange(onChangeFn);
    component.registerOnTouched(onTouchFn);
    component.valueChanged();

    expect(onChangeFn).toHaveBeenCalledWith('Test');
    expect(onTouchFn).toHaveBeenCalled();
    expect(component.touched).toBeTruthy();
  });

  it('Should clear the value', () => {
    const onChangeFn = jest.fn();
    const onTouchFn = jest.fn();
    component.value = 'Test';
    component.registerOnChange(onChangeFn);
    component.registerOnTouched(onTouchFn);
    component.clear();

    expect(onChangeFn).toHaveBeenCalledWith('');
    expect(onTouchFn).toHaveBeenCalled();
    expect(component.value).toStrictEqual('');
  });
});
