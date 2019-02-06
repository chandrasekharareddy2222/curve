import { Routes } from '@angular/router';
import {StaffDirectoryComponent} from './staff-directory/staff-directory.component';
import {StaffAttendanceComponent} from './staff-attendance/staff-attendance.component';
import {LeaveManagementComponent} from './leave-management/leave-management.component';
import {SubAllocationComponent} from './sub-allocation/sub-allocation.component';
import {StaffPayrollComponent} from './staff-payroll/staff-payroll.component';
import {ProfileComponent} from './profile/profile.component';
import {AddStaffComponent} from './add-staff/add-staff.component';

const CHILD_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'staff_directory',
        pathMatch: 'full'
    }, {
      path: 'staff_directory',
      component: StaffDirectoryComponent,
      data: {
        authorities: [],
        pageTitle: 'staff_directory.title',
        breadcrumb: 'Staff Directory'
      }
    }, {
        path: 'staff_attendance',
        component: StaffAttendanceComponent,
        data: {
            authorities: [],
            pageTitle: 'staff_attendance.title',
            breadcrumb: 'Staff Attendance'
        }
    }, {
        path: 'leave_management',
        component: LeaveManagementComponent,
        data: {
            authorities: [],
            pageTitle: 'leave_management.title',
            breadcrumb: 'Leave Management'
        }
    }, {
        path: 'sub_allocation',
        component: SubAllocationComponent,
        data: {
          authorities: [],
          pageTitle: 'sub_allocation.title',
          breadcrumb: 'Substitute Allocation'
        }
    }, {
        path: 'staff_payroll',
        component: StaffPayrollComponent,
        data: {
          authorities: [],
          pageTitle: 'staff_payroll.title',
          breadcrumb: 'Staff Payroll'
        }
    }, {
        path: 'staff_directory/:id',
        component: ProfileComponent,
        data: {
          authorities: [],
          pageTitle: 'Staff Profile',
          breadcrumb: 'Profile'
        }
    }, {
        path: 'add_staff',
        component: AddStaffComponent,
        data: {
          autorities: [],
          pageTitle: 'Add Staff',
          breadcrumb: 'Add Staff'
        }
    }, {
        path: 'edit_staff/:id',
        component: AddStaffComponent,
        data: {
          autorities: [],
          pageTitle: 'Edit Staff',
          breadcrumb: 'Edit Staff'
        }
      }
];

export const HR_MANAGEMENT: Routes = [
    {
        path: 'hr_management',
        data: {
            authorities: [],
            pageTitle: 'hr_management.title',
            breadcrumb: 'HR Management'
        },
        children: CHILD_ROUTES
    }
];
