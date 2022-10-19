import {Pipe, PipeTransform} from '@angular/core';
import {categoryMapResponse} from '../../../dto/categoryMap.response';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    return categoryMapResponse[value];
  }

}
