import { Component, OnInit } from '@angular/core';
import {StaffService} from '../../_service/staff.service';
import * as moment from 'moment';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-staff-attendance',
  templateUrl: './staff-attendance.component.html',
  styleUrls: ['./staff-attendance.component.scss']
})
export class StaffAttendanceComponent implements OnInit {
  selectedDate = new Date();
  maxDate = new Date();
  rawAttendance;
  dateHeader = [];
  keys = Object.keys;

  staffList;
  attTypes = [
    {
      name: 'Present',
      value: 'PRESENT',
    }, {
      name: 'Absent',
      value: 'ABSENT',
    }, {
      name: 'Half Day',
      value: 'HALF_DAY',
    }
  ];

  constructor(private staffService: StaffService) {}

  setUpTakeAttendance() {
    forkJoin(
      this.staffService.getStaffListBySchoolId(),
      this.staffService.getTodaysAttendance()
    ).subscribe(([r1, r2]) => {
      this.staffList = r1;
      for (const st of this.staffList) {
        for (const key in r2) {
          if (key === '' + st.id) {
            st.attendance = r2[key][0].attendanceType;
            st.eventId = r2[key][0].id;
            st.isSaved = true;
          }
        }
        if (!st.isSaved) {
          st.attendance = null;
          st.eventId = null;
          st.isSaved = false;
        }
      }

      console.log(this.staffList);
    });
  }

  tabChanged(ev) {
    if (ev.index === 0) {
      this.fetchFresh();
    } else {
      this.setUpTakeAttendance();
    }
  }

  ngOnInit() {
    this.fetchFresh();
  }

  fetchFresh() {
    this.staffService.getAttendanceForSchoolInfo(this.selectedDate).subscribe(attList => {
      this.rawAttendance = attList;
    });

    this.setHeader();
  }

  setHeader() {
    this.dateHeader = [];
    for (let i = 0; i <= 14; i++) {
      this.dateHeader.push({
        match: moment(this.selectedDate).subtract(i, 'days').format('YYYY-MM-DD'),
        display: moment(this.selectedDate).subtract(i, 'days').format('Do MMM')
      });
    }
    console.log(this.dateHeader);
  }

  findAttForDate(d, i) {
    for (const dp of this.rawAttendance[i]) {
      if (d.match === dp.date) {
        return dp.attendanceType.charAt(0);
      }
    }

    return '';
  }

  saveAtt(staff) {
    if (staff.attendance && !staff.eventId) {
      const attObj = [{
        'name': 'Attendance',
        'description': null,
        'type': 'ATTENDANCE',
        'date': moment().format('YYYY-MM-DD'),
        'eventStartTime': null,
        'eventEndTime': null,
        'staffId': staff.id,
        'grade': null,
        'attendanceType': staff.attendance,
        'schoolInfoId': null
      }];

      this.staffService.takeAttendance(attObj).subscribe(data => {
        staff.eventId = data[0].id;
        staff.isSaved = true;
      });
    } else {
      const attObj = [{
        'id': staff.eventId,
        'name': 'Attendance',
        'description': null,
        'type': 'ATTENDANCE',
        'date': moment().format('YYYY-MM-DD'),
        'eventStartTime': null,
        'eventEndTime': null,
        'staffId': staff.id,
        'grade': null,
        'attendanceType': staff.attendance,
        'schoolInfoId': null
      }];

      this.staffService.updateAttendance(attObj).subscribe(data => {
        console.log(data);
        staff.isSaved = true;
      });
    }
  }

}
