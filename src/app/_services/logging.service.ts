import { Injectable } from '@angular/core';

import { Notification } from '@app/_models';

@Injectable({
    providedIn: 'root'
})
export class LoggingService {
  logError(notification: Notification) {
    // Send errors to be saved here
    // The console.log is only for testing this example.
    console.log('LoggingService: ' + notification.message);
  }
}