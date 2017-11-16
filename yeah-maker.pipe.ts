import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yeahmaker'
})
export class YeahMakerPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return;
    } else {
      return `Yeah ${value}!`;
    }
  }

}
