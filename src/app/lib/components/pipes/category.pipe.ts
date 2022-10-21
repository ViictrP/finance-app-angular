import {Pipe, PipeTransform} from '@angular/core';
import {categoryMapResponse} from '../../../dto/categoryMap.response';
import {categoryMaIconpResponse} from '../../../dto/categoryMapIcon.response';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value: string, icon: boolean = false): string {
    if (icon) {
      return categoryMaIconpResponse[value];
    }
    return categoryMapResponse[value];
  }

}
