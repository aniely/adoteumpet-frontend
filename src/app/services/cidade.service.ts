import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CidadeService {

    baseURL: string = "http://localhost:8082/cidades";


    constructor(private http: HttpClient) { }


    buscarCidades(): Observable<any> {
        return this.http.get(this.baseURL);
    }

}