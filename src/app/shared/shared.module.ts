import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {WitcurveInputComponent} from './witcurve-input/witcurve-input.component';
import {WitcurveManagerSharedLibsModule} from './shared-libs.module';
import {WitcurveManagerSharedCommonModule} from './shared-common.module';
import {SectionsSelectComponent} from './sections-select/sections-select.component';
import {ConfirmDeleteComponent} from './confirm-delete/confirm-delete.component';
import {ConfirmDeleteService} from './confirm-delete/confirm-delete.service';
import {ToastrModule} from 'ngx-toastr';
import {SelectClassSectionComponent, SelectCSDialog} from './select-class-section/select-class-section.component';
import {MaterialModule} from '../material.module';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';
import {RouterModule} from '@angular/router';
import {NoRecordsComponent} from './exceptional/no-records.component';

@NgModule({
    imports: [
      WitcurveManagerSharedLibsModule,
      WitcurveManagerSharedCommonModule,
      MaterialModule,
      RouterModule,
      ToastrModule.forRoot(),
    ],
    declarations: [
      WitcurveInputComponent,
      SectionsSelectComponent,
      ConfirmDeleteComponent,
      SelectClassSectionComponent,
      SelectCSDialog,
      BreadcrumbComponent,
      NoRecordsComponent,
    ],
    entryComponents: [SelectClassSectionComponent, SelectCSDialog],
    providers: [
      ConfirmDeleteService
    ],
    exports: [
      WitcurveManagerSharedCommonModule,
      WitcurveInputComponent,
      SectionsSelectComponent,
      ConfirmDeleteComponent,
      SelectClassSectionComponent,
      SelectCSDialog,
      BreadcrumbComponent,
      NoRecordsComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class WitcurveManagerSharedModule {}
