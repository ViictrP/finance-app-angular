import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {InputComponent} from './components/form/input/input.component';
import {FormModule} from '../form.module';
import {NgIf} from '@angular/common';

@NgModule({
  declarations: [InputComponent],
  imports: [FormModule, NgIf],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [InputComponent]
})
export class LibModule {

}
