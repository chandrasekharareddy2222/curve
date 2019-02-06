import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {WitcurveManagerSharedModule} from '../shared';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../material.module';
import {INTERACTION_ROUTES} from './interaction.route';
import {SchoolAppComponent} from './school-app/school-app.component';
import {NoticeComponent} from './notice/notice.component';
import {DiaryComponent} from './diary/diary.component';

@NgModule({
  imports: [
    WitcurveManagerSharedModule,
    RouterModule.forChild([...INTERACTION_ROUTES]),
    MaterialModule,
  ],
  declarations: [
    SchoolAppComponent,
    NoticeComponent,
    DiaryComponent,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WitcurveManagerInteractionModule {}
