import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { ISignup } from "../models/signup.interface";
import { environment } from "src/environments/environment";
import { API_PATH } from "src/app/constants/api-path";

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  private baseUrl = environment.baseUlr;

  constructor (
    private httpClient: HttpClient
  ) {}

  signUp(data: ISignup): Observable<ISignup> {
    return this.httpClient.post<ISignup>(`${this.baseUrl}${API_PATH.signUp}`, data);
  }

}
