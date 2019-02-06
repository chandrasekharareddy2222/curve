import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {ConfirmDeleteService} from './confirm-delete.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['confirm-delete.scss']
})
export class ConfirmDeleteComponent implements OnInit, OnDestroy {
  @ViewChild('confirmDelete') confirmDelete;
  deleteMessage;
  subscriptionList: Subscription[] = [];

  constructor(private sharedService: ConfirmDeleteService,
              public modalService: NgbModal) {}

  ngOnInit() {
    this.subscriptionList.push(
      this.sharedService.delete.subscribe((res) => {
        this.deleteMessage = res.deleteMessage;
        this.showModal(res.data);
      }),
    );
  }

  showModal(data) {
    this.modalService.open(this.confirmDelete, { backdrop: 'static' }).result.then(
      (result) => {
        this.sharedService.confirmDelete.emit(data);
        return;
      },
      (reason) => {
        return reason;
      },
    );
  }

  ngOnDestroy() {
    this.subscriptionList.forEach((s) => s.unsubscribe());
    this.subscriptionList = [];
  }
}
