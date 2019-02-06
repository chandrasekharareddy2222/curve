import { Routes } from '@angular/router';
import {TimeTableComponent} from './time-table/time-table.component';
import {AssignFacultyComponent} from './assign-faculty/assign-faculty.component';
import {SetupTimeTableComponent} from './setup-time-table/setup-time-table.component';
import {AddClassSectionComponent} from './add-class-section/add-class-section.component';
import {SubjectCourseComponent} from './subject-course/subject-course.component';
import {SectionTimetableComponent} from './section-timetable/section-timetable.component';

const CHILD_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'add_class_section',
        pathMatch: 'full'
    }, {
      path: 'add_class_section',
      component: AddClassSectionComponent,
      data: {
        authorities: [],
        pageTitle: 'add_class_section.title',
        breadcrumb: 'Add Class Section'
      },
    }, {
      path: 'setup_time_table',
      component: SetupTimeTableComponent,
      data: {
        authorities: [],
        pageTitle: 'setup_time_table.title',
        breadcrumb: 'Setup Time Table'
      }
    }, {
        path: 'time_table',
        component: TimeTableComponent,
        data: {
          authorities: [],
          pageTitle: 'time_table.title',
          breadcrumb: 'Time Table'
        }
    }, {
        path: 'add_subject_course',
        component: SubjectCourseComponent,
        data: {
          authorities: [],
          pageTitle: 'subject_course.title',
          breadcrumb: 'Add Subject Course'
        }
    }, {
        path: 'assign_faculty',
        component: AssignFacultyComponent,
        data: {
            authorities: [],
            pageTitle: 'assign_faculty.title',
            breadcrumb: 'Assign Faculty'
        }
    }, {
      path: 'section_timetable',
      component: SectionTimetableComponent,
      data: {
        authorities: [],
        pageTitle: 'section_timetable.title',
        breadcrumb: 'Section Timetable'
      }
    },
];

export const CURRICULUM_SETUP_ROUTES: Routes = [
    {
        path: 'curriculum_setup',
        data: {
            authorities: [],
            pageTitle: 'curriculum_setup.title',
          breadcrumb: 'Curriculum Setup'
        },
        children: CHILD_ROUTES
    }
];
