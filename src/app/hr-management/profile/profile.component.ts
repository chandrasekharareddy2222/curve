import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {StaffService} from '../../_service/staff.service';
import {ActivatedRoute} from '@angular/router';
import * as moment from 'moment';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'staff-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements AfterViewInit {
  @ViewChild('tabGroup') tabGroup;

  staffId;
  Arr = Array;
  daysInMonth = 31;
  miy = 12;
  moment = moment;
  staffInfo;
  responsibilities;
  fullAttendance;

  inbox = {
    MEETING_REQUEST: {},
    PERSONAL: {}
  };
  outbox = {
    MEETING_REQUEST: {},
    PERSONAL: {},
    SUBJECT_NOTE: {},
  };
  inboxType = 'MEETING_REQUEST';
  outboxType = 'MEETING_REQUEST';

  leaveRequests;
  filterLeave =  {approved: null};

  constructor(private staffService: StaffService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.staffId = params.id;
      this.setStaffDetails();
    });
  }

  tabChanged(ev) {
    if (ev.index === 2) {
      this.setUpActivityLogs();
    }
  }

  ngAfterViewInit() {
    console.log('afterViewInit => ', this.tabGroup.selectedIndex);
  }

  setUpActivityLogs() {
    forkJoin(
      this.staffService.getActivityLog(this.staffId, 'inbox', 'MEETING_REQUEST'),
      this.staffService.getActivityLog(this.staffId, 'inbox', 'PERSONAL'),
      this.staffService.getActivityLog(this.staffId, 'out', 'MEETING_REQUEST'),
      this.staffService.getActivityLog(this.staffId, 'out', 'PERSONAL'),
      this.staffService.getActivityLog(this.staffId, 'out', 'SUBJECT_NOTE'),
    ).subscribe(([r1, r2, r3, r4, r5]) => {
      this.inbox.MEETING_REQUEST = r1;
      this.inbox.PERSONAL = r2;
      this.outbox.MEETING_REQUEST = r3;
      this.outbox.PERSONAL = r4;
      this.outbox.SUBJECT_NOTE = r5;
      console.log(this.outbox);
    });
  }

  getAttendance(d, i) {
    const partDate = moment(d).format('YYYY-MM-');
    const dd = (partDate + (i > 9 ? i : '0' + i));

    for (const dp of this.fullAttendance[this.staffId]) {
      if (dp.date === dd) {
        return dp.attendanceType.charAt(0);
      }
    }

    return '';
  }

  setStaffDetails() {
    this.staffService.getStaffDetailById(this.staffId).subscribe(info => {
      this.staffInfo = info;
    });

    this.staffService.getStaffAttendanceForfullYearById(this.staffId).subscribe(attendanceData => {
      this.fullAttendance = attendanceData;
      console.log(this.fullAttendance);
    });

    this.staffService.getLeaveLettersByStaffId(this.staffId).subscribe(leaveReqs => {
      this.leaveRequests = leaveReqs;
    });

    this.staffService.getResponsibilitiesByStaffId(this.staffId).subscribe(res => {
      this.responsibilities = res;
    });
  }
}
