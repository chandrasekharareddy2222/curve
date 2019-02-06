import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable()
export class SubjectService {
  constructor(private http: HttpClient) { }

  searchMasterSubject(masterSubject) {
    return this.http.get<any>(`${environment.apiUrl}/api/master-subject?like=${masterSubject}`);
  }

  getCoursesBySchoolInfoAndGrade(schoolInfo, grade) {
    return this.http.get<any>(`${environment.apiUrl}/api/course/school-info/${schoolInfo}/grade/${grade}`);
  }

  createCourse(course) {
    return this.http.post<any>(`${environment.apiUrl}/api/course`, course)
      .pipe(map(res => {
        return res;
      }));
  }

  updateCourse(course) {
    return this.http.put<any>(`${environment.apiUrl}/api/course`, course)
      .pipe(map(res => {
        return res;
      }));
  }

  deleteCourse(courseId) {
    return this.http.delete<any>(`${environment.apiUrl}/api/course/${courseId}`)
      .pipe(map(res => {
        return res;
      }));
  }
}
