import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryModule, ImageItem } from 'ng-gallery';
import { TabDirective, TabsModule, TabsetComponent } from 'ngx-bootstrap/tabs';
import { TimeagoModule } from 'ngx-timeago';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { MemberMessagesComponent } from '../member-messages/member-messages.component';
import { Message } from 'src/app/_models/message';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  standalone: true,
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
  imports: [
    CommonModule,
    TabsModule,
    GalleryModule,
    TimeagoModule,
    MemberMessagesComponent,
  ],
})
export class MemberDetailComponent implements OnInit {
  member: Member = {} as Member;
  images: String[] = [];
  @ViewChild('memberTabs', { static: true }) membersTabs?: TabsetComponent;
  activeTab?: TabDirective;
  messages: Message[] = [];

  constructor(
    private memberService: MembersService,
    private route: ActivatedRoute,
    private service: MessageService
  ) {}
  ngOnInit(): void {
    // this.loadMembers();

    this.route.data.subscribe({
      next: (data) => {
        this.member = data['member'];
        console.log(data['member']);
      },
    });

    this.route.queryParams.subscribe({
      next: (params) => {
        params['tab'] && this.selectTab(params['tab']);
      },
    });

    this.getImages();
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab?.heading === 'Messages') {
      this.loadMessages();
    }
  }
  loadMessages() {
    if (this.member) {
      this.service.getMessageThread(this.member.userName).subscribe({
        next: (messages) => {
          this.messages = messages;
        },
      });
    }
  }

  selectTab(heading: string) {
    if (this.membersTabs) {
      console.log(heading);
      this.membersTabs.tabs.find((x) => x.heading === heading)!.active = true;
    }
  }

  // loadMembers() {
  //   const userName = this.route.snapshot.paramMap.get('username');
  //   if (!userName) return;
  //   this.memberService.getMember(userName).subscribe({
  //     next: (member) => {
  //       this.member = member;
  //       this.getImages();
  //     },
  //   });
  // }

  getImages() {
    if (!this.member) return;
    for (const photo of this.member?.photos) {
      this.images.push(photo.url);
      this.images.push(photo.url);
    }
  }
}
