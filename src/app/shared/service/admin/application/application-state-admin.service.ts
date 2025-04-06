import { Injectable } from '@angular/core';
import {ApplicationStateDto} from "../../../model/application/application-state.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApplicationStateAdminService {
  protected _API = '';
  //protected _items: Array<ApplicationStateDto>;
  protected _item: ApplicationStateDto | undefined;
  private API_PERMISSION: string;
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

}
