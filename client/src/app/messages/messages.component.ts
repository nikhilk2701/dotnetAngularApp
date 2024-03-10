import { Message } from './../_models/message';
import { Pagination } from './../_models/pagination';
import { Component, OnInit } from '@angular/core';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  messages: Message[] | undefined = [];
  pagination?: Pagination;
  container = 'Unread';
  pageNUmber = 1;
  pagiSize = 5;
  loading = false;

  constructor(private messagesService: MessageService) {}
  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.loading = true;
    this.messagesService
      .getMessages(this.pageNUmber, this.pagiSize, this.container)
      .subscribe({
        next: (response) => {
          this.messages = response.result;
          this.pagination = response.pagination;
          this.loading = false;
        },
      });
  }

  pageChanged(event: any) {
    if (this.pageNUmber !== event.page) {
      this.pageNUmber = event.page;
      this.loadMessages();
    }
  }

  deleteMessage(id: number) {
    this.messagesService.deleteMessage(id).subscribe({
      next: () => {
        this.messages?.splice(
          this.messages.findIndex((m) => m.id == id),
          1
        );
      },
    });
  }
}
