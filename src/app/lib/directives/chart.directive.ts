import {Directive, ElementRef, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import * as frappe from 'frappe-charts/dist/frappe-charts.min.esm';

export type Data = {
  title: string;
  color: string;
  values: number[];
};

export type Dataset = {
  labels: string[];
  datasets: Data[];
};

@Directive({
  selector: '[appChart]'
})
export class ChartDirective implements OnChanges {

  @Input() data: Dataset = {} as any;
  @Input() type = 'line';
  @Input() height = 250;
  @Input() colors?: string[];

  @Output() frappe: EventEmitter<any> = new EventEmitter();

  constructor(private el: ElementRef) {
    this.height = this.el.nativeElement.height;
  }

  ngOnChanges(): void {
    const chart = new frappe.Chart(this.el.nativeElement, {  // or a DOM element,
      data: {
        ...this.data
      },
      type: this.type, // or 'bar', 'line', 'scatter', 'pie', 'percentage'
      height: this.height,
      colors: this.colors || ['#fef08a'],
      axisOptions: {
        xAxisMode: 'tick',
        xIsSeries: true,
        yAxisMode: 'tick',
        yIsSeries: false,
        valueOverPoints: 1
      },
      animate: 1,
      tooltipOptions: {
        formatTooltipX: (value: number) => (value + '').toUpperCase(),
        formatTooltipY: (value: number) => `R$ ${value}`,
      },

      lineOptions: {
        regionFill: 0,
        hideDots: 1,
        hideLine: 0,
        spline: 0
      }
    });

    console.log(chart);
  }

}
