import { Injectable } from '@angular/core';
import {SkillJobDto} from "../../../model/job/skill-job.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SkillJobAdminService {
  private _API = '';
  private _items: Array<SkillJobDto> | undefined;
  private _item: SkillJobDto | undefined;
  protected API_PERMISSION: string ;
  private environment: any;


  constructor(private http: HttpClient) {
    this.API_PERMISSION = this.environment.apiUrl + 'modelPermissionUser/';
  }


  public findAll() {
    return this.http.get<Array<SkillJobDto>>(this._API);
  }
  public save(): Observable<SkillJobDto> {
    return this.http.post<SkillJobDto>(this._API, this._item);
  }

  public delete(dto: SkillJobDto) {
    return this.http.delete<number>(this._API + 'id/' + dto.id);
  }


  public edit(): Observable<SkillJobDto> {
    return this.http.put<SkillJobDto>(this._API, this._item);
  }

  get API() {
    return this.environment.apiUrlRecruitmentsystemms1 + 'admin/skillJob/';
  }

  set API(value: string) {
    this._API = value;
  }

  public get items(): Array<SkillJobDto> {
    if (this._items == null) {
      this._items = new Array<SkillJobDto>();
    }
    return this._items;
  }

  public set items(value: Array<SkillJobDto>) {
    this._items = value;
  }

  public get item(): SkillJobDto {
    if (this._item == null) {
      this._item = new SkillJobDto();
    }
    return this._item;
  }

  public set item(value: SkillJobDto) {
    this._item = value;
  }
}
