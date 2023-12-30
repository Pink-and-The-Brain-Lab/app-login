import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class GenericCRUDService {

    private readonly baseUrl = environment.baseUlr;
    private readonly httpClient = inject(HttpClient);

    genericPost<T, U>(apiUrl: string, payload: U = {} as U, options = {}): Observable<T> {
        return this.httpClient.post<T>(`${this.baseUrl}${apiUrl}`, payload, options);
    }
}
