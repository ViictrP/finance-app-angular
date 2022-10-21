import { Pipe, PipeTransform } from '@angular/core';
import {categoryMaIconpResponse} from '../../../dto/categoryMapIcon.response';

@Pipe({
  name: 'categoryIcon'
})
export class CategoryIconPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    return categoryMaIconpResponse[value];
  }

}
