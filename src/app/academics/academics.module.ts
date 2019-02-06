import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import {WitcurveManagerSharedModule} from '../shared';
import {ACADEMICS_ROUTE} from './academics.route';
import {AcademicsComponent} from './academics.component';
import {AttendanceComponent} from './attendance/attendance.component';
import { ExamsComponent } from './exams/exams.component';
import {MatStepperModule} from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import { ExamComponent } from './exam/exam.component';


@NgModule({
    imports: [
        WitcurveManagerSharedModule,
        MatStepperModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        MatDividerModule,
        MatListModule,
        MatCardModule,
        MatDatepickerModule,
        MatSlideToggleModule,
        MatTableModule,
        MatButtonToggleModule,
        MatSelectModule,
        MatButtonModule,
        RouterModule.forChild([ ...ACADEMICS_ROUTE ])
    ],
    declarations: [
        AcademicsComponent,
        AttendanceComponent,
        ExamsComponent,
        ExamComponent
    ],
    exports: [FormsModule, ReactiveFormsModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WitcurveManagerAcademicsModule {}
