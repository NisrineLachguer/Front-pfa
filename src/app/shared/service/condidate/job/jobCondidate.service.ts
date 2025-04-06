import { Injectable } from '@angular/core';
import {JobDto} from "../../../model/job/Job.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JobCondidateService {
  private _API = '';
  private _items: Array<JobDto> | undefined;
  private _item: JobDto | undefined;
  protected API_PERMISSION: string ;
  private environment: any;


  constructor(private http: HttpClient) {
    this.API_PERMISSION = this.environment.apiUrl + 'modelPermissionUser/';
  }


  public findAll() {
    return this.http.get<Array<JobDto>>(this._API);
  }
  public save(): Observable<JobDto> {
    return this.http.post<JobDto>(this._API, this._item);
  }

  public delete(dto: JobDto) {
    return this.http.delete<number>(this._API + 'id/' + dto.id);
  }


  public edit(): Observable<JobDto> {
    return this.http.put<JobDto>(this._API, this._item);
  }

  get API() {
    return this.environment.apiUrlRecruitmentsystemms1 + 'candidate/job/';
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
