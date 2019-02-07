import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExamService } from "../../_service/exam.service";
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { StandardService } from './../../_service/standard.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {
  firstFormGroup: FormGroup;
  baseClassList = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VII', 'IX', 'X', 'XI', 'XII', 'LKG', 'UKG'];
  schoolClassList: any[] = [];
  startDate: any;
  endDate: any;
  showcard: boolean;

  constructor(private router: Router, private examService: ExamService, private _formBuilder: FormBuilder, private standardService: StandardService) {

  }

  examsData: Array<any> = [{}];
  ngOnInit() {
    this.showcard = false;
    this.getStandardList();
    this.startDate = new Date(new Date().getFullYear(), 0, 1);
    this.endDate = new Date(new Date().getFullYear() + 1, 0, 1);
    this.firstFormGroup = this._formBuilder.group({
      examName: ['', Validators.required],
      startDate: [this.startDate, Validators.required],
      endDate: [this.endDate, Validators.required],
      selectedGrade: ['', Validators.required]
    });
  }
  h
  goToExamCreation() {
    console.log("exams");
    this.router.navigate(['/academics/exams']);
  }

  getStandardList() {
    this.standardService.getStandardListBySchoolId().subscribe((res) => {
      let responseBody: any;
      responseBody = res;
      this.schoolClassList = [];
      responseBody.forEach(element => {
        if (this.baseClassList.indexOf(element.grade) !== -1) {
          this.schoolClassList.push(element.grade);
        }
      });
      const x = (names) => names.filter((v, i) => names.indexOf(v) === i);
      const unique = x(this.schoolClassList);
      this.schoolClassList = unique;
    });
  }

  getExams() {
    if (this.firstFormGroup.value.startDate != null && this.firstFormGroup.value.endDate && this.firstFormGroup.value.selectedGrade) {
      var schoolInfo = {
        startDate: moment(this.firstFormGroup.value.startDate).format('YYYY-MM-DD'),
        endDate: moment(this.firstFormGroup.value.endDate).format('YYYY-MM-DD'),
        schoolInfo: 1,
        grade: this.firstFormGroup.value.selectedGrade
      }
      console.log("data" + JSON.stringify(schoolInfo));
      this.examService.getExamsBySchoolInfoAndGrade(schoolInfo).subscribe((data) => {
        this.examsData = data;
        this.showcard = true;
        console.log("data" + JSON.stringify(this.examsData));
      });

    }
  }
  onChange(event): void {
    console.log("changes"+event);
    this.examsData = null;
    this.showcard = false;

  }

}
