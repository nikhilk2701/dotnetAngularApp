import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TimeagoModule } from 'ngx-timeago';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  standalone: true,
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
  imports: [CommonModule, TabsModule, GalleryModule, TimeagoModule],
})
export class MemberDetailComponent implements OnInit {
  member: Member | undefined;
  images: String[] = [];
  constructor(
    private memberService: MembersService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.loadMembers();
  }
  loadMembers() {
    const userName = this.route.snapshot.paramMap.get('username');
    if (!userName) return;
    this.memberService.getMember(userName).subscribe({
      next: (member) => {
        this.member = member;
        this.getImages();
      },
    });
  }

  getImages() {
    if (!this.member) return;
    for (const photo of this.member?.photos) {
      this.images.push(photo.url);
      this.images.push(photo.url);
      this.images.push(photo.url);
      this.images.push(photo.url);
      this.images.push(photo.url);
      this.images.push(photo.url);
    }
  }
}
