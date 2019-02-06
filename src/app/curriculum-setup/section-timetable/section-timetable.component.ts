import {Component, HostListener, OnInit} from '@angular/core';
import {StandardService} from '../../_service/standard.service';
import {Observable} from 'rxjs/Observable';
import {forkJoin} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {GlobalService} from '../../_service/global.service';

@Component({
    selector: 'app-section-timetable',
    templateUrl: './section-timetable.component.html',
    styleUrls: ['./section-timetable.scss']
})
export class SectionTimetableComponent implements OnInit {
    timeTableList = [];
    activatedPeriod;
    activatedPeriodCopy;
    courseTeacher = {};
    standardCourseTeachersObj = [];
    // TODO change the below standardId based on class, section selection
    standardId =  5;
    daysOfWeek = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

    constructor(private toastr: ToastrService,
                private standardService: StandardService,
                private globalService: GlobalService) {}

    ngOnInit() {
      this.requestDataFromMultipleSources().subscribe(responseList => {
        this.updateTimetableList(responseList[0]);
        this.standardCourseTeachersObj = responseList[1];
        this.updateCourseTeacherList(responseList[1]);
        this.updateCourseTeacherDetailsInTimetableList(responseList[2]);
      });
    }

    requestDataFromMultipleSources(): Observable<any[]> {
      const response1 = this.standardService.getActiveGSDsByStandardId(this.standardId);
      const response2 = this.standardService.getCourseTeacherByStandardId(this.standardId);
      const response3 = this.standardService.getSCDByStandardId(this.standardId);
      return forkJoin([response1, response2, response3]);
    }

    updateTimetableList(data) {
      this.timeTableList = [];
      for (const dt of data) {
        const stTime = this.globalService.convertTimeValuetoTime(dt.start);
        const endTime = this.globalService.addDurationToTime(stTime, dt.duration);
        const timeTable = {
          startTime: dt.start,
          label: `${stTime} - ${endTime}`,
          gsdId: dt.id,
          recess: dt.recess,
          details: {},
        };
        if (!dt.recess) {
          for (const dayOfWeek of this.daysOfWeek) {
            timeTable['details'][dayOfWeek] = {
              'courseId': null,
              'courseCode': null,
              'teacherId': null,
              'teacherName': null,
              'courseEdit': false,
              'teacherEdit': false,
              'gsdId': dt.id,
            };
          }
        }
        this.timeTableList.push(timeTable);
      }
      // console.log(this.timeTableList);
    }

    updateCourseTeacherDetailsInTimetableList(scdData) {
      for (const scd of scdData) {
        for (const timeTable of this.timeTableList) {
          if (scd.gsd && scd.gsd.id === timeTable.gsdId) {
            const courseTeacherObj = this.getCourseTeacherById(scd.courseTeacher.id);
            timeTable.courseTeacherId = courseTeacherObj.id;
            timeTable['details'][scd.dayOfWeek] = {
              'courseId': (courseTeacherObj && courseTeacherObj.course) ? courseTeacherObj.course.id : null,
              'courseCode': (courseTeacherObj && courseTeacherObj.course) ? courseTeacherObj.course.courseCode : null,
              'teacherId': (courseTeacherObj && courseTeacherObj.teacher) ? courseTeacherObj.teacher.id : null,
              'teacherName': (courseTeacherObj && courseTeacherObj.teacher) ?
                `${courseTeacherObj.teacher.firstName} ${courseTeacherObj.teacher.lastName}` : null,
              'courseEdit': false,
              'teacherEdit': false,
              'gsdId': scd.gsd.id,
              'courseTeacherId': courseTeacherObj.id,
            };
            break;
          }
        }
      }
    }

    getCourseTeacherById(courseTeacherId) {
      for (const courseTeacher of this.standardCourseTeachersObj) {
        if (courseTeacherId === courseTeacher.id) {
          return courseTeacher;
        }
      }
    }

    updateCourseTeacherList(data) {
      for (const ct of data) {
        if (!this.courseTeacher[ct.course.id]) {
          this.courseTeacher[ct.course.id] = {};
          this.courseTeacher[ct.course.id]['courseTeacherId'] = ct.course.id;
          this.courseTeacher[ct.course.id]['courseCode'] = ct.course.courseCode;
          this.courseTeacher[ct.course.id]['masterSubject'] = ct.course.masterSubject;
          if (!this.courseTeacher[ct.course.id]['teachers']) {
            this.courseTeacher[ct.course.id]['teachers'] = [];
          }
          const teacherObj = {
            id: ct.teacher.id,
            firstName: ct.teacher.firstName,
            middleName: ct.teacher.middleName,
            lastName: ct.teacher.lastName,
          };
          this.courseTeacher[ct.course.id]['teachers'].push(teacherObj);
        }
      }
    }

    @HostListener('document:click', ['$event'])
    clickedOutside() {
        if (this.activatedPeriod) {
            const period = this.activatedPeriod.period;
            const day = this.activatedPeriod.day;

            /*course*/
            // this.timeTableList[activePeriodIndex].details[day].courseId = this.activatedPeriodCopy.courseId;
            // this.timeTableList[activePeriodIndex].details[day].courseEdit = false;
            // /*teacher*/
            // this.timeTableList[activePeriodIndex].details[day].teacherId = this.activatedPeriodCopy.teacherId;
            // this.timeTableList[activePeriodIndex].details[day].teacherEdit = false;
        }
    }

    sendDetailsForToolTip(timeTable, day) {
        this.activatedPeriod = {};
        this.activatedPeriod = Object.assign({}, timeTable.details[day]);
        this.activatedPeriod.period = timeTable.startTime;
        this.activatedPeriod.day = day;
        this.activatedPeriodCopy = Object.assign({}, this.activatedPeriod);
    }

    isCourseAndTeacherAvailable(timeTable, day) {
      const details = timeTable.details[day];
        if ((details.courseId || details.courseId === 0) && (details.teacherId || details.teacherId === 0)) {
          return true;
        } else {
          return false;
        }
    }

    getKeysFromObj(obj) {
        return Object.keys(obj);
    }

    clickedOnCourse($event) {
        $event.preventDefault();
        $event.stopPropagation();
    }

    updateCourseTeacherDetails() {
      this.standardService.getSCDByStandardId(this.standardId).subscribe(data => {
        this.updateCourseTeacherDetailsInTimetableList(data);
      });
    }

    saveSectionDetails($event) {
        $event.preventDefault();
        $event.stopPropagation();

        this.activatedPeriodCopy = Object.assign({}, this.activatedPeriod);
        if (this.activatedPeriod.courseTeacherId) {
          const courseTeacher = {
            id: this.activatedPeriod.courseTeacherId,
            teacher: {
              id: this.activatedPeriod.teacherId,
            }, course: {
              id: this.activatedPeriod.courseId,
            }, standard: {
              id: this.standardId,
            }, active: true
          };
          this.standardService.updateCourseTeacher(courseTeacher).subscribe((data) => {
            // console.log(data);
            this.updateCourseTeacherDetails();
            this.toastr.success('Updated Course, Teacher', 'Success', { closeButton: true });
          }, error => {
            console.log(error);
            this.toastr.error('Error while updating Course, Teacher', 'Success', { closeButton: true });
          });
        } else {
          const courseTeacher = {
            teacher: {
              id: this.activatedPeriod.teacherId,
            }, course: {
              id: this.activatedPeriod.courseId,
            }, standard: {
              id: this.standardId,
            }
          };
          this.standardService.createCourseTeacher(courseTeacher).subscribe((data) => {
            // console.log(data);
            this.updateCourseTeacherDetails();
            this.toastr.success('Added Course, Teacher', 'Success', { closeButton: true });
          }, error => {
            console.log(error);
            this.toastr.error('Error while adding Course, Teacher', 'Success', { closeButton: true });
          });
        }
        document.getElementById('timetable-th-0').click();
    }
}
