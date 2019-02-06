import { Component, OnInit } from '@angular/core';
import {StaffService} from '../../_service/staff.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-leave-management',
  templateUrl: './leave-management.component.html',
  styleUrls: ['./leave-management.component.scss']
})
export class LeaveManagementComponent implements OnInit {
  leaveRequests: any;
  keys = Object.keys;

  constructor(private staffService: StaffService, private toastr: ToastrService) { }

  ngOnInit() {
    this.staffService.getAllPendingStaffLeaveLetters().subscribe(ll => {
      this.leaveRequests = ll;
    });
  }

  approveRequest(leave) {
    leave.status = 'APPROVED';
    this.staffService.approveDeclineLeaveRequest(leave).subscribe(data => {
      this.toastr.success('Request Approved', 'Success', { closeButton: true });
    }, (err) => {
      this.toastr.error(err, 'Error', { closeButton: true });
      leave.status = 'PENDING';
    });
  }

  declineRequest(leave) {
    leave.status = 'DECLINED';
    this.staffService.approveDeclineLeaveRequest(leave).subscribe(data => {
      this.toastr.success('Request Declined', 'Success', { closeButton: true });
    }, (err) => {
      this.toastr.error(err, 'Error', { closeButton: true });
      leave.status = 'PENDING';
    });
  }

}
