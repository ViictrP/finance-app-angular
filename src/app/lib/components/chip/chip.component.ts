import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-chip',
  standalone: true,
  imports: [
    NgClass,
  ],
  template: `
    <div
      class="gap-2 bg-white border-purple-50 border flex justify-center items-center m-1 font-medium py-2 px-4 rounded-full text-black">
      <div class="{{ getLineColor(lineColor) }} w-2 h-4 rounded-full"></div>
      <div class="text-lg font-bold leading-none max-w-full flex-initial whitespace-nowrap">{{ title }} <span
        class="font-normal">{{ percentage }}%</span></div>
    </div>
  `,
})
export default class ChipComponent {
  @Input({ required: true }) lineColor!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) percentage!: string;

  map: Map<string, string>;

  constructor() {
    this.map = new Map();
    this.map.set('bg-purple-900', 'bg-purple-900');
    this.map.set('bg-blue-500', 'bg-blue-500');
    this.map.set('bg-orange-500', 'bg-orange-500');
    this.map.set('bg-zinc-900', 'bg-zinc-900');
  }

  protected getLineColor = (lineColor: string): string  => this.map.get(lineColor)!.toString();
}
