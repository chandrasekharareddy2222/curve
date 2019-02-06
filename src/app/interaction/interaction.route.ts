import {Routes} from '@angular/router';
import {TimeTableComponent} from '../curriculum-setup/time-table/time-table.component';
import {SchoolAppComponent} from './school-app/school-app.component';
import {NoticeComponent} from './notice/notice.component';
import {DiaryComponent} from './diary/diary.component';

const CHILD_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'school_app',
    pathMatch: 'full'
  }, {
    path: 'school_app',
    component: SchoolAppComponent,
    data: {
      authorities: [],
      pageTitle: 'school_app.title',
      breadcrumb: 'School App'
    }
  }, {
    path: 'notice',
    component: NoticeComponent,
    data: {
      authorities: [],
      pageTitle: 'add_class_section.title',
      breadcrumb: 'Notice'
    },
  }, {
    path: 'diary',
    component: DiaryComponent,
    data: {
      authorities: [],
      pageTitle: 'add_class_section.title',
      breadcrumb: 'Diary'
    },
  }
];

export const INTERACTION_ROUTES: Routes = [
  {
    path: 'interaction',
    data: {
      authorities: [],
      pageTitle: 'interaction.title',
      breadcrumb: 'Interaction'
    },
    children: CHILD_ROUTES
  }
];
