import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ProfileComponent} from './profile.component';
import {FormModule} from '../../../form.module';
import {UserService} from '../../services/user.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BottomSheetComponent} from '../../../lib/components/bottom-sheet/bottom-sheet.component';
import {LoadingButtonComponent} from '../../../lib/components/buttons/loading-button.component';
import {ButtonComponent} from '../../../lib/components/buttons/button.component';
import {InputComponent} from '../../../lib/components/form/input/input.component';
import {IconButtonComponent} from '../../../lib/components/buttons/icon-button.component';
import { PreferencesService } from '../../services/preferences.service';
import { WebViewService } from '../../../lib/service/web-view.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ProfileComponent,
        BottomSheetComponent,
        LoadingButtonComponent,
        ButtonComponent,
        InputComponent,
        IconButtonComponent
      ],
      imports: [
        FormModule,
        HttpClientTestingModule
      ],
      providers: [
        UserService,
        PreferencesService,
        WebViewService
      ]
    });

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });
});
