import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-secured',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecureComponent {

  constructor() {
  }
}
