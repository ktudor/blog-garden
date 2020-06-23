import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

const serverMessages: ServerMessage[] = [
  { status: 404, message: '404 - URL not found: ' }
];
  
@Injectable({
  providedIn: 'root'
})
export class ErrorService {

/*
  getClientMessage(error: Error): string {
    if (!navigator.onLine) {
      return 'No Internet Connection';
    }
    return error.message ? error.message : error.toString();
  }

  getClientStack(error: Error): string {
    return error.stack;
  }

  getServerMessage(error: HttpErrorResponse): string {
    return error.message;
  }

  getServerStack(error: HttpErrorResponse): string {
    // handle stack trace
    return 'stack';
  }
*/

  getClientErrorMessage(error: Error): string {    
    return error.message ? 
           error.message : 
           error.toString();
  }

  getServerErrorMessage(error: HttpErrorResponse): string {
    if (!navigator.onLine) {
      return 'No internet connection';
    }

    let message: string = null;

    if (error.status) {
      message = serverMessages.find(x => x.status == error.status).message.concat(error.url);
    }

    return !message ?    
           error.message :
           message;
  }
}

class ServerMessage {
    status: number;
    message: string;
}