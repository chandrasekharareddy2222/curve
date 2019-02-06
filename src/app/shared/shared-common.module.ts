import { NgModule } from '@angular/core';
import {WitcurveManagerSharedLibsModule} from './shared-libs.module';

@NgModule({
    imports: [
        WitcurveManagerSharedLibsModule
    ],
    declarations: [
    ],
    exports: [
        WitcurveManagerSharedLibsModule,
    ],
    providers: [],
})
export class WitcurveManagerSharedCommonModule {}
