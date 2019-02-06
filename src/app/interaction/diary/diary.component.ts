import {Component, OnInit} from '@angular/core';
import {diary} from './diary-data';

@Component({
  selector: 'app-dairy',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.scss'],
})
export class DiaryComponent implements OnInit {
  diaryData = diary;
  activeTeacherId;
  ngOnInit(): void {
    this.activeTeacherId = Object.keys(this.diaryData).length > 0 ? Object.keys(this.diaryData)[0] : null;
  }

  getTeacherIdsFromDiaryData() {
    console.log(Object.keys(this.diaryData));
    return Object.keys(this.diaryData);
  }
}
