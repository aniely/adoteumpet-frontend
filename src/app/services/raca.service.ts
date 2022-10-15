import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RacaService {

    baseURL: string = "https://apiadocao.azurewebsites.net/racas";


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
