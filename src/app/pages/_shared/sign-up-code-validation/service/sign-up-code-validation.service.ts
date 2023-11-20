import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { API_PATH } from "src/app/constants/api-path";
import { ValidationTokenEnum } from "src/app/enums/validation-token-origin.enum";

@Injectable({
  providedIn: 'root'
})
export class SignUpCodeValidationService {

  private baseUrl = environment.baseUlr;

  constructor (
    private httpClient: HttpClient
  ) {}

  validate(code: string): Observable<string> {
    return this.httpClient.post<string>(`${this.baseUrl}${API_PATH.tokenValidation}`, {
      token: code,
      origin: ValidationTokenEnum.SIGNUP,
    });
  }

  generateNewToken(email: string): Observable<string> {
    return this.httpClient.post<string>(`${this.baseUrl}${API_PATH.generateNewToken}`, { email });
  }

}
