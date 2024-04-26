import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-no-data',
  standalone: true,
  imports: [
    NgOptimizedImage,
  ],
  template: `
    <div class="flex flex-col items-center gap-4 mt-20">
      <img
        class="opacity-40"
        ngSrc="./assets/svg/empty.svg"
        alt="Empty List"
        width="60"
        height="60"
      />
      <p class="text-sm text-gray-500">nada a mostrar.</p>
    </div>
  `,
})
export default class NoDataComponent {

}
