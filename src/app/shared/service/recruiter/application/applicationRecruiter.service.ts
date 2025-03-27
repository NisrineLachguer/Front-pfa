import { Injectable } from '@angular/core';
import {ApplicationDto} from "../../../model/application/Application.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApplicationRecruiterService {
  private _API = '';
  private _items: Array<ApplicationDto> | undefined;
  private _item: ApplicationDto | undefined;
  protected API_PERMISSION: string ;
  private environment: any;


  constructor(private http: HttpClient) {
    this.API_PERMISSION = this.environment.apiUrl + 'modelPermissionUser/';
  }


  public findAll() {
    return this.http.get<Array<ApplicationDto>>(this._API);
  }
  public save(): Observable<ApplicationDto> {
    return this.http.post<ApplicationDto>(this._API, this._item);
  }

  public delete(dto: ApplicationDto) {
    return this.http.delete<number>(this._API + 'id/' + dto.id);
  }


  public edit(): Observable<ApplicationDto> {
    return this.http.put<ApplicationDto>(this._API, this._item);
  }

  get API() {
    return this.environment.apiUrlRecruitmentsystemms1 + 'recruiter/application/';
  }

  set API(value: string) {
    this._API = value;
  }

  public get items(): Array<ApplicationDto> {
    if (this._items == null) {
      this._items = new Array<ApplicationDto>();
    }
    return this._items;
  }

  public set items(value: Array<ApplicationDto>) {
    this._items = value;
  }

  public get item(): ApplicationDto {
    if (this._item == null) {
      this._item = new ApplicationDto();
    }
    return this._item;
  }

  public set item(value: ApplicationDto) {
    this._item = value;
  }

}
