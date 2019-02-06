import { StandardService } from './../../_service/standard.service';
import { StaffService } from './../../_service/staff.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import * as moment from 'moment';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

export interface PeriodicElement {
  date: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
];


@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss']
})



export class ExamsComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  forenoonAmPm = 'AM';
  forenoonAmPmChange: any;
  displayedColumns: string[] = ['date', 'name', 'weight', 'symbol'];
  thirdFormGroup: FormGroup;
  selectedClass: any;
  selectedDate: any;
  baseClassList = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VII', 'IX', 'X', 'XI', 'XII', 'LKG', 'UKG'];
  schoolClassList: any[] = [];
  apiBody1: any;
  startDate: string;
  endDate: string;
  examDays: PeriodicElement[] = [];
  dataSource: MatTableDataSource<{}>;
  firstFormResponse: any;
  selectedGrade: any;
  selectedGradeCourses: any;
  examCreationArray: any[] = [];
  foreNoonGsdId: any;
  afterNoonGsdId: any;
  slotList: any[] = [];
  examId: any;
  filteredExamCreationArray: any;
  constructor(private _formBuilder: FormBuilder,
    private staffService: StaffService, private toastr: ToastrService, private standardService: StandardService,private router:Router) { }

  ngOnInit() {
    this.getStandardList();
    this.firstFormGroup = this._formBuilder.group({
      examName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      selectedGrade: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      timeHoursSlotOne: ['', [Validators.required , Validators.max(23), Validators.min(0)]],
      timeHoursSlotTwo: ['', [Validators.required , Validators.max(23), Validators.min(0)]],
      timeMiutesSlotOne: ['', [Validators.required , Validators.max(59), Validators.min(0)]],
      timeMiutesSlotTwo: ['', [Validators.required, Validators.max(59), Validators.min(0)]],
      durationMiutesSlotOne: ['', Validators.required],
      durationMiutesSlotTwo: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      allExamsCreated: [false],
    });
    this.slotList = [];
    this.slotList[0] = this.foreNoonGsdId;
    this.slotList[1] = this.afterNoonGsdId;
  }
  firstStepSubmit(stepper: MatStepper) {
    const apiBody = {
      startDate: moment(this.firstFormGroup.controls.startDate.value).format('YYYY-MM-DD'),
      endDate: moment(this.firstFormGroup.controls.endDate.value).format('YYYY-MM-DD'),
      name: this.firstFormGroup.controls.examName.value,
      grade: this.firstFormGroup.controls.selectedGrade.value,
      schoolInfoId : 1
    };
    if (this.firstFormGroup.valid) {
      this.startDate = moment(this.firstFormGroup.controls.startDate.value).format('YYYY-MM-DD');
      this.endDate = moment(this.firstFormGroup.controls.endDate.value).format('YYYY-MM-DD');
      this.getExamBuffferBoard();
      this.selectedGrade = this.firstFormGroup.controls.selectedGrade.value;
      this.getCourseList(this.selectedGrade);
      this.foreNoonGsdId = 1;
      this.afterNoonGsdId = 2;
      this.staffService.createExam(apiBody).subscribe((res: any) => {
        if (res) {
          this.firstFormResponse = res;
          this.examId = this.firstFormResponse.id;
          stepper.next();
        }
      },
      err => {
          this.toastr.error('Please check the data', 'Error', { closeButton: true });
        console.log(err);
      });
    }
  }

  secondStepSubmit(stepper: MatStepper) {
    if (this.secondFormGroup.valid ) {
      const slotOneStart =
      ('0' + this.secondFormGroup.controls.timeHoursSlotOne.value).slice(-2)
      + ('0' + this.secondFormGroup.controls.timeMiutesSlotOne.value).slice(-2);

      const slotTwoStart =
      ('0' + this.secondFormGroup.controls.timeHoursSlotTwo.value).slice(-2)
      + ('0' + this.secondFormGroup.controls.timeMiutesSlotTwo.value).slice(-2);

      const durationSlotOne = this.secondFormGroup.controls.durationMiutesSlotOne.value;
      const durationSlotTwo = this.secondFormGroup.controls.durationMiutesSlotTwo.value;
      const apiBody = [
        {
          start: slotOneStart,
          duration: durationSlotOne,
          recess: false,
          grade: this.selectedGrade,
          status: 'ACTIVE',
          examId: this.examId
        },
        {
          start: slotTwoStart,
          duration: durationSlotTwo,
          recess: false,
          grade: this.selectedGrade,
          status: 'ACTIVE',
          examId: this.examId
        }
      ];
      this.staffService.createExamSlots(apiBody).subscribe((res: any) => {
        if (res) {
          this.foreNoonGsdId = res[0].id;
          this.afterNoonGsdId = res[1].id;
          stepper.next();
          this.secondFormGroup.reset();
        }
      });
    } else {
      console.log('invalid form');
    }
  }

  getCourseList(grade) {
    this.staffService.getCourseBySchoolInfoAndGrade(grade).subscribe((res) => {
      this.examCreationArray = [];
      if (res) {
        this.selectedGradeCourses = res;
        this.selectedGradeCourses.forEach(element => {
          this.examCreationArray.push({
            courseName: element.masterSubject,
            courseId: element.id,
            date: null,
            gsdId: null,
            saved: false,
            savedId: null
          });
        });
      }
    });
  }
  changed(e, index) {
    if (this.examCreationArray[index].date && this.examCreationArray[index].gsdId ) {
      const result1 = this.examCreationArray.filter(element =>
        (element.date === this.examCreationArray[index].date && element.gsdId === this.examCreationArray[index].gsdId));
      if ( result1.length > 1) {
        this.toastr.error('Two exams cannot have the same date and slot' , 'Error', { closeButton: true });
        setTimeout(() => {
          this.examCreationArray[index].date = null;
          this.examCreationArray[index].gsdId = null;
        }, 500);
      }
    }
  }

  getExamBuffferBoard() {
    this.examDays = [];
    const difference = moment(this.endDate).diff(this.startDate, 'd');
    let day = this.startDate;
    for (let i = 0; i <= difference; i++ ) {
      if (moment(day).format('ddd') !== 'Sun') {
        this.examDays.push({
          date: day
        });
      }
      day = moment(this.startDate).add( i + 1 , 'd').format('YYYY-MM-DD');
    }
    this.dataSource = new MatTableDataSource(this.examDays);
  }

  getDate(date) {
    return moment(date).format('Do MMM YYYY, dddd');
  }

  consoleForm(stepper: MatStepper) {
    let empty = false;
    const apibody = [];
    this.examCreationArray.forEach(element => {
      if (element.date && element.gsdId) {
        apibody.push({
          gsd: {id: element.gsdId},
          date: element.date,
          course: {id: element.courseId}
        });
      } else {
        empty = true;
      }
    });
    if (empty) {
      this.toastr.error('Please fill all the Slots' , 'Error', { closeButton: true });
    } else {
      // createExamCourseDetails POST
      this.staffService.createExamCourseDetails(apibody, this.examId).subscribe((res) => {
        if (res) {
          this.toastr.success('Exam Creation Completed Sussesfully', 'Success', { closeButton: true });
          stepper.reset();
          this.router.navigate(['/academics/exam']);
        }
      },
      err => {
        this.toastr.error('Something went wrong, Please call support' , 'Error', { closeButton: true });
      });
    }
  }

  getStandardList() {
    this.standardService.getStandardListBySchoolId().subscribe((res) => {
      let responseBody: any;
      responseBody = res;
      this.schoolClassList = [];
      responseBody.forEach(element => {
        if ( this.baseClassList.indexOf(element.grade) !== -1) {
          this.schoolClassList.push(element.grade);
        }
      });
      const x = (names) => names.filter((v, i) => names.indexOf(v) === i);
      const unique = x(this.schoolClassList);
      this.schoolClassList = unique;
    });
  }
}
