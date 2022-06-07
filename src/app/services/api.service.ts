import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {

    baseURL: string = "http://localhost:8082/animais";


    constructor(private http: HttpClient) { }


    buscarAnimais(): Observable<any> {
        return this.http.get(this.baseURL)
    }

}