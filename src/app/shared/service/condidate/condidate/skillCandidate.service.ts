import { Injectable } from '@angular/core';
import {SkillDto} from "../../../model/condidate/skill.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SkillCandidateService {
  private _API = '';
  private _items: Array<SkillDto> | undefined;
  private _item: SkillDto | undefined;
  protected API_PERMISSION: string ;
  private environment: any;


  constructor(private http: HttpClient) {
    this.API_PERMISSION = this.environment.apiUrl + 'modelPermissionUser/';
  }


  public findAll() {
    return this.http.get<Array<SkillDto>>(this._API);
  }
  public save(): Observable<SkillDto> {
    return this.http.post<SkillDto>(this._API, this._item);
  }

  public delete(dto: SkillDto) {
    return this.http.delete<number>(this._API + 'id/' + dto.id);
  }


  public edit(): Observable<SkillDto> {
    return this.http.put<SkillDto>(this._API, this._item);
  }

  get API() {
    return this.environment.apiUrlRecruitmentsystemms1 + 'candidate/skill/';
  }

  set API(value: string) {
    this._API = value;
  }

  public get items(): Array<SkillDto> {
    if (this._items == null) {
      this._items = new Array<SkillDto>();
    }
    return this._items;
  }

  public set items(value: Array<SkillDto>) {
    this._items = value;
  }

  public get item(): SkillDto {
    if (this._item == null) {
      this._item = new SkillDto();
    }
    return this._item;
  }

  public set item(value: SkillDto) {
    this._item = value;
  }
}
