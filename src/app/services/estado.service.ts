import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EstadoService {

    baseURL: string = "http://localhost:8082/estados";


    constructor(private http: HttpClient) { }


    buscarEstados(): Observable<any> {
        return this.http.get(this.baseURL);
    }

}