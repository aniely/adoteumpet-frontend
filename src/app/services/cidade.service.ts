import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CidadeService {

    baseURL: string = "https://apiadocao.azurewebsites.net/cidades";


    constructor(private http: HttpClient) { }


    buscarCidades(): Observable<any> {
        return this.http.get(this.baseURL);
    }
    buscarCidadesPorEstado(idEstado: number): Observable<any> {
        let params = new HttpParams();
        params = params.set('idEstado', idEstado);

        return this.http.get<any[]>(this.baseURL + '/pesquisarPorEstado', {params});

    }

}
