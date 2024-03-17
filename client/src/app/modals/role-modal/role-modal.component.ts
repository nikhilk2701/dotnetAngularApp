import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-role-modal',
  templateUrl: './role-modal.component.html',
  styleUrls: ['./role-modal.component.css'],
})
export class RoleModalComponent implements OnInit {
  username: String = '';
  availableRoles: any[] = [];
  selectedRoles: any[] = [];
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {}

  updateChecked(checkedVal: string) {
    const index = this.selectedRoles.indexOf(checkedVal);

    index != -1
      ? this.selectedRoles.splice(index, 1)
      : this.selectedRoles.push(checkedVal);
  }
}
