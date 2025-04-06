import {BaseDto} from "../../../dto/BaseDto.model";
import {CompanyDto} from "./Company.model";

export class RecruiterDto extends BaseDto {
  public position: string;

  public enabled: null | boolean;

  public email: string;

  public password: string;

  public accountNonLocked: null | boolean;

  public passwordChanged: null | boolean;

  public username: string;

  public accountNonExpired: null | boolean;

  public credentialsNonExpired: null | boolean;

  public company: CompanyDto ;


  constructor() {
    super();

    this.position = '';
    this.enabled = null;
    this.email = '';
    this.password = '';
    this.accountNonLocked = null;
    this.passwordChanged = null;
    this.username = '';
    this.accountNonExpired = null;
    this.credentialsNonExpired = null;
    this.company = new CompanyDto() ;

  }
}
