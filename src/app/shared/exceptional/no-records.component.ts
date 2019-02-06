import {Component} from '@angular/core';

@Component({
  selector: 'no-records',
  template: `<div class="no-rec">
    <img src="../../../assets/images/no_record_found.jpg" alt="No Records Found!">
  </div>`,
  styles: ['.no-rec {width: 100%; opacity: 0.5; display: flex;}', 'img {width: 50%; margin: auto}']
})
export class NoRecordsComponent {

}
