import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ExamService} from "../../_service/exam.service";

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

  constructor(private router:Router, private examService: ExamService) { }
examsData:Array<any>= [{}];
  ngOnInit() {
    this.examService.getExamsById()
      .subscribe((data) => {
        this.examsData = data;
        console.log("data"+JSON.stringify(this.examsData));
      });
  }

  goToExamCreation() {
    console.log("exams");
    this.router.navigate(['/academics/exams']);
  }

}
