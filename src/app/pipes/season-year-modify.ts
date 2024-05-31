import { Pipe, PipeTransform } from '@angular/core';

const ordinals: string[] = ['th','st','nd','rd'];

@Pipe({name: 'seasonYearModify'})
export class SeasonYearPipe implements PipeTransform {
    transform(year: string, increment: boolean) {
        let startYear = parseInt(year.substring(0, 4));
        let endYear = parseInt(year.substring(5));
        if(increment) {
            ++startYear;
            ++endYear;
        }
        else {
            --startYear;
            --endYear;
        }
        return startYear.toString() + "-" + endYear.toString();
    }
}