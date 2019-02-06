import { Component, OnInit } from '@angular/core';
import {StaffService} from '../../_service/staff.service';
import * as moment from 'moment';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent implements OnInit {
  staffInfo: any;
  staffDBId;
  formType = 'add';
  employeeFormGroup: FormGroup;
  empPayrollFG: FormGroup;

  constructor(private staffService: StaffService,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private fbuilder: FormBuilder) {
    this.route.params.subscribe(params => {
      if (params && params.id) {
        this.formType = 'edit';
        this.staffDBId = params.id;
        this.staffService.getStaffDetailById(this.staffDBId).subscribe(info => {
          this.staffInfo = info;
          this.initializeForm();
          this.initializePayroll();
        });
      }
    });
  }

  ngOnInit() {
    if (this.formType !== 'edit') {
      this.initializeForm();
      this.initializePayroll();
    }
  }

  initializeForm() {
    this.employeeFormGroup = this.fbuilder.group({
      'firstName': [this.staffInfo ? this.staffInfo.firstName : '', Validators.required],
      'middleName': [this.staffInfo ? this.staffInfo.middleName : ''],
      'lastName': [this.staffInfo ? this.staffInfo.lastName : '', Validators.required],
      'staffId': [this.staffInfo ? this.staffInfo.staffId : '', Validators.required],
      'bloodGroup': [this.staffInfo ? this.staffInfo.bloodGroup : 'O_POSITIVE', Validators.required],
      'type': [this.staffInfo ? this.staffInfo.type : 'TEACHING', Validators.required],
      'address1': [this.staffInfo ? this.staffInfo.address1 : '', Validators.required],
      'address2': [this.staffInfo ? this.staffInfo.address2 : '', Validators.required],
      'city': [this.staffInfo ? this.staffInfo.city : '', Validators.required],
      'district': [this.staffInfo ? this.staffInfo.district : '', Validators.required],
      'state': [this.staffInfo ? this.staffInfo.state : '', Validators.required],
      'country': [this.staffInfo ? this.staffInfo.country : '', Validators.required],
      'pincode': [this.staffInfo ? this.staffInfo.pincode : '', Validators.required],
      'joiningDate': [this.staffInfo ? new Date(this.staffInfo.joiningDate) : '', Validators.required],
      'dateOfBirth': [this.staffInfo ? new Date(this.staffInfo.dateOfBirth) : '', Validators.required],
      'primaryPhone': [this.staffInfo ? this.staffInfo.primaryPhone : '', [Validators.required, Validators.pattern('(6|7|8|9)\\d{9}')]],
      'secondaryPhone': [this.staffInfo ? this.staffInfo.secondaryPhone : '', [Validators.required, Validators.pattern('(6|7|8|9)\\d{9}')]],
    });
  }

  initializePayroll() {
    this.empPayrollFG = this.fbuilder.group({
      'basicSalary': [0],
      'houseRentAllowance': [0],
      'conveyanceAllowance': [0],
      'medicalAllowance': [0],
      'managerialAllowance': [0],
      'leaveTravelAllowance': [0],
      'providentFund': [0],
      'professionalTax': [0],
      'incomeTax': [0]
    });
  }

  getErrorMessage(prop) {
    console.log(this.employeeFormGroup.get(prop).errors);
    const err = this.employeeFormGroup.get(prop).errors;
    if (err.required) {
      return 'This is a required field';
    } else if (err.pattern) {
      return 'Invalid Input';
    }

    return 'err';
  }

  getErrorMessageP(prop) {
    const err = this.empPayrollFG.get(prop).errors;
    if (err) {
      return 'err';
    }
  }

  addUpdateStaff() {
    const uc = JSON.parse(localStorage.getItem('user_context'));
    this.staffInfo = this.staffInfo || {};
    this.staffInfo = Object.assign(this.staffInfo, this.employeeFormGroup.value);
    this.staffInfo['joiningDate'] = moment(this.staffInfo['joiningDate']).format('YYYY-MM-DD');
    this.staffInfo['dateOfBirth'] = moment(this.staffInfo['dateOfBirth']).format('YYYY-MM-DD');

    if (this.staffDBId) {
      this.staffService.updateStaff(this.staffInfo).subscribe(data => {
        this.toastr.success('Staff Updated', 'Success', { closeButton: true });
      });
    } else {
      this.staffInfo['schoolInfo'] = {};
      this.staffInfo['schoolInfo']['id'] = uc.currentUser.staffDTO.schoolInfo.id;

      if (this.employeeFormGroup.valid) {
        this.staffService.createStaff(this.staffInfo).subscribe(data => {
          console.log(data);
          this.staffInfo = data;
          this.staffDBId = data.id;
          this.toastr.success('New Staff Created', 'Success', { closeButton: true });
        }, error => {
          this.toastr.error(error, 'Error', { closeButton: true });
        });
      } else {
        this.toastr.error('Form Invalid', 'Error', { closeButton: true });
      }
    }
  }

}
