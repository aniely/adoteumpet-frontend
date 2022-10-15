import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EstadoService {

    baseURL: string = "https://apiadocao.azurewebsites.net/estados";


    constructor(private http: HttpClient) { }


    buscarEstados(): Observable<any> {
        return this.http.get(this.baseURL);
    }

}
