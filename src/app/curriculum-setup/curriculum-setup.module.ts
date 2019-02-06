import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import {WitcurveManagerSharedModule} from '../shared';
import {CURRICULUM_SETUP_ROUTES} from './curriculum-setup.route';
import {AssignFacultyComponent} from './assign-faculty/assign-faculty.component';
import {TimeTableComponent} from './time-table/time-table.component';
import {SubjectCourseComponent} from './subject-course/subject-course.component';
import {AddClassSectionComponent} from './add-class-section/add-class-section.component';
import {SectionTimetableComponent} from './section-timetable/section-timetable.component';
import {SetupTimeTableComponent} from './setup-time-table/setup-time-table.component';
import {MaterialModule} from '../material.module';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {StandardService} from '../_service/standard.service';
import {MatInputModule, MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatProgressSpinnerModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [
      WitcurveManagerSharedModule,
      RouterModule.forChild([...CURRICULUM_SETUP_ROUTES]),
      NgxMaterialTimepickerModule.forRoot(),
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      MatInputModule,
      MatAutocompleteModule,
      MatFormFieldModule,
      MatButtonModule,
      MatProgressSpinnerModule,
    ],
    declarations: [
      AddClassSectionComponent,
      TimeTableComponent,
      AssignFacultyComponent,
      SectionTimetableComponent,
      SubjectCourseComponent,
      SetupTimeTableComponent
    ],
    providers: [StandardService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WitcurveCurriculumSetupModule {}
