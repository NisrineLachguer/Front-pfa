import {BaseDto} from "../../../dto/BaseDto.model";

export class ApplicationStateDto extends BaseDto {
  public code: string;

  public label: string;

  public style: string;



  constructor() {
    super();

    this.code = '';
    this.label = '';
    this.style = '';

  }
}
