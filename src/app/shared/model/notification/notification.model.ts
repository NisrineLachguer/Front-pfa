import {BaseDto} from "../../../dto/BaseDto.model";
import {ApplicationDto} from "../application/Application.model";

export class NotificationDto extends BaseDto {
  public message: string;

  public createdAt: null; // normalement date

  public read: null | boolean;
  public application: ApplicationDto ;


  constructor() {
    super();

    this.message = '';
    this.createdAt = null;
    this.read = null;
    this.application = new ApplicationDto() ;

  }
}
