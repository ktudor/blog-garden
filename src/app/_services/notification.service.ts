import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Notification, NotificationEnum } from '@app/_models';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

  constructor(
    public snackBar: MatSnackBar,
    private zone: NgZone) { }

  showSuccess(message: string): void {
    // Had an issue with the snackbar being ran outside of angular's zone.
    this.zone.run(() => {
      this.snackBar.open(message);
    });
  }

  showError(message: string): void {
    this.zone.run(() => {
      // The second parameter is the text in the button. 
      // In the third, we send in the css class for the snack bar.
      this.snackBar.open(message, 'X', {panelClass: ['error']});
    });
  }

  showNotification(notification: Notification): void {
    this.zone.run(() => {
      switch(notification.type) {
        case NotificationEnum.Error:
          return this.snackBar.open(notification.message, 'X', {duration: 5000, panelClass: ['error']});
        case NotificationEnum.Warning:
          return this.snackBar.open(notification.message, '', {duration: 2500});
        case NotificationEnum.Information:
          return this.snackBar.open(notification.message, '', {duration: 2500});
      }
    });
  }
}