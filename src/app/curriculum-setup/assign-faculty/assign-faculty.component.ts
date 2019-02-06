import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-time-table',
    templateUrl: './assign-faculty.component.html'
})
export class AssignFacultyComponent implements OnInit {
    changedVal;
    dataSource = [
        { master_subject: 'Maths', code: 'MAT_09', desc: 'qazxswedc', course: 'Maths', assigned: null },
        { master_subject: 'Maths', code: 'MAT_09', desc: 'qazxswedc', course: 'Maths', assigned: 'Chandu' },
        { master_subject: 'Maths', code: 'MAT_09', desc: 'qazxswedc', course: 'Maths', assigned: null },
        { master_subject: 'Maths', code: 'MAT_09', desc: 'qazxswedc', course: 'Maths', assigned: null },
        { master_subject: 'Maths', code: 'MAT_09', desc: 'qazxswedc', course: 'Maths', assigned: null },
        { master_subject: 'Maths', code: 'MAT_09', desc: 'qazxswedc', course: 'Maths', assigned: null },
        { master_subject: 'Maths', code: 'MAT_09', desc: 'qazxswedc', course: 'Maths', assigned: null }
    ];

    constructor() {
        for (const i in this.dataSource) {
            if (this.dataSource[i].assigned) {
                this.dataSource[i]['edit'] = false;
            } else {
                this.dataSource[i]['edit'] = true;
            }
        }
    }

    ngOnInit() {
        console.log('hello!');
    }
}
