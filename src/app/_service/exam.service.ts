import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import * as moment from 'moment';
import {AuthenticationService} from './auth.service';

@Injectable()
export class ExamService { 
    constructor(private http: HttpClient, private authService: AuthenticationService) {}

    getExamsById(Id = 1004) {
        return this.http.get<any>(`${environment.apiUrl}/api/exams/${Id}`);
      }
}