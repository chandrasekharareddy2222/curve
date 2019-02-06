import { Component, OnInit } from '@angular/core';
import {StaffService} from '../../_service/staff.service';

@Component({
  selector: 'app-sub-allocation',
  templateUrl: './sub-allocation.component.html',
  styleUrls: ['./sub-allocation.component.scss']
})
export class SubAllocationComponent implements OnInit {
  absentees = [];
  selectedAbsentee;

  constructor(private staffService: StaffService) {
    staffService.getTodaysAttendance().subscribe(data => {
      for (const key in data) {
        if (data[key][0].attendanceType === 'ABSENT') {
          this.absentees.push(data[key][0]);
        }
      }
      console.log(this.absentees);
    });
  }

  ngOnInit() {
  }

  selectAbsentee(ev, ab) {
    this.selectedAbsentee = ab;
  }

}
