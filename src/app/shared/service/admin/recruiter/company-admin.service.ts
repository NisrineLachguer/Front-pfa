import { Injectable } from '@angular/core';
import {CompanyDto} from "../../../model/recruiter/Company.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CompanyAdminService {
  private _API = '';
  private _items: Array<CompanyDto> | undefined;
  private _item: CompanyDto | undefined;
  protected API_PERMISSION: string ;
  private environment: any;


  constructor(private http: HttpClient) {
    this.API_PERMISSION = this.environment.apiUrl + 'modelPermissionUser/';
  }


  public findAll() {
    return this.http.get<Array<CompanyDto>>(this._API);
  }
  public save(): Observable<CompanyDto> {
    return this.http.post<CompanyDto>(this._API, this._item);
  }

  public delete(dto: CompanyDto) {
    return this.http.delete<number>(this._API + 'id/' + dto.id);
  }


  public edit(): Observable<CompanyDto> {
    return this.http.put<CompanyDto>(this._API, this._item);
  }

  get API() {
    return this.environment.apiUrlRecruitmentsystemms1 + 'admin/company/';
  }

  set API(value: string) {
    this._API = value;
  }

  public get items(): Array<CompanyDto> {
    if (this._items == null) {
      this._items = new Array<CompanyDto>();
    }
    return this._items;
  }

  public set items(value: Array<CompanyDto>) {
    this._items = value;
  }

  public get item(): CompanyDto {
    if (this._item == null) {
      this._item = new CompanyDto();
    }
    return this._item;
  }

  public set item(value: CompanyDto) {
    this._item = value;
  }
}
