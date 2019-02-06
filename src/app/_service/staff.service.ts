import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import * as moment from 'moment';
import {AuthenticationService} from './auth.service';

@Injectable()
export class StaffService {
  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  getStaffListBySchoolId(schoolId = 1) {
    return this.http.get<any>(`${environment.apiUrl}/api/staff/schools/${schoolId}`);
  }

  getStaffDetailById(id) {
    return this.http.get<any>(`${environment.apiUrl}/api/staff/${id}`);
  }

  getStaffAttendanceForfullYearById(id) {
    const toDate = moment().format('YYYY-MM-DD');
    const fromDate = moment().subtract(396, 'days').format('YYYY-MM-DD');
    return this.http.get<any>(`${environment.apiUrl}/api/event/attendance?fromDate=${fromDate}&toDate=${toDate}&staffId=${id}`);
  }

  getStaffAttendanceById(id) {
    const toDate = moment().format('YYYY-MM-DD');
    const fromDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
    return this.http.get<any>(`${environment.apiUrl}/api/event/attendance?fromDate=${fromDate}&toDate=${toDate}&staffId=${id}`);
  }

  getStaffPayrollById(id) {
    return this.http.get<any>(`${environment.apiUrl}/api/payroll-details/${id}`);
  }

  createStaff(staff) {
    return this.http.post<any>(`${environment.apiUrl}/api/staff`, staff);
  }

  updateStaff(staff) {
    return this.http.put<any>(`${environment.apiUrl}/api/staff`, staff);
  }

  getActivityLog(id, io, type) {
    if (io === 'inbox') {
      return this.http.get<any>(`${environment.apiUrl}/api/message-thread/user/${id}/inbox?type=${type}`);
    } else {
      return this.http.get<any>(`${environment.apiUrl}/api/message-thread/user/${id}/outbox?type=${type}`);
    }
  }

  getResponsibilitiesByStaffId(id) {
    return this.http.get<any>(`${environment.apiUrl}/api/course-teacher/teacher/${id}`);
  }

  getLeaveLettersByStaffId(id) {
    return this.http.get<any>(`${environment.apiUrl}/api/leave-application/staff/${id}?sessionId=1`);
  }

  getAttendanceForSchoolInfo(date) {
    const uc = this.authService.getUserContext();
    const scId = uc.currentUser.staffDTO.schoolInfo.id;
    const toDate = moment(date).format('YYYY-MM-DD');
    const fromDate = moment(date).subtract(14, 'days').format('YYYY-MM-DD');
    return this.http.get<any>(`${environment.apiUrl}/api/event/attendance?fromDate=${fromDate}&toDate=${toDate}&schoolInfoId=${scId}`);
  }

  getTodaysAttendance() {
    const uc = this.authService.getUserContext();
    const scId = uc.currentUser.staffDTO.schoolInfo.id;
    const toDate = moment().format('YYYY-MM-DD');
    const fromDate = moment().format('YYYY-MM-DD');

    return this.http.get<any>(`${environment.apiUrl}/api/event/attendance?fromDate=${fromDate}&toDate=${toDate}&schoolInfoId=${scId}`);
  }

  takeAttendance(attData) {
    return this.http.post<any>(`${environment.apiUrl}/api/event`, attData);
  }

  updateAttendance(attData) {
    return this.http.put<any>(`${environment.apiUrl}/api/event`, attData);
  }

  getAllPendingStaffLeaveLetters() {
    const uc = this.authService.getUserContext();
    const scId = uc.currentUser.staffDTO.schoolInfo.id;
    const toDate = moment().format('YYYY-MM-DD');
    const fromDate = moment().subtract(365, 'days').format('YYYY-MM-DD');

    return this.http
      .get(`${environment.apiUrl}/api/leave-application?fromDate=${fromDate}&toDate=${toDate}&schoolInfoId=${scId}&status=PENDING`);
  }

  approveDeclineLeaveRequest(leaveReq) {
    return this.http.put(`${environment.apiUrl}/api/leave-application`, leaveReq);
  }

  createExam(body) {
    return this.http.post<any>(`${environment.apiUrl}/api/exams`, body);
  }

  getCourseBySchoolInfoAndGrade(grade, schoolId = 1) {
    return this.http.get<any>(`${environment.apiUrl}/api/course/school-info/${schoolId}/grade/${grade}`);
  }

  createExamSlots(body) {
    return this.http.post<any>(`${environment.apiUrl}/api/general-slot-details?exam=true`, body);
  }

  createExamCourseDetails(body, examId) {
    return this.http.post<any>(`${environment.apiUrl}/api/exam-course-details/exams/${examId}`, body);
  }

  updateExamCourseDetails(body, examId) {
    return this.http.put<any>(`${environment.apiUrl}/api/exam-course-details/exams/${examId}`, body);
  }

}
