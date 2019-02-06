import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable()
export class StandardService {
  constructor(private http: HttpClient) { }

  getStandardListBySchoolId(schoolId = 1) {
    return this.http.get<any>(`${environment.apiUrl}/api/standard/school-info/${schoolId}`);
  }

  updateStandard(standard) {
    return this.http.put<any>(`${environment.apiUrl}/api/standard`, standard)
      .pipe(map(res => {
        return res;
      }));
  }

  addNewStandard(standard) {
    return this.http.post<any>(`${environment.apiUrl}/api/standard`, standard)
      .pipe(map(res => {
        return res;
      }));
  }

  deleteStandard(standardId) {
    return this.http.delete<any>(`${environment.apiUrl}/api/standard/${standardId}`)
      .pipe(map(res => {
        return res;
      }));
  }

  createGSDs(gsds: any[]) {
    return this.http.post<any>(`${environment.apiUrl}/api/general-slot-details`, gsds)
      .pipe(map(res => {
        return res;
      }));
  }

  getActiveGSDsByStandardId(standardId) {
    return this.http.get<any>(`${environment.apiUrl}/api/general-slot-details/standard/${standardId}?status=ACTIVE`);
  }

  /*get general slot details*/
  getSCDByStandardId(standardId) {
    return this.http.get<any>(`${environment.apiUrl}/api/slot-course-details/standard/${standardId}`);
  }

  getCourseTeacherByStandardId(standardId) {
    return this.http.get<any>(`${environment.apiUrl}/api/course-teacher/standard/${standardId}`);
  }

  updateCourseTeacher(courseTeacher) {
    return this.http.put<any>(`${environment.apiUrl}/api/course-teacher`, courseTeacher)
      .pipe(map(res => {
        return res;
      }));
  }

  createCourseTeacher(courseTeacher) {
    return this.http.post<any>(`${environment.apiUrl}/api/course-teacher`, courseTeacher)
      .pipe(map(res => {
        return res;
      }));
  }
}
