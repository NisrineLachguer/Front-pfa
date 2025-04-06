import { Injectable } from '@angular/core';
import {ApplicationStateDto} from "../../../model/application/application-state.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApplicationStateCandidateService {
  private _API = '';
  private _items: Array<ApplicationStateDto> | undefined;
  private _item: ApplicationStateDto | undefined;
  protected API_PERMISSION: string ;
  private environment: any;


  constructor(private http: HttpClient) {
    this.API_PERMISSION = this.environment.apiUrl + 'modelPermissionUser/';
  }


  public findAll() {
    return this.http.get<Array<ApplicationStateDto>>(this._API);
  }
  public save(): Observable<ApplicationStateDto> {
    return this.http.post<ApplicationStateDto>(this._API, this._item);
  }

  public delete(dto: ApplicationStateDto) {
    return this.http.delete<number>(this._API + 'id/' + dto.id);
  }


  public edit(): Observable<ApplicationStateDto> {
    return this.http.put<ApplicationStateDto>(this._API, this._item);
  }


  get API() {
    return this.environment.apiUrlRecruitmentsystemms1 + 'candidate/applicationState/';
  }

  set API(value: string) {
    this._API = value;
  }

  public get items(): Array<ApplicationStateDto> {
    if (this._items == null) {
      this._items = new Array<ApplicationStateDto>();
    }
    return this._items;
  }

  public set items(value: Array<ApplicationStateDto>) {
    this._items = value;
  }

  public get item(): ApplicationStateDto {
    if (this._item == null) {
      this._item = new ApplicationStateDto();
    }
    return this._item;
  }

  public set item(value: ApplicationStateDto) {
    this._item = value;
  }
}
