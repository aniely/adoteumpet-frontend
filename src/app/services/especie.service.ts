import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EspecieService {

    baseURL: string = "http://localhost:8082/especies";


    constructor(private http: HttpClient) { }


    buscarEspecies(): Observable<any> {
        return this.http.get(this.baseURL);
    }

}