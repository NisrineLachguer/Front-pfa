import {BaseDto} from "../../../dto/BaseDto.model";

export class CandidateDto extends BaseDto {
  public description: string;
  public enabled: null | boolean;

  public email: string;

  public password: string;

  public accountNonLocked: null | boolean;

  public passwordChanged: null | boolean;

  public username: string;

  public accountNonExpired: null | boolean;

  public credentialsNonExpired: null | boolean;


  constructor() {
    super();

    this.description = '';
    this.enabled = null;
    this.email = '';
    this.password = '';
    this.accountNonLocked = null;
    this.passwordChanged = null;
    this.username = '';
    this.accountNonExpired = null;
    this.credentialsNonExpired = null;

  }
}
