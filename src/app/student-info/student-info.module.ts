import { NgModule } from '@angular/core';
import {WitcurveManagerSharedModule} from '../shared';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../material.module';
import {StaffService} from '../_service/staff.service';
import { StudentDirectoryComponent } from './student-directory/student-directory.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { StudentAttendanceComponent } from './student-attendance/student-attendance.component';
import {STUDENT_INFO} from './student-info.route';

@NgModule({
  declarations: [
  StudentDirectoryComponent,
  AddStudentComponent,
  StudentAttendanceComponent,
  ],
  providers: [StaffService],
  imports: [
    WitcurveManagerSharedModule,
    MaterialModule,
    RouterModule.forChild([...STUDENT_INFO])
  ]
})
export class WitcurveStudentInfoModule { }
