import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {MainComponent} from './main/main.component';
import {MaterialModule} from './material.module';
import {WitcurveManagerSharedModule} from './shared';
import {WitcurveCurriculumSetupModule} from './curriculum-setup/curriculum-setup.module';
import {WitcurveManagerAcademicsModule} from './academics/academics.module';
import {WitcurveHrManagementModule} from './hr-management/hr-management.module';
import {WitcurveManagerInteractionModule} from './interaction/interaction.module';
import {AuthenticationService} from './_service/auth.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './_interceptors/jwt.interceptor';
import {ErrorInterceptor} from './_interceptors/error.interceptor';
import {ReactiveFormsModule} from '@angular/forms';
import {WitcurveStudentInfoModule} from './student-info/student-info.module';
import {GlobalService} from './_service/global.service';
import {SubjectService} from './_service/subject.service';
import {ExamService} from "./_service/exam.service";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    WitcurveManagerSharedModule,
    WitcurveManagerAcademicsModule,
    WitcurveCurriculumSetupModule,
    WitcurveHrManagementModule,
    WitcurveStudentInfoModule,
    WitcurveManagerInteractionModule
  ],
  providers: [
    AuthenticationService,
    GlobalService,
    ExamService,
    SubjectService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
