import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import {ConfirmDeleteService} from '../../shared/confirm-delete/confirm-delete.service';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith, switchMap, debounceTime, tap, finalize} from 'rxjs/operators';
import {SubjectService} from 'src/app/_service/subject.service';
import {AuthenticationService} from '../../_service/auth.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
    selector: 'app-add-subject-course',
    templateUrl: './subject-course.component.html',
    styleUrls: ['subject-course.scss']
})
export class SubjectCourseComponent implements OnInit, OnDestroy {
    courses;
    grade = 'III';
    userContext;
    schoolInfoId;
    course = {};
    subscriptionList: Subscription[] = [];

    filteredMasterSubjects = [];
    subjectCourseForm: FormGroup;
    newMasterSubject = false;

    displayedColumns: string[] = ['masterSubject', 'courseCode', 'description', 'actions'];
    dataSource: MatTableDataSource<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

  /*** confirmDeleteService is to show the popup for confirm delete***/
    constructor(private confirmDeleteService: ConfirmDeleteService,
                private subjectService: SubjectService,
                private authenticationService: AuthenticationService,
                private toastr: ToastrService,
                private fb: FormBuilder) {}

    ngOnInit() {
      this.userContext = this.authenticationService.getUserContext();
      this.schoolInfoId = this.userContext.currentAcademicSession.schoolInfo.id;
      this.setInitialCourse();
      this.getCourses();
      this.subscriptionList.push(
        this.confirmDeleteService.confirmDelete.subscribe((course) => {
          this.removeCourse(course);
        }),
      );
    }

    getCourses() {
      this.subjectService.getCoursesBySchoolInfoAndGrade(this.schoolInfoId, this.grade).subscribe((data) => {
        console.log(data);
        this.courses = data;
        this.dataSource = new MatTableDataSource(this.courses);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, (error) => {
        console.log(error);
      });
    }

    setInitialCourse() {
      this.course = {
        grade: this.grade,
        schoolInfoId: this.schoolInfoId,
      };
      this.autoPopulateMasterCode();
      this.newMasterSubject = false;
    }

    autoPopulateMasterCode() {
      this.subjectCourseForm = this.fb.group({
        'masterSubject': [this.course && this.course['masterSubject'] ? this.course['masterSubject'] : '', Validators.required],
        'courseCode': [this.course && this.course['courseCode'] ? this.course['courseCode'] : '', Validators.required],
        'description': [this.course && this.course['description'] ? this.course['description'] : ''],
      });

      this.subjectCourseForm
        .get('masterSubject')
        .valueChanges
        .pipe(
          switchMap(value => {
              console.log(value);
              if (value.length > 3) {
                return this.subjectService.searchMasterSubject(value);
              }
              this.newMasterSubject = false;
              return [];
            }
          )
        )
        .subscribe(masterSubjects => {
          this.filteredMasterSubjects = masterSubjects;
          this.newMasterSubject = this.checkForNewMasterSubject(masterSubjects);
        });
    }

    onSelectionChanged($event) {
      this.newMasterSubject = false;
    }

    checkForNewMasterSubject(masterSubjects) {
      for (const subject of masterSubjects) {
        if (subject.name === this.subjectCourseForm.get('masterSubject').value) {
          return false;
        }
      }
      return true;
    }

    displayFn(subject): string | undefined {
      return subject.name ? subject.name : subject;
    }

    private _filter(name: string) {
      const filterValue = name.toLowerCase();
      this.subjectService.searchMasterSubject(name).subscribe((data) => {
        return data;
      });
    }

    markFormGroupTouched(formGroup: FormGroup) {
      (<any>Object).values(formGroup.controls).forEach(control => {
        control.markAsTouched();

        if (control.controls) {
          this.markFormGroupTouched(control);
        }
      });
    }

    saveSectionDetails() {
      if (!this.subjectCourseForm.valid) {
        this.markFormGroupTouched(this.subjectCourseForm);
        return
      }
      this.course = this.course || {};
      this.course = Object.assign(this.course, this.subjectCourseForm.value);
      this.course['masterSubject'] = this.subjectCourseForm.get('masterSubject').value.name;

      if (this.course['id']) {
        //update course course code should be here
        this.subjectService.updateCourse(this.course).subscribe((data) => {
          this.toastr.success('Course Updated', 'Success', { closeButton: true });
          this.getCourses();
        }, (error) => {
          console.log(error);
          this.toastr.error('Error while updating Course', 'Error', { closeButton: true });
        });
      } else {
          this.subjectService.createCourse(this.course).subscribe((data) => {
            this.toastr.success('Course Added', 'Success', { closeButton: true });
            this.getCourses();
          }, (error) => {
            console.log(error);
            this.toastr.error('Error while adding Course', 'Error', { closeButton: true });
          });
      }
      this.setInitialCourse();
    }

    cancelSectionDetails() {
      this.setInitialCourse();
    }

    editCourse(course) {
      this.course = Object.assign({}, course);
      this.autoPopulateMasterCode();
    }

    deleteCourse(course) {
      /*** send the object that you want to get in return after confirming delete in confirmDeleteService here as data***/
      this.confirmDeleteService.delete.emit({data: course, deleteMessage: 'course'});
    }

    removeCourse(course) {
      this.subjectService.deleteCourse(course.id).subscribe((data) => {
        this.toastr.success('Course Deleted', 'Success', { closeButton: true });
        this.getCourses();
      }, (error) => {
        console.log(error);
        this.toastr.error('Error while deleting Course', 'Error', { closeButton: true });
      });
    }

    ngOnDestroy() {
      this.subscriptionList.forEach((s) => s.unsubscribe());
      this.subscriptionList = [];
    }
}
