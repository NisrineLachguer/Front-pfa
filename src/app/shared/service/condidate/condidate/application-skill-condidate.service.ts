import { Injectable } from '@angular/core';
import {ApplicationskillDto} from "../../../model/condidate/application-skill.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApplicationSkillCondidateService {
  private _API = '';
  private _items: Array<ApplicationskillDto> | undefined;
  private _item: ApplicationskillDto | undefined;
  private API_PERMISSION: string;
  private environment: any;

  constructor(private http: HttpClient) {
    this.API_PERMISSION = this.environment.apiUrl + 'modelPermissionUser/';
  }
  public findAll() {
    return this.http.get<Array<ApplicationskillDto>>(this._API);
  }
  public save(): Observable<ApplicationskillDto> {
    return this.http.post<ApplicationskillDto>(this._API, this._item);
  }

  public delete(dto: ApplicationskillDto) {
    return this.http.delete<number>(this._API + 'id/' + dto.id);
  }


  public edit(): Observable<ApplicationskillDto> {
    return this.http.put<ApplicationskillDto>(this._API, this._item);
  }

  get API(): string {
    return this.environment.apiUrlRecruitmentsystemms1 + 'admin/applicationskill/';
  }

  set API(value: string) {
    this._API = value;
  }

  public get items(): Array<ApplicationskillDto> {
    if (this._items == null) {
      this._items = new Array<ApplicationskillDto>();
    }
    return this._items;
  }

  public set items(value: Array<ApplicationskillDto>) {
    this._items = value;
  }

  public get item(): ApplicationskillDto {
    if (this._item == null) {
      this._item = new ApplicationskillDto();
    }
    return this._item;
  }

  public set item(value: ApplicationskillDto) {
    this._item = value;
  }
}
