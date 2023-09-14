import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PublicComponent } from './components/public.component';

const routing: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routing)],
  exports: [RouterModule]
})
export class PublicRoutingModule {

}
