import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  template: `
    <div class="p-4 m-4">
      <p class="text-xs text-gray-500">loading...</p>
    </div>
  `
})
export default class LoadingComponent {

}
