import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-sections-select',
    templateUrl: './sections-select.component.html',
    styleUrls: [
        'sections-select.scss'
    ]
})
export class SectionsSelectComponent implements OnInit, OnChanges {
    @Input() sections = [{
        name: 'A',
        isSelected: true
    }, {
        name: 'B',
        isSelected: false
    }];
    allSectionsSelected = false;
    @Output() sectionChanged = new EventEmitter();

    ngOnInit() {}

    ngOnChanges(changes?: any) {
      if (changes.sections && changes.sections.currentValue) {
        if (this.checkForAnyUnSelectedSections(changes.sections.currentValue)) {
          this.allSectionsSelected = false;
        } else if (this.checkForAllSelectedSections(changes.sections.currentValue)) {
          this.allSectionsSelected = true;
        }
      }
    }

    checkForAnyUnSelectedSections(sections) {
      for (const section of sections) {
        if (!section.isSelected) {
          return true;
        }
      }
      return false;
    }

    checkForAllSelectedSections(sections) {
      for (const section of sections) {
        if (!section.isSelected) {
          return false;
        }
      }
      return true;
    }

    sectionChange(section) {
        section.isSelected = !section.isSelected;
        this.sectionChanged.emit(this.sections);
    }

    allSectionInput(event) {
        if (event.target.checked) {
          this.allSectionsSelected = true;
          for (const section of this.sections) {
            section.isSelected = true;
          }
        } else {
          this.allSectionsSelected = false;
          for (const section of this.sections) {
            section.isSelected = false;
          }
        }
    }
}
