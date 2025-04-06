import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ApplicationDto} from "../../../model/application/Application.model";

@Injectable({
  providedIn: 'root'
})
export class ApplicationAdminService {

  private _API = '';
  private _items: Array<ApplicationDto> | undefined;
  private _item: ApplicationDto | undefined;
  private API_PERMISSION: string;
  private environment: any; // ajouter

  constructor(private http: HttpClient) {
    this.API_PERMISSION = this.environment.apiUrl + 'modelPermissionUser/';
  }

  public findAll() {
    return this.http.get<Array<ApplicationDto>>(this.API);
  }
  public save(): Observable<ApplicationDto> {
    return this.http.post<ApplicationDto>(this.API, this.item);
  }
  public delete(dto: ApplicationDto) {
    return this.http.delete<number>(this.API + 'id/' + dto.id);
  }


  get API(){
    return this._API;
  }

  set API(value: string) {
    this._API = value;
  }

  get items(): Array<ApplicationDto> {
    if (this._items == null) {
      this._items = new Array<ApplicationDto>();
    }
    return this._items;
  }

  set items(value: Array<ApplicationDto>) {
    this._items = value;
  }

  get item(): ApplicationDto {
    if (this._item == null) {
      this._item = new ApplicationDto();
    }
    return this._item;
  }

  set item(value: ApplicationDto) {
    this._item = value;
  }
}
