import { Injectable } from '@angular/core';
import {RecruiterDto} from "../../../model/recruiter/Recruiter.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecruiterRecruiterService {
  private _API = '';
  private _items: Array<RecruiterDto> | undefined;
  private _item: RecruiterDto | undefined;
  protected API_PERMISSION: string ;
  private environment: any;


  constructor(private http: HttpClient) {
    this.API_PERMISSION = this.environment.apiUrl + 'modelPermissionUser/';
  }


  public findAll() {
    return this.http.get<Array<RecruiterDto>>(this._API);
  }
  public save(): Observable<RecruiterDto> {
    return this.http.post<RecruiterDto>(this._API, this._item);
  }

  public delete(dto: RecruiterDto) {
    return this.http.delete<number>(this._API + 'id/' + dto.id);
  }


  public edit(): Observable<RecruiterDto> {
    return this.http.put<RecruiterDto>(this._API, this._item);
  }

  get API() {
    return this.environment.apiUrlRecruitmentsystemms1 + 'recruiter/recruiter/';
  }

  set API(value: string) {
    this._API = value;
  }

  public get items(): Array<RecruiterDto> {
    if (this._items == null) {
      this._items = new Array<RecruiterDto>();
    }
    return this._items;
  }

  public set items(value: Array<RecruiterDto>) {
    this._items = value;
  }

  public get item(): RecruiterDto {
    if (this._item == null) {
      this._item = new RecruiterDto();
    }
    return this._item;
  }

  public set item(value: RecruiterDto) {
    this._item = value;
  }
}
