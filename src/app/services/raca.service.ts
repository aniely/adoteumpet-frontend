import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RacaService {

    baseURL: string = "http://localhost:8082/racas";


    constructor(private http: HttpClient) { }


    buscarRacas(): Observable<any> {
        return this.http.get(this.baseURL);
    }

}