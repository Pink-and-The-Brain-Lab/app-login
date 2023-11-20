import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { API_PATH } from "src/app/constants/api-path";
import { IDefaultResponse } from "src/app/commons/models/default-response.interface";

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordCodeValidationService {

  private baseUrl = environment.baseUlr;

  constructor (
    private httpClient: HttpClient
  ) {}

  validate(token: string): Observable<IDefaultResponse> {
    return this.httpClient.post<IDefaultResponse>(`${this.baseUrl}${API_PATH.tokenValidation}`, { token });
  }

}
