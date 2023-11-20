import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { IResetInterface } from "../models/reset-password.interface";
import { environment } from "src/environments/environment";
import { IDefaultResponse } from "src/app/commons/models/default-response.interface";
import { API_PATH } from "src/app/constants/api-path";

@Injectable({
  providedIn: 'root'
})
export class CreateNewPasswordService {

  private baseUrl = environment.baseUlr;

  constructor (
    private httpClient: HttpClient
  ) {}

  send(data: IResetInterface): Observable<IDefaultResponse> {
    return this.httpClient.post<IDefaultResponse>(`${this.baseUrl}${API_PATH.createPassword}`, data);
  }

}
