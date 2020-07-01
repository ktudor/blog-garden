import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { LoggingService, NotificationService } from '@app/_services';

import { Notification, NotificationEnum } from '@app/_models';

const serverMessages: ServerMessage[] = [
  { status: 404, message: '404 - URL not found: ' }
];

@Injectable()
export class NotificationHandler implements ErrorHandler {

  constructor(private injector: Injector) { }
  
  handleError(error: Error | HttpErrorResponse | Notification) {
    const logger = this.injector.get(LoggingService);
    const notifier = this.injector.get(NotificationService);

    // TODO: remove old code
    //let message;
    //let stackTrace;
    let notification: Notification;

    if (error instanceof HttpErrorResponse) {
      // Server error
      // TODO: remove old code
      //message = errorService.getServerErrorMessage(error);
      //stackTrace = errorService.getServerErrorStackTrace(error);
      //notifier.showError(message);
      notification = this.getNotification(error);
    } else if (error instanceof Notification) {
      notification = error;
    } else if (error instanceof Error) {
      // Client Error - do we need this?
      // TODO: Remove old code
      //message = errorService.getClientErrorMessage(error);
      //notifier.showError(message);
      notification = new Notification('Client Error', 'unknown', error.message, NotificationEnum.Error, error.stack);
    }
    notifier.showNotification(notification);
    // Always log errors
    logger.logError(notification);
    //console.error(error);
  }

  getNotification(error: HttpErrorResponse): Notification {
    if (!navigator.onLine) {
      return new Notification('HTTP', 'unknown', 'No internet connection', NotificationEnum.Error);
    }

    let message: string = error.message;
    const newMessage = serverMessages.find(x => x.status == error.status);

    if (newMessage) {
      message = newMessage.message.concat(error.url);
    }

    return new Notification('HTTP', 'unknown', message, NotificationEnum.Error);
  }
}

class ServerMessage {
  status: number;
  message: string;
}