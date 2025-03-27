import { Injectable } from '@angular/core';
import {ExperienceDto} from "../../../model/condidate/experience.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExperienceCandidateService {
  private _API = '';
  private _items: Array<ExperienceDto> | undefined;
  private _item: ExperienceDto | undefined;
  private _API_PERMISSION: string ;
  private environment: any;


  constructor(private http: HttpClient) {
    this._API_PERMISSION = this.environment.apiUrl + 'modelPermissionUser/';
  }


  public findAll() {
    return this.http.get<Array<ExperienceDto>>(this._API);
  }
  public save(): Observable<ExperienceDto> {
    return this.http.post<ExperienceDto>(this._API, this._item);
  }

  public delete(dto: ExperienceDto) {
    return this.http.delete<number>(this._API + 'id/' + dto.id);
  }


  public edit(): Observable<ExperienceDto> {
    return this.http.put<ExperienceDto>(this._API, this._item);
  }


  public get API(): string {
    return this.environment.apiUrlRecruitmentsystemms1 + 'admin/experience/';
  }
  public setApi(API: string) {
    this._API = API;
  }


  public get items(): Array<ExperienceDto> {
    if (this._items == null) {
      this._items = new Array<ExperienceDto>();
    }
    return this._items;
  }

  public set items(value: Array<ExperienceDto>) {
    this._items = value;
  }

  public get item(): ExperienceDto {
    if (this._item == null) {
      this._item = new ExperienceDto();
    }
    return this._item;
  }

  public set item(value: ExperienceDto | undefined) {
    this._item = value;
  }

}
