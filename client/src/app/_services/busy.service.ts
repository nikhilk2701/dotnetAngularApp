import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class BusyService {
  busyRequestCount = 0;

  constructor(private spinner: NgxSpinnerService) {}
  busy() {
    this.busyRequestCount++;
    this.spinner.show(undefined, {
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: '#333333',
      template:
        "<img src='https://media.giphy.com/media/o8igknyuKs6aY/giphy.gif' />",
    });
  }

  idle() {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.spinner.hide();
    }
  }
}
