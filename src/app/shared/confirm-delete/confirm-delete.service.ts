import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable()
export class ConfirmDeleteService {
  @Output() delete = new EventEmitter();
  @Output() confirmDelete = new EventEmitter();

  deleteConfirm(data) {
    this.confirmDelete.emit(data);
  }
}
