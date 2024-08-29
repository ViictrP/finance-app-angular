import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'abs',
    standalone: true,
})
export class AbsPipe implements PipeTransform {
    transform(value: number | string): number {
        return Math.abs(Number(value));
    }
}
