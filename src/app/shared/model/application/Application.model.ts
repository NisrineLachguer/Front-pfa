import {BaseDto} from "../../../dto/BaseDto.model";
import {JobDto} from "../job/Job.model";
import {CandidateDto} from "../condidate/Candidate.model";
import {ExperienceDto} from "../condidate/experience.model";
import {ApplicationskillDto} from "../condidate/application-skill.model";
import {ApplicationStateDto} from "./application-state.model";

export class ApplicationDto extends BaseDto{
  public applicationDate: null; // date normalement

  public candidate: CandidateDto ;
  public job: JobDto ;
  public applicationState: ApplicationStateDto ;
  public experiences: Array<ExperienceDto>;
  public applicationskills: Array<ApplicationskillDto>;


  constructor() {

    super();
    this.applicationDate = null;
    this.candidate = new CandidateDto() ;
    this.job = new JobDto() ;
    this.applicationState = new ApplicationStateDto() ;
    this.experiences = new Array<ExperienceDto>();
    this.applicationskills = new Array<ApplicationskillDto>();

  }
}
