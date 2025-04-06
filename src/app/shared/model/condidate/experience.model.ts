import {ApplicationDto} from '../application/Application.model';
import {BaseDto} from "../../../dto/BaseDto.model";


export class ExperienceDto extends BaseDto{

  public lieu: string;

  public description: string;

  public duration: null | number;

  public startDate: null; // normalement date

  public endDate: null; //normalement date

  public strengths: null | number;

 // public application: ApplicationDto ;


  constructor() {
    super();

    this.lieu = '';
    this.description = '';
    this.duration = null;
    this.startDate = null;
    this.endDate = null;
    this.strengths = null;

  }

}
