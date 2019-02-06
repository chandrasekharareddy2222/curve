import {Injectable} from '@angular/core';

@Injectable()
export class GlobalService {
  constructor() { }

  /*Convert 1200 to 12:00*/
  convertTimeValuetoTime(time) {
    if (time) {
      const hr = time.substr(0, 2);
      const min = time.substr(2, 2);
      return `${hr}:${min}`;
    }
    return '';
  }

    /*time should be in hh:mm or hhmm, duration in mins*/
    addDurationToTime(time, duration) {
      if (time && duration) {
        if (!time.includes(':')) {
          time = this.convertTimeValuetoTime(time);
        }
        const hr = parseInt(time.split(':')[0], 10);
        const min = parseInt(time.split(':')[1], 10);
        const totalMin: number = min + duration;

        const x = Math.floor(totalMin / 60);
        const y = (totalMin % 60);
        const hrCurr = hr + x;
        const minCurr = y;

        return (hrCurr < 10 ? '0' + hrCurr : hrCurr) + ':' + (minCurr < 10 ? '0' + minCurr : minCurr);
      }
    }
}
