import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { InputComponent } from './components/form/input/input.component';
import { FormModule } from '../form.module';
import { ButtonComponent } from './components/buttons/button.component';
import { CommonModule } from '@angular/common';
import { LoadingButtonComponent } from './components/buttons/loading-button.component';
import { CardComponent } from './components/card/card.component';
import { ChipComponent } from './components/chip/chip.component';
import { ObservableDirective } from './directives/observable.directive';
import { IconButtonComponent } from './components/buttons/icon-button.component';
import { BottomSheetComponent } from './components/bottom-sheet/bottom-sheet.component';
import { SelectComponent } from './components/form/select/select.component';
import { InputDateComponent } from './components/form/input/input-date.component';
import { ModalComponent } from './components/modal/modal.component';
import { CategoryPipe } from './components/pipes/category.pipe';
import { CommonTransactionFormComponent } from './components/form/transaction/common-transaction-form.component';
import { SwitchComponent } from './components/form/switch/switch.component';
import { WebViewService } from './service/web-view.service';
import { TransactionListComponent } from './components/misc/transaction-list.component';
import { ToasterComponent } from './components/toaster/toaster.component';
import { ToastComponent } from './components/toaster/toast.component';
import { ToastService } from './components/toaster/toast.service';

const components = [
  InputComponent,
  ButtonComponent,
  LoadingButtonComponent,
  CardComponent,
  ChipComponent,
  ObservableDirective,
  IconButtonComponent,
  BottomSheetComponent,
  SelectComponent,
  InputDateComponent,
  ModalComponent,
  CategoryPipe,
  ToasterComponent,
  CommonTransactionFormComponent,
  SwitchComponent,
  TransactionListComponent,
  ToastComponent
];

const services = [
  WebViewService,
  ToastService
];

@NgModule({
  declarations: [...components],
  imports: [FormModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [...components, CommonModule, FormModule],
  providers: [...services]
})
export class LibModule {

}
