import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CandidateDto} from "../../../model/condidate/Candidate.model";

@Injectable({
  providedIn: 'root'
})
export class CondidateAdminService {
  protected _API = '';
  protected _items: Array<CandidateDto> | undefined;
  protected _item: CandidateDto | undefined;

  protected API_PERMISSION: string ;
  private environment: any;


  constructor(private http: HttpClient) {
    this.API_PERMISSION = this.environment.apiUrl + 'modelPermissionUser/';
  }
  public findAll() {
    return this.http.get<Array<CandidateDto>>(this._API);
  }
  public save(): Observable<CandidateDto> {
    return this.http.post<CandidateDto>(this._API, this.item);
  }

  public delete(dto: CandidateDto) {
    return this.http.delete<number>(this._API + 'id/' + dto.id);
  }
  get API() {
    return this.environment.apiUrlRecruitmentsystemms1 + 'admin/candidate/';
  }

  set API(value: string) {
    this._API = value;
  }
  public get items(): Array<CandidateDto> {
    if (this._items == null) {
      this._items = new Array<CandidateDto>();
    }
    return this._items;
  }

  public set items(value: Array<CandidateDto>) {
    this._items = value;
  }

  public get item(): CandidateDto {
    if (this._item == null) {
      this._item = new CandidateDto();
    }
    return this._item;
  }

  public set item(value: CandidateDto) {
    this._item = value;
  }
}
