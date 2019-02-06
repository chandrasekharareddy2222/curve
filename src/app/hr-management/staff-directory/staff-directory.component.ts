import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {StaffService} from '../../_service/staff.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-staff-directory',
  templateUrl: './staff-directory.component.html',
  styleUrls: ['./staff-directory.component.scss'],
})
export class StaffDirectoryComponent implements OnInit {
  staffList;
  displayedColumns: string[] = ['name', 'staffId', 'mob', 'courseType'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private staffService: StaffService, private router: Router) {}

  ngOnInit() {
    this.staffService.getStaffListBySchoolId()
      .subscribe((data) => {
        this.staffList = data;
        this.dataSource = new MatTableDataSource(this.staffList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setBG(bg) {
    if (bg) {
      const temp = bg.split('_');
      return temp[0] + (temp[1] === 'POSITIVE' ? '+' : '-');
    } else {
      return '';
    }
  }

  redirectToProfile(row) {
    this.router.navigate([`/hr_management/staff_directory/${row.id}`]);
  }
}
