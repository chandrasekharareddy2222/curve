import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ConfirmDeleteService} from '../../shared/confirm-delete/confirm-delete.service';
import {StandardService} from '../../_service/standard.service';

@Component({
    selector: 'app-add-class-section',
    templateUrl: './add-class-section.component.html',
    styleUrls: ['./add-class-section.scss']
})
export class AddClassSectionComponent implements OnInit {
    /*gradesList = {LKG:{grade: 'LKG',sections: [of sections]}*/
    gradesList = {};
    activeGrade;

    constructor(private toastr: ToastrService,
                private confirmDeleteService: ConfirmDeleteService,
                private standardService: StandardService) {}

    ngOnInit() {
      this.getGradeList();
      this.confirmDeleteService.confirmDelete.subscribe((section) => {
        this.removeSection(section);
      });
    }

    getGradeList() {
      this.standardService.getStandardListBySchoolId()
        .subscribe((data) => {
          this.updateGradesList(data);
        });
    }

    updateGradesList(data) {
      for (const standard of data) {
        if (!this.gradesList[standard.grade]) {
          this.gradesList[standard.grade] = {
            grade: standard.grade,
            sections: [],
            classTeacherId: standard.classTeacherId,
            school: {
              id: standard.schoolInfo.id
            },
          };
        }
        this.gradesList[standard.grade].sections.push({
          section: standard.section,
          grade: standard.grade,
          id: standard.id,
          classTeacherId: standard.classTeacherId,
          school: {
            id: standard.schoolInfo.id
          },
        });
      }
    }

    getGradeNames() {
      return Object.keys(this.gradesList);
    }

    setActiveGrade(selectedClass) {
      // @TODO change this only after getting backend response(for edit or delete section) or add a loader in page
      this.activeGrade = JSON.parse(JSON.stringify(selectedClass));
    }

    editSection(section) {
      for (const se of this.activeGrade.sections) {
        se.edit = false;
      }
      section.edit = true;
    }

    updateSection(section) {
      if (section.section) {
        this.standardService.updateStandard(section).subscribe((data) => {
          // this.gradesList[grade].sections[sectionIndex] = data;
          // section.edit = false;
          this.getGradeList();
          this.gradesList[section.grade].edit = true;
          this.setActiveGrade(this.gradesList[section.grade]);
          this.toastr.success('Section Name changed for class ' + section.grade, 'Success', { closeButton: true });
        }, error => {
          console.log(error);
          section.edit = false;
          this.toastr.error('Error while updating Section name', 'Error', { closeButton: true });
        });
      } else {
        this.toastr.error('Provide Section name', 'Error', { closeButton: true });
      }
    }

    deleteSection(section) {
      /*** send the object that you want to get in return after confirming delete in confirmDeleteService here as data***/
      this.confirmDeleteService.delete.emit({data: section, deleteMessage: 'section'});
    }

    removeSection(section) {
      this.standardService.deleteStandard(section.id).subscribe(() => {
        // this.gradesList[grade].sections[sectionIndex] = data;
        // section.edit = false;
        this.getGradeList();
        this.gradesList[section.grade].edit = true;
        this.setActiveGrade(this.gradesList[section.grade]);
        this.toastr.success('Section ' + section.section + ' Deleted for class ' +
          this.activeGrade.grade, 'Success', { closeButton: true });
      }, error => {
        console.log(error);
        this.toastr.error('Error while Deleting Section ' + section.name, 'Error', { closeButton: true });
      });
    }

    addNewSection(grade) {
      for (const se of this.activeGrade.sections) {
        se.edit = false;
      }
      const newSection = {
        section: null,
        add: true,
        grade: grade,
        classTeacherId: this.gradesList[grade].classTeacherId,
        school: this.gradesList[grade].school,
      };
      this.activeGrade.sections.push(newSection);
    }

    saveNewSection(section) {
      if (section.section) {
        this.standardService.addNewStandard(section).subscribe((data) => {
          // this.gradesList[grade].sections[sectionIndex] = data;
          // section.edit = false;
          this.getGradeList();
          this.gradesList[section.grade].edit = true;
          this.setActiveGrade(this.gradesList[section.grade]);
          this.toastr.success('Section ' + section.section + ' Added for class ' + this.activeGrade.grade, 'Success', {closeButton: true});
        }, error => {
          console.log(error);
          this.toastr.error('Error while updating Section name', 'Error', { closeButton: true });
          if (this.activeGrade.grade === section.grade) {
            this.activeGrade.sections.pop();
          }
        });
      } else {
        this.toastr.error('Provide Section name', 'Error', { closeButton: true });
      }
    }
}
