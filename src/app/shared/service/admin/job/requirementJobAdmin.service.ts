import { Injectable } from '@angular/core';
import {RequirementJobDto} from "../../../model/job/requirementJob.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RequirementJobAdminService {
  protected _API = '';
  protected _items: Array<RequirementJobDto> | undefined;
  protected _item: RequirementJobDto | undefined;
  protected API_PERMISSION: string ;
  private environment: any;


  constructor(private http: HttpClient) {
    this.API_PERMISSION = this.environment.apiUrl + 'modelPermissionUser/';
  }


  public findAll() {
    return this.http.get<Array<RequirementJobDto>>(this._API);
  }
  public save(): Observable<RequirementJobDto> {
    return this.http.post<RequirementJobDto>(this._API, this._item);
  }

  public delete(dto: RequirementJobDto) {
    return this.http.delete<number>(this._API + 'id/' + dto.id);
  }


  public edit(): Observable<RequirementJobDto> {
    return this.http.put<RequirementJobDto>(this._API, this._item);
  }

  get API() {
    return this.environment.apiUrlRecruitmentsystemms1 + 'admin/requirementJob/';
  }
  set API(value: string) {
    this._API = value;
  }

  public get items(): Array<RequirementJobDto> {
    if (this._items == null) {
      this._items = new Array<RequirementJobDto>();
    }
    return this._items;
  }

  public set items(value: Array<RequirementJobDto>) {
    this._items = value;
  }

  public get item(): RequirementJobDto {
    if (this._item == null) {
      this._item = new RequirementJobDto();
    }
    return this._item;
  }

  public set item(value: RequirementJobDto) {
    this._item = value;
  }
}
