import { Component, OnInit } from '@angular/core';
import {
  BsModalRef,
  BsModalService,
  ModalBackdropOptions,
  ModalOptions,
} from 'ngx-bootstrap/modal';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { AdminService } from 'src/app/_services/admin.service';
import { RoleModalComponent } from 'src/app/modals/role-modal/role-modal.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  user: User | undefined;
  bsModalRef: BsModalRef<RoleModalComponent> =
    new BsModalRef<RoleModalComponent>();

  availableRoles = ['Admin', 'Moderator', 'Member'];
  constructor(
    private adminService: AdminService,
    private modelService: BsModalService,
    private account: AccountService
  ) {
    this.account.currentUser$.subscribe({
      next: (user) => {
        this.user = user!;
      },
    });
  }
  ngOnInit(): void {
    this.getUserWithRoles();
  }

  getUserWithRoles() {
    this.adminService.getUserWIthRoles().subscribe({
      next: (users) => {
        this.users = users;
        for (let index = 0; index < this.users.length; index++) {
          const element = this.users[index];
        }
      },
    });
  }

  openRolesModal(user: User) {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        username: user.userName,
        availableRoles: this.availableRoles,
        selectedRoles: [...user.roles],
      },
    };

    this.bsModalRef = this.modelService.show(RoleModalComponent, config);
    this.bsModalRef.onHidden?.subscribe({
      next: () => {
        const selectedRoles = this.bsModalRef.content?.selectedRoles;
        if (!this.arrayEqual(selectedRoles!, this.availableRoles)) {
          this.adminService
            .updateRoles(user.userName.toString(), selectedRoles!)
            .subscribe({
              next: (roles) => {
                user.roles = roles;
              },
            });
        }
      },
    });
  }

  private arrayEqual(arr1: any[], arr2: any[]) {
    return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
  }
}
