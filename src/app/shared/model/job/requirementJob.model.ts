import {JobDto} from "./Job.model";
import {BaseDto} from "../../../dto/BaseDto.model";

export class RequirementJobDto extends BaseDto{

  public name: string;

  public description: string;

  //public job: JobDto ;


  constructor() {
    super();

    this.name = '';
    this.description = '';

  }

}

