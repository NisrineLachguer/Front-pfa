import { Injectable } from '@angular/core';
import {CandidateDto} from "../../../model/condidate/Candidate.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CondidateCandidateService {
  private _API = '';
  private _items: Array<CandidateDto> | undefined;
  private _item: CandidateDto | undefined;
  private environment: any;
  private API_PERMISSION: string;

  constructor(private http: HttpClient) {
    this.API_PERMISSION = this.environment.apiUrl + 'modelPermissionUser/';
  }


  public findAll() {
    return this.http.get<Array<CandidateDto>>(this._API);
  }
  public save(): Observable<CandidateDto> {
    return this.http.post<CandidateDto>(this._API, this._item);
  }

  public delete(dto: CandidateDto) {
    return this.http.delete<number>(this._API + 'id/' + dto.id);
  }


  public edit(): Observable<CandidateDto> {
    return this.http.put<CandidateDto>(this._API, this._item);
  }

  get API(): string {
    return this.environment.apiUrlRecruitmentsystemms1 + 'admin/candidate/'
  }

  set API(value: string) {
    this._API = value;
  }

  get items(): Array<CandidateDto> {
    if (this._items == null) {
      this._items = new Array<CandidateDto>();
    }
    return this._items;
  }

  set items(value: Array<CandidateDto>) {
    this._items = value;
  }

  get item(): CandidateDto | undefined {
    if (this._item == null) {
      this._item = new CandidateDto();
    }
    return this._item;
  }

  set item(value: CandidateDto | undefined) {
    this._item = value;
  }
}
