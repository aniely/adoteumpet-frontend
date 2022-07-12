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

    buscarPorEspecie(idEspecie: number): Observable<any> {
        let params = new HttpParams();
        params = params.set('idEspecie', idEspecie);
        
        return this.http.get<any[]>(this.baseURL + '/pesquisarPorEspecie', {params});

    }
    
}