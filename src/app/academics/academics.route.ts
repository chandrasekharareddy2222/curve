import { Routes } from '@angular/router';
import { AttendanceComponent } from './attendance/attendance.component';
import { AcademicsComponent } from './academics.component';
import { ExamsComponent } from './exams/exams.component';
import {ExamComponent} from "./exam/exam.component";


const CHILD_ROUTES: Routes = [{
    path: '',
    redirectTo: 'attendance',
    pathMatch: 'full',
}, {
    path: 'attendance',
    component: AttendanceComponent,
    data: {
        authorities: [],
        pageTitle: 'attendance.title'
    }
},
{
    path: 'exams',
    component: ExamsComponent,
    data: {
        authorities: [],
        pageTitle: 'exams.title',
        breadcrumb: 'Exams'
    },
},
{
    path: 'exam',
    component: ExamComponent,
    data: {
        authorities: [],
        pageTitle: 'exam.title',
        breadcrumb: 'Exam'
    },
}
];

export const ACADEMICS_ROUTE: Routes = [{
    path: 'academics',
    component: AcademicsComponent,
    data: {
        authorities: [],
        pageTitle: 'academics.title',
        breadcrumb: 'Academics'
    },
    children: CHILD_ROUTES
}];
