import {BaseDto} from "../../../dto/BaseDto.model";


export class SkillDto extends BaseDto{

  public name: string;

  public description: string;



  constructor() {
    super();

    this.name = '';
    this.description = '';

  }

}
