import { Pipe, PipeTransform } from '@angular/core';
import { SharedService } from '../shared.service';

@Pipe({
  name: 'storageName'
})
export class SNPipe implements PipeTransform {
    constructor(private svc: SharedService) {}

    SI = ['Byte', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
  transform(value: number, ...args: string[]): string {
    let index: number = 0;
    if (value < 1024) return `${value} Bytes` 
    
    while (value >= 1) {
      value /= 1024;
      index += 1;
    }
    
    return `${Number(value * 1024).toFixed(2)} ${this.SI[index-1]}`;
  }

}