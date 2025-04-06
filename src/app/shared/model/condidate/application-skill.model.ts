import {BaseDto} from "../../../dto/BaseDto.model";
import {ApplicationDto} from "../application/Application.model";
import {SkillDto} from "./skill.model";


export class ApplicationskillDto extends BaseDto{

  public lieu: string;

  public description: string;

  public strengths: null | number;

 // public application: ApplicationDto ;
  public skill: SkillDto ;


  constructor() {
    super();

    this.lieu = '';
    this.description = '';
    this.strengths = null;
    this.skill = new SkillDto() ;

  }

}
