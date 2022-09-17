import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {InputComponent} from './components/form/input/input.component';
import {FormModule} from '../form.module';
import {ButtonComponent} from './components/buttons/button.component';
import {CommonModule} from '@angular/common';
import {LoadingButtonComponent} from './components/buttons/loading-button.component';

@NgModule({
  declarations: [InputComponent, ButtonComponent, LoadingButtonComponent],
  imports: [FormModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [InputComponent, ButtonComponent, LoadingButtonComponent]
})
export class LibModule {

}
