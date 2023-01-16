import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../BaseComponent';
import { UserService } from '../../services/user.service';
import User from '../../../entities/User';
import { BottomSheetComponent } from '../../../lib/components/bottom-sheet/bottom-sheet.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PreferencesService } from '../../services/preferences.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends BaseComponent implements OnInit {

  @ViewChild('bottomSheet') bottomSheet: BottomSheetComponent | undefined;
  user?: User;
  form: FormGroup;
  loading = false;
  isDarkMode = false;

  constructor(detector: ChangeDetectorRef,
              formBuilder: FormBuilder,
              private readonly userService: UserService,
              private readonly router: Router,
              private readonly preferencesService: PreferencesService) {
    super(detector);
    this.form = formBuilder.group({
      salary: [this.user?.salary, [Validators.required]]
    });
  }

  get salary() {
    return this.form.get('salary');
  }

  ngOnInit(): void {
    this.bottomSheet?.show();
    this.subscribeAndRender(
      this.userService.currentUser,
      (user) => this.user = user
    );

    this.subscribeAndRender(
      this.preferencesService.currentTheme$,
      theme => {
        this.isDarkMode = theme === 'dark';
      }
    )
  }

  openEditForm() {
    this.bottomSheet?.show();
  }

  saveSalary() {
    this.loading = true;
    this.subscribeAndRender(
      this.userService.updateProfile(this.form.value),
      () => {
        this.loading = false;
        this.bottomSheet?.close();
      }
    );
  }

  addRecurringExpense() {
    this.router.navigate(['secure/recurring-expenses-form']);
  }

  themeChanged(isDarkMode: boolean) {
    this.preferencesService.saveTheme(isDarkMode);
  }
}
