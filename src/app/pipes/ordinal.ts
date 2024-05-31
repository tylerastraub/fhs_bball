import { Pipe, PipeTransform } from '@angular/core';

const ordinals: string[] = ['th','st','nd','rd'];

@Pipe({name: 'ordinal'})
export class OrdinalPipe implements PipeTransform {
    transform(n: string, keepNumber: boolean = true) {
        let v = parseInt(n) % 100;
        return (keepNumber?n:'') + (ordinals[(v-20)%10]||ordinals[v]||ordinals[0]);
    }
}