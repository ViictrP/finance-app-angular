import {Pipe, PipeTransform} from '@angular/core';
import {categoryMapDto} from '../../../dto/category-map.dto';
import {categoryMaIconpResponse} from '../../../dto/category-map-icon.dto';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value: string, icon: boolean = false): string {
    if (icon) {
      return categoryMaIconpResponse[value];
    }
    return categoryMapDto[value];
  }

}
