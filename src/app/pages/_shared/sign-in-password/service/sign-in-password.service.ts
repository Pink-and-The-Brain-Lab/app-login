import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { API_PATH } from "src/app/constants/api-path";
import { ISignin } from "../models/sign-in.interface";
import { ISigninResponse } from "../models/sign-in-response.interface";

@Injectable({
  providedIn: 'root'
})
export class SignInPasswordService {

  private baseUrl = environment.baseUlr;

  constructor (
    private httpClient: HttpClient
  ) {}

  signIn(data: ISignin): Observable<ISigninResponse> {
    return this.httpClient.post<ISigninResponse>(`${this.baseUrl}${API_PATH.signIn}`, data);
  }

}
