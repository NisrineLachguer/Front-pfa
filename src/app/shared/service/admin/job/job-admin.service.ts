import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {JobDto} from "../../../model/job/Job.model";

@Injectable({
  providedIn: 'root'
})
export class JobAdminService {
  protected _API = '';
  protected _items: Array<JobDto> | undefined;
  protected _item: JobDto | undefined

  protected API_PERMISSION: string ;
  private environment: any;


  constructor(private http: HttpClient) {
    this.API_PERMISSION = this.environment.apiUrl + 'modelPermissionUser/';
  }


  public findAll() {
    return this.http.get<Array<JobDto>>(this.API);
  }
  public save(): Observable<JobDto> {
    return this.http.post<JobDto>(this.API, this.item);
  }

  public delete(dto: JobDto) {
    return this.http.delete<number>(this.API + 'id/' + dto.id);
  }
  get API() {
    return this.environment.apiUrlRecruitmentsystemms1 + 'admin/job/';
  }
  set API(value: string) {
    this._API = value;
  }

  public get items(): Array<JobDto> {
    if (this._items == null) {
      this._items = new Array<JobDto>();
    }
    return this._items;
  }

  public set items(value: Array<JobDto>) {
    this._items = value;
  }

  public get item(): JobDto {
    if (this._item == null) {
      this._item = new JobDto();
    }
    return this._item;
  }

  public set item(value: JobDto) {
    this._item = value;
  }

}
