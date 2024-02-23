import { AccountService } from './../../_services/account.service';
import { User } from 'src/app/_models/user';
import { Member } from './../../_models/member';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MembersService } from 'src/app/_services/members.service';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  ngOnInit(): void {
    this.loadMembers();
  }
  member: Member | undefined;
  user: User | null = null;
  @ViewChild('editForm') editForm: NgForm | undefined;
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(
    private accountService: AccountService,
    private membeeService: MembersService,
    private toasterService: ToastrService
  ) {
    accountService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => (this.user = user),
    });
  }
  loadMembers() {
    if (!this.user) return;
    var userName = this.user.userName;
    this.membeeService.getMember(userName.toString()).subscribe({
      next: (member) => {
        this.member = member;
        console.log(this.member);
      },
    });
  }

  updateMember() {
    this.membeeService.updateMember(this.editForm?.value).subscribe({
      next: (_) => {
        this.toasterService.success('Profile updated');
        this.editForm?.reset(this.member);
      },
    });
  }
}
