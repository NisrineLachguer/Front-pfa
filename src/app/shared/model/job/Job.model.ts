
import {BaseDto} from "../../../dto/BaseDto.model";
import {CompanyDto} from "../recruiter/Company.model";
import {RequirementJobDto} from "./requirementJob.model";
import {SkillJobDto} from "./skill-job.model";
import {RecruiterDto} from "../recruiter/Recruiter.model";

export class JobDto extends BaseDto{
  public title: string;

  public description: string;

  public posted_date: null; // normalemnt date

  public recruiter: RecruiterDto ;
  public company: CompanyDto ;
  public requirementJobs: Array<RequirementJobDto>;
  public skillJobs: Array<SkillJobDto>;


  constructor() {
    super();

    this.title = '';
    this.description = '';
    this.posted_date = null;
    this.recruiter = new RecruiterDto() ;
    this.company = new CompanyDto() ;
    this.requirementJobs = new Array<RequirementJobDto>();
    this.skillJobs = new Array<SkillJobDto>();

  }

}
