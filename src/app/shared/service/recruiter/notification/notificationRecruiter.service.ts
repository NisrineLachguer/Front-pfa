import { Injectable } from '@angular/core';
import {NotificationDto} from "../../../model/notification/notification.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationRecruiterService {
  private _API = '';
  private _items: Array<NotificationDto> | undefined;
  private _item: NotificationDto | undefined;
  protected API_PERMISSION: string ;
  private environment: any;


  constructor(private http: HttpClient) {
    this.API_PERMISSION = this.environment.apiUrl + 'modelPermissionUser/';
  }


  public findAll() {
    return this.http.get<Array<NotificationDto>>(this._API);
  }
  public save(): Observable<NotificationDto> {
    return this.http.post<NotificationDto>(this._API, this._item);
  }

  public delete(dto: NotificationDto) {
    return this.http.delete<number>(this._API + 'id/' + dto.id);
  }


  public edit(): Observable<NotificationDto> {
    return this.http.put<NotificationDto>(this._API, this._item);
  }

  get API() {
    return this.environment.apiUrlRecruitmentsystemms1 + 'recruiter/notification/';
  }

  set API(value: string) {
    this._API = value;
  }

  public get items(): Array<NotificationDto> {
    if (this._items == null) {
      this._items = new Array<NotificationDto>();
    }
    return this._items;
  }

  public set items(value: Array<NotificationDto>) {
    this._items = value;
  }

  public get item(): NotificationDto {
    if (this._item == null) {
      this._item = new NotificationDto();
    }
    return this._item;
  }

  public set item(value: NotificationDto) {
    this._item = value;
  }
}
