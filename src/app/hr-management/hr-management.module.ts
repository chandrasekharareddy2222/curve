import { NgModule } from '@angular/core';
import { StaffDirectoryComponent } from './staff-directory/staff-directory.component';
import { StaffAttendanceComponent } from './staff-attendance/staff-attendance.component';
import { LeaveManagementComponent } from './leave-management/leave-management.component';
import { SubAllocationComponent } from './sub-allocation/sub-allocation.component';
import { StaffPayrollComponent } from './staff-payroll/staff-payroll.component';
import {WitcurveManagerSharedModule} from '../shared';
import {RouterModule} from '@angular/router';
import {HR_MANAGEMENT} from './hr-management.route';
import {MaterialModule} from '../material.module';
import {StaffService} from '../_service/staff.service';
import {ProfileComponent} from './profile/profile.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    StaffDirectoryComponent,
    StaffAttendanceComponent,
    LeaveManagementComponent,
    SubAllocationComponent,
    StaffPayrollComponent,
    ProfileComponent,
    AddStaffComponent,
  ],
  providers: [StaffService],
  imports: [
    WitcurveManagerSharedModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild([...HR_MANAGEMENT]),
  ]
})
export class WitcurveHrManagementModule { }
