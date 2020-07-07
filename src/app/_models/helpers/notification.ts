import { NotificationEnum } from '../enums/notificationEnum';

export class Notification {

  constructor (
    public source: string,
    public method: string,
    public message: string,
    public type: NotificationEnum,
    public stack?: string) {}
}