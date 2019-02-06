import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {StandardService} from '../../_service/standard.service';

@Component({
  selector: 'app-setup-timetable',
  templateUrl: './setup-time-table.component.html',
  styleUrls: ['./setup-time-table.component.scss']
})
export class SetupTimeTableComponent implements OnInit {
  breaks = [];
  sections = [];
  time: any;
  numPeriod = 1;
  durationPeriod = 45;
  viewPreview = false;
  header = [];
  breakIds = [];
  /*breakId: startAfter*/
  selectedBreaks = {};
  standardId = 1;
  gsds = [];

  constructor(private toastr: ToastrService,
              private standardService: StandardService) {
  }

  ngOnInit() {}

  addBreak() {
    if (!this.numPeriod || this.numPeriod < 0) {
      this.toastr.error('Set number of periods', 'Error', { closeButton: true });
      return;
    }
    const periodDD = [];
    let startAfter;
    for (let i = 0; i < this.numPeriod - 1; i++) {
      if (!this.checkPer(i)) {
        periodDD.push({name: 'Period ' + (i + 1), value: i});
        if (!startAfter && startAfter !== 0) {
          startAfter = i;
        }
      } else {
        periodDD.push({name: 'Period ' + (i + 1), value: i, isDisable: true});
      }
    }
    const br = {
      startAfter: startAfter,
      duration: 30,
      periodDD: periodDD,
      id: this.getBreakId()
    };
    this.breaks.push(br);
    this.breakChange(br);
  }


  breakChange(br) {
    this.selectedBreaks[br.id] = br.startAfter;
    this.changePeriodsForOtherBreaksOnBreakChange(br);
  }

  changePeriodsForOtherBreaksOnBreakChange(bk) {
    for (const br of this.breaks) {
      if (bk.id !== br.id) {
        for (let i = 0; i < br.periodDD.length; i++) {
          if (br.periodDD[i].value === this.selectedBreaks[bk.id]) {
            br.periodDD[i].isDisable = true;
          } else {
            br.periodDD[i].isDisable = false;
          }
        }
      }
    }
  }

  deleteBreak(br) {
    delete this.selectedBreaks[br.id];
    for (let i = 0; i < this.breaks.length; i++) {
      if (this.breaks[i].id === br.id) {
        this.breaks.splice(i, 1);
        break;
      }
    }
    this.changePeriodsForOtherBreaksOnBreakChange(br);
  }

  getBreakId() {
    if (this.breakIds.length === 0) {
      this.breakIds.push(0);
    } else {
      const lastId = this.breakIds[this.breakIds.length - 1];
      this.breakIds.push(lastId + 1);
    }
    return this.breakIds[this.breakIds.length - 1];
  }

  checkPer(i) {
    for (const ind in this.breaks) {
      if (this.breaks[ind].startAfter === i) {
        return true;
      }
    }

    return false;
  }

  showPreview() {
    this.gsds = [];
    if (!this.time) {
      this.toastr.error('Select start time', 'Error', { closeButton: true });
      return;
    }

    this.header = [];

    for (let i = 0; i < this.numPeriod; i++) {
      this.addPeriodOrBreak(i);
    }

    // console.log(this.gsds);
    this.viewPreview = true;
  }

  updateGsd(duration, gsdStartTime, recess) {
    this.gsds.push({
      start: gsdStartTime,
      recess : recess,
      duration: duration,
      standard: {
        id: this.standardId,
      }
      ,
      status : 'ACTIVE',
    });
  }

  addPeriodOrBreak(count) {
    if (this.header.length === 0) {
      const h = this.time.hour;
      const m = this.time.minute;
      this.header.push(
        {
          time: ((h > 12 ? '0' + (h - 12) : h < 10 ? '0' + h : h) + ':' +  (m < 10 ? '0' + m : m) + (h < 12 ? 'AM' : 'PM')),
          isBreak: false,
          period: count + 1,
        });
      const gsdStartTime = ((h < 10 ? '0' + h : h) + (m < 10 ? '0' + m : m));
      this.updateGsd(this.durationPeriod, gsdStartTime, false);
    } else {
      const lastPer = this.header[this.header.length - 1].time;
      let hr = parseInt(lastPer.split(':')[0], 10);
      if (lastPer.includes('PM') &&  hr !== 12) {
        hr = hr + 12;
      }
      const min = parseInt(lastPer.split(':')[1], 10);
      // console.log(lastPer, hr, min);
      let totalMin: number = min + this.durationPeriod;
      let hrCurr: number, minCurr: number, x: number, y: number;
      for (const br in this.breaks) {
        if (this.breaks[br].startAfter === count - 1) {
          x = Math.floor(totalMin / 60);
          y = (totalMin % 60);
          hrCurr = hr + x;
          minCurr = y;
          totalMin = totalMin + this.breaks[br].duration;
          this.header.push({
            time: ((hrCurr > 12 ? '0' + (hrCurr - 12) : hrCurr < 10 ? '0' + hrCurr : hrCurr) + ':' +
              (minCurr < 10 ? '0' + minCurr : minCurr) + (hrCurr < 12 ? 'AM' : 'PM')),
            isBreak: true
          });
          const gsdBreakStartTime = ((hrCurr < 10 ? '0' + hrCurr : hrCurr) + '' + (minCurr < 10 ? '0' + minCurr : minCurr));
          this.updateGsd(this.breaks[br].duration, gsdBreakStartTime, true);
          break;
        }
      }

      x = Math.floor(totalMin / 60);
      y = (totalMin % 60);
      hrCurr = hr + x;
      minCurr = y;
      this.header.push({
        time: ((hrCurr > 12 ? '0' + (hrCurr - 12) : hrCurr < 10 ? '0' + hrCurr : hrCurr) + ':' +
          (minCurr < 10 ? '0' + minCurr : minCurr) + (hrCurr < 12 ? 'AM' : 'PM')),
        isBreak: false,
        period: count + 1,
      });
      const gsdStartTime = ((hrCurr < 10 ? '0' + hrCurr : hrCurr) + '' + (minCurr < 10 ? '0' + minCurr : minCurr));
      this.updateGsd(this.durationPeriod, gsdStartTime, false);
    }
  }

  savePreview() {
    this.showPreview();
    this.standardService.createGSDs(this.gsds).subscribe((data) => {
      console.log(data);
      this.toastr.success('Created Setup Timetable', 'Success', { closeButton: true });
    }, error => {
      console.log(error);
      this.toastr.error('Error while creating setup timetabe', 'Success', { closeButton: true });
    });
  }
}
