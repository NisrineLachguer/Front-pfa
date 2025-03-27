import {JobDto} from "./Job.model";
import {SkillDto} from "../condidate/skill.model";
import {BaseDto} from "../../../dto/BaseDto.model";


export class SkillJobDto extends BaseDto{

  public description: string;

 // public skill: SkillDto ;
  public job: JobDto ;


  constructor() {
    super();

    this.description = '';
    this.job = new JobDto() ;

  }

}

