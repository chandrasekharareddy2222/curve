import {Component} from '@angular/core';
import {notices} from './notice-data';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.scss']
})
export class NoticeComponent {
  noticeData = notices;
  constructor() {}
}
