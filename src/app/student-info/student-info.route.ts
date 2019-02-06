import { Routes } from '@angular/router';
import {StudentDirectoryComponent} from './student-directory/student-directory.component';
import {StudentAttendanceComponent} from './student-attendance/student-attendance.component';
import {AddStudentComponent} from './add-student/add-student.component';

const CHILD_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'student_directory',
    pathMatch: 'full'
  }, {
    path: 'student_directory',
    component: StudentDirectoryComponent,
    data: {
      authorities: [],
      pageTitle: 'staff_directory.title',
      breadcrumb: 'Student List'
    }
  }, {
    path: 'student_attendance',
    component: StudentAttendanceComponent,
    data: {
      authorities: [],
      pageTitle: 'student_attendance.title',
      breadcrumb: 'Student Attendance'
    }
  }, {
    path: 'add_student',
    component: AddStudentComponent,
    data: {
      autorities: [],
      pageTitle: 'Add Student',
      breadcrumb: 'Add Student'
    }
  }
];

export const STUDENT_INFO: Routes = [
  {
    path: 'student_info',
    data: {
      authorities: [],
      pageTitle: 'student_info.title',
      breadcrumb: 'Student Information'
    },
    children: CHILD_ROUTES
  }
];
