import {BaseDto} from "../../../dto/BaseDto.model";

export class CompanyDto extends BaseDto{

  public name: string;

  public industry: string;

  public location: string;

  public description: string;

  public logo: string;



  constructor() {
    super();

    this.name = '';
    this.industry = '';
    this.location = '';
    this.description = '';
    this.logo = '';

  }

}
