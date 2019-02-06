import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

export const csList = [
  {
    'createdBy': 'staff',
    'createdDate': '2018-12-03T17:12:48.095Z',
    'lastModifiedBy': 'staff',
    'id': 1,
    'grade': 'I',
    'section': 'A',
    'classTeacherId': 1,
    'term': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1
    },
    'schoolInfo': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1,
      'school': {
        'createdDate': '2019-01-11T06:07:35.252Z',
        'lastModifiedDate': '2019-01-11T06:07:35.252Z',
        'id': 1
      }
    }
  },
  {
    'createdBy': 'staff',
    'createdDate': '2018-12-03T17:12:48.095Z',
    'lastModifiedBy': 'staff',
    'id': 2,
    'grade': 'I',
    'section': 'B',
    'classTeacherId': 2,
    'term': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1
    },
    'schoolInfo': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1,
      'school': {
        'createdDate': '2019-01-11T06:07:35.252Z',
        'lastModifiedDate': '2019-01-11T06:07:35.252Z',
        'id': 1
      }
    }
  },
  {
    'createdBy': 'staff',
    'createdDate': '2018-12-03T17:12:48.095Z',
    'lastModifiedBy': 'staff',
    'id': 3,
    'grade': 'II',
    'section': 'B',
    'classTeacherId': 4,
    'term': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1
    },
    'schoolInfo': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1,
      'school': {
        'createdDate': '2019-01-11T06:07:35.252Z',
        'lastModifiedDate': '2019-01-11T06:07:35.252Z',
        'id': 1
      }
    }
  },
  {
    'createdBy': 'staff',
    'createdDate': '2018-12-03T17:12:48.095Z',
    'lastModifiedBy': 'staff',
    'id': 4,
    'grade': 'II',
    'section': 'A',
    'classTeacherId': 6,
    'term': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1
    },
    'schoolInfo': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1,
      'school': {
        'createdDate': '2019-01-11T06:07:35.252Z',
        'lastModifiedDate': '2019-01-11T06:07:35.252Z',
        'id': 1
      }
    }
  },
  {
    'createdBy': 'staff',
    'createdDate': '2018-12-03T17:12:48.095Z',
    'lastModifiedBy': 'staff',
    'id': 5,
    'grade': 'III',
    'section': 'A',
    'classTeacherId': 9,
    'term': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1
    },
    'schoolInfo': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1,
      'school': {
        'createdDate': '2019-01-11T06:07:35.252Z',
        'lastModifiedDate': '2019-01-11T06:07:35.252Z',
        'id': 1
      }
    }
  },
  {
    'createdBy': 'staff',
    'createdDate': '2018-12-03T17:12:48.095Z',
    'lastModifiedBy': 'staff',
    'id': 6,
    'grade': 'III',
    'section': 'B',
    'classTeacherId': 10,
    'term': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1
    },
    'schoolInfo': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1,
      'school': {
        'createdDate': '2019-01-11T06:07:35.252Z',
        'lastModifiedDate': '2019-01-11T06:07:35.252Z',
        'id': 1
      }
    }
  },
  {
    'createdBy': 'staff',
    'createdDate': '2018-12-03T17:12:48.095Z',
    'lastModifiedBy': 'staff',
    'id': 7,
    'grade': 'IV',
    'section': 'A',
    'classTeacherId': 11,
    'term': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1
    },
    'schoolInfo': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1,
      'school': {
        'createdDate': '2019-01-11T06:07:35.252Z',
        'lastModifiedDate': '2019-01-11T06:07:35.252Z',
        'id': 1
      }
    }
  },
  {
    'createdBy': 'staff',
    'createdDate': '2018-12-03T17:12:48.095Z',
    'lastModifiedBy': 'staff',
    'id': 8,
    'grade': 'IV',
    'section': 'B',
    'classTeacherId': 13,
    'term': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1
    },
    'schoolInfo': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1,
      'school': {
        'createdDate': '2019-01-11T06:07:35.252Z',
        'lastModifiedDate': '2019-01-11T06:07:35.252Z',
        'id': 1
      }
    }
  },
  {
    'createdBy': 'staff',
    'createdDate': '2018-12-03T17:12:48.095Z',
    'lastModifiedBy': 'staff',
    'id': 9,
    'grade': 'V',
    'section': 'B',
    'classTeacherId': 14,
    'term': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1
    },
    'schoolInfo': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1,
      'school': {
        'createdDate': '2019-01-11T06:07:35.252Z',
        'lastModifiedDate': '2019-01-11T06:07:35.252Z',
        'id': 1
      }
    }
  },
  {
    'createdBy': 'staff',
    'createdDate': '2018-12-03T17:12:48.095Z',
    'lastModifiedBy': 'staff',
    'id': 10,
    'grade': 'V',
    'section': 'A',
    'classTeacherId': 15,
    'term': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1
    },
    'schoolInfo': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1,
      'school': {
        'createdDate': '2019-01-11T06:07:35.252Z',
        'lastModifiedDate': '2019-01-11T06:07:35.252Z',
        'id': 1
      }
    }
  },
  {
    'createdBy': 'staff',
    'createdDate': '2018-12-03T17:12:48.095Z',
    'lastModifiedBy': 'staff',
    'id': 11,
    'grade': 'VI',
    'section': 'A',
    'classTeacherId': 16,
    'term': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1
    },
    'schoolInfo': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1,
      'school': {
        'createdDate': '2019-01-11T06:07:35.252Z',
        'lastModifiedDate': '2019-01-11T06:07:35.252Z',
        'id': 1
      }
    }
  },
  {
    'createdBy': 'staff',
    'createdDate': '2018-12-03T17:12:48.095Z',
    'lastModifiedBy': 'staff',
    'id': 12,
    'grade': 'VII',
    'section': 'A',
    'classTeacherId': 17,
    'term': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1
    },
    'schoolInfo': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1,
      'school': {
        'createdDate': '2019-01-11T06:07:35.252Z',
        'lastModifiedDate': '2019-01-11T06:07:35.252Z',
        'id': 1
      }
    }
  },
  {
    'createdBy': 'staff',
    'createdDate': '2018-12-03T17:12:48.095Z',
    'lastModifiedBy': 'staff',
    'id': 13,
    'grade': 'VII',
    'section': 'B',
    'classTeacherId': 18,
    'term': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1
    },
    'schoolInfo': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1,
      'school': {
        'createdDate': '2019-01-11T06:07:35.252Z',
        'lastModifiedDate': '2019-01-11T06:07:35.252Z',
        'id': 1
      }
    }
  },
  {
    'createdBy': 'staff',
    'createdDate': '2018-12-03T17:12:48.095Z',
    'lastModifiedBy': 'staff',
    'id': 14,
    'grade': 'VI',
    'section': 'B',
    'classTeacherId': 19,
    'term': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1
    },
    'schoolInfo': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1,
      'school': {
        'createdDate': '2019-01-11T06:07:35.252Z',
        'lastModifiedDate': '2019-01-11T06:07:35.252Z',
        'id': 1
      }
    }
  },
  {
    'createdBy': 'staff',
    'createdDate': '2018-12-03T17:12:48.095Z',
    'lastModifiedBy': 'staff',
    'id': 17,
    'grade': 'VIII',
    'section': 'A',
    'classTeacherId': 26,
    'term': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1
    },
    'schoolInfo': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1,
      'school': {
        'createdDate': '2019-01-11T06:07:35.252Z',
        'lastModifiedDate': '2019-01-11T06:07:35.252Z',
        'id': 1
      }
    }
  },
  {
    'createdBy': 'staff',
    'createdDate': '2018-12-03T17:12:48.095Z',
    'lastModifiedBy': 'staff',
    'id': 18,
    'grade': 'VIII',
    'section': 'B',
    'classTeacherId': 29,
    'term': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1
    },
    'schoolInfo': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1,
      'school': {
        'createdDate': '2019-01-11T06:07:35.252Z',
        'lastModifiedDate': '2019-01-11T06:07:35.252Z',
        'id': 1
      }
    }
  },
  {
    'createdBy': 'staff',
    'createdDate': '2018-12-03T17:12:48.095Z',
    'lastModifiedBy': 'staff',
    'id': 19,
    'grade': 'IX',
    'section': 'A',
    'classTeacherId': 12,
    'term': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1
    },
    'schoolInfo': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1,
      'school': {
        'createdDate': '2019-01-11T06:07:35.252Z',
        'lastModifiedDate': '2019-01-11T06:07:35.252Z',
        'id': 1
      }
    }
  },
  {
    'createdBy': 'staff',
    'createdDate': '2018-12-03T17:12:48.095Z',
    'lastModifiedBy': 'staff',
    'id': 20,
    'grade': 'IX',
    'section': 'B',
    'classTeacherId': 27,
    'term': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1
    },
    'schoolInfo': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1,
      'school': {
        'createdDate': '2019-01-11T06:07:35.252Z',
        'lastModifiedDate': '2019-01-11T06:07:35.252Z',
        'id': 1
      }
    }
  },
  {
    'createdBy': 'staff',
    'createdDate': '2018-12-03T17:12:48.095Z',
    'lastModifiedBy': 'staff',
    'id': 21,
    'grade': 'X',
    'section': 'B',
    'classTeacherId': 28,
    'term': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1
    },
    'schoolInfo': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1,
      'school': {
        'createdDate': '2019-01-11T06:07:35.252Z',
        'lastModifiedDate': '2019-01-11T06:07:35.252Z',
        'id': 1
      }
    }
  },
  {
    'createdBy': 'staff',
    'createdDate': '2018-12-03T17:12:48.095Z',
    'lastModifiedBy': 'staff',
    'id': 22,
    'grade': 'X',
    'section': 'A',
    'classTeacherId': 22,
    'term': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1
    },
    'schoolInfo': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1,
      'school': {
        'createdDate': '2019-01-11T06:07:35.252Z',
        'lastModifiedDate': '2019-01-11T06:07:35.252Z',
        'id': 1
      }
    }
  },
  {
    'createdBy': 'staff',
    'createdDate': '2018-12-03T17:12:48.095Z',
    'lastModifiedBy': 'staff',
    'id': 23,
    'grade': 'XI',
    'section': 'A',
    'classTeacherId': 23,
    'term': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1
    },
    'schoolInfo': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1,
      'school': {
        'createdDate': '2019-01-11T06:07:35.252Z',
        'lastModifiedDate': '2019-01-11T06:07:35.252Z',
        'id': 1
      }
    }
  },
  {
    'createdBy': 'staff',
    'createdDate': '2018-12-03T17:12:48.095Z',
    'lastModifiedBy': 'staff',
    'id': 24,
    'grade': 'XI',
    'section': 'B',
    'classTeacherId': 24,
    'term': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1
    },
    'schoolInfo': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1,
      'school': {
        'createdDate': '2019-01-11T06:07:35.252Z',
        'lastModifiedDate': '2019-01-11T06:07:35.252Z',
        'id': 1
      }
    }
  },
  {
    'createdBy': 'staff',
    'createdDate': '2018-12-03T17:12:48.095Z',
    'lastModifiedBy': 'staff',
    'id': 25,
    'grade': 'XII',
    'section': 'A',
    'classTeacherId': 20,
    'term': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1
    },
    'schoolInfo': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1,
      'school': {
        'createdDate': '2019-01-11T06:07:35.252Z',
        'lastModifiedDate': '2019-01-11T06:07:35.252Z',
        'id': 1
      }
    }
  },
  {
    'createdBy': 'staff',
    'createdDate': '2018-12-03T17:12:48.095Z',
    'lastModifiedBy': 'staff',
    'id': 26,
    'grade': 'XII',
    'section': 'B',
    'classTeacherId': 3,
    'term': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1
    },
    'schoolInfo': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1,
      'school': {
        'createdDate': '2019-01-11T06:07:35.252Z',
        'lastModifiedDate': '2019-01-11T06:07:35.252Z',
        'id': 1
      }
    }
  },
  {
    'createdBy': 'staff',
    'createdDate': '2018-12-03T17:12:48.095Z',
    'lastModifiedBy': 'staff',
    'id': 27,
    'grade': 'LKG',
    'section': 'I',
    'classTeacherId': 31,
    'term': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1
    },
    'schoolInfo': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1,
      'school': {
        'createdDate': '2019-01-11T06:07:35.252Z',
        'lastModifiedDate': '2019-01-11T06:07:35.252Z',
        'id': 1
      }
    }
  },
  {
    'createdBy': 'staff',
    'createdDate': '2018-12-03T17:12:48.095Z',
    'lastModifiedBy': 'staff',
    'id': 28,
    'grade': 'LKG',
    'section': 'II',
    'classTeacherId': 32,
    'term': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1
    },
    'schoolInfo': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1,
      'school': {
        'createdDate': '2019-01-11T06:07:35.252Z',
        'lastModifiedDate': '2019-01-11T06:07:35.252Z',
        'id': 1
      }
    }
  },
  {
    'createdBy': 'staff',
    'createdDate': '2018-12-03T17:12:48.095Z',
    'lastModifiedBy': 'staff',
    'id': 29,
    'grade': 'UKG',
    'section': 'II',
    'classTeacherId': 33,
    'term': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1
    },
    'schoolInfo': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1,
      'school': {
        'createdDate': '2019-01-11T06:07:35.252Z',
        'lastModifiedDate': '2019-01-11T06:07:35.252Z',
        'id': 1
      }
    }
  },
  {
    'createdBy': 'staff',
    'createdDate': '2018-12-03T17:12:48.095Z',
    'lastModifiedBy': 'staff',
    'id': 30,
    'grade': 'UKG',
    'section': 'I',
    'classTeacherId': 34,
    'term': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1
    },
    'schoolInfo': {
      'createdDate': '2019-01-11T06:07:35.252Z',
      'lastModifiedDate': '2019-01-11T06:07:35.252Z',
      'id': 1,
      'school': {
        'createdDate': '2019-01-11T06:07:35.252Z',
        'lastModifiedDate': '2019-01-11T06:07:35.252Z',
        'id': 1
      }
    }
  }
];

@Component({
  selector: 'select-class-section',
  templateUrl: './select-class-section.component.html',
  styleUrls: [
    'select-class-section.component.scss'
  ]
})
export class SelectClassSectionComponent {
  csRaw = csList;
  gradeList;
  csFormatted;
  selectedCS;
  constructor(public dialog: MatDialog) {
    this.formatCSRaw();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SelectCSDialog, {
      width: '400px',
      data: {csFormatted: this.csFormatted}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.selectedCS = result;
    });
  }

  formatCSRaw() {
    const gradeList = [];
    const csFormatted = [];
    for (const cs of this.csRaw) {
      if (gradeList.indexOf(cs.grade) === -1) {
        gradeList.push(cs.grade);
      }
    }

    for (const gr of gradeList) {
      const sectionList = [];
      for (const cs of this.csRaw) {
        if (cs.grade === gr) {
          sectionList.push({section: cs.section, isSelected: false});
        }
      }
      csFormatted.push({grade: gr, sections: sectionList});
    }

    this.gradeList = gradeList;
    this.csFormatted = csFormatted;
  }
}

@Component({
  selector: 'select-cs-dialog',
  templateUrl: './select-cs-dialog.html',
  styleUrls: [
    'select-class-section.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class SelectCSDialog {
  selectedClass;

  constructor(
    public dialogRef: MatDialogRef<SelectCSDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    const {csFormatted} = data;
    console.log(csFormatted);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectClass(cs) {
    this.selectedClass = cs;
  }

  isAllSelected() {
    for (const sec of this.selectedClass.sections) {
      if (!sec.isSelected) {
        return false;
      }
    }

    return true;
  }

  selectSection(sect) {
    const isAllSelected = this.isAllSelected();
    if (sect === 'ALL') {
      if (!isAllSelected) {
        for (const sec of this.selectedClass.sections) {
          sec.isSelected = true;
        }
      } else {
        for (const sec of this.selectedClass.sections) {
          sec.isSelected = false;
        }
      }
    } else {
      for (const std of this.data.csFormatted) {
        if (std.grade === this.selectedClass.grade) {
          for (const sec of std.sections) {
            if (sec.section === sect.section) {
              sec.isSelected = !sec.isSelected;
            }
          }
        }
      }
    }
  }

}
