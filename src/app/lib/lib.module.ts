import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {InputComponent} from './components/form/input/input.component';
import {FormModule} from '../form.module';
import {ButtonComponent} from './components/buttons/button.component';
import {CommonModule} from '@angular/common';
import {LoadingButtonComponent} from './components/buttons/loading-button.component';
import {CardComponent} from './components/card/card.component';
import {ChipComponent} from './components/chip/chip.component';
import {ObservableDirective} from './directives/observable.directive';
import {IconButtonComponent} from './components/buttons/icon-button.component';
import {BottomSheetComponent} from './components/bottom-sheet/bottom-sheet.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    LoadingButtonComponent,
    CardComponent,
    ChipComponent,
    ObservableDirective,
    IconButtonComponent,
    BottomSheetComponent,
  ],
  imports: [FormModule, CommonModule, BrowserAnimationsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    InputComponent,
    ButtonComponent,
    LoadingButtonComponent,
    CardComponent,
    ChipComponent,
    ObservableDirective,
    IconButtonComponent,
    BottomSheetComponent
  ]
})
export class LibModule {

}
