import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class AuthService {

    baseURL: string = "https://apiadocao.azurewebsites.net/";


    constructor(private http: HttpClient) { }


    login(email: string, senha: string): Observable<string> {
        return this.http.post<any>(this.baseURL + 'login', { email, senha },
            { observe: 'response' as 'body'})
            .pipe(map(res => {
                return res.headers.get("Authorization");
            }));
    }

    registrar(nome: string, email: string, senha: string): Observable<any> {
        return this.http.post<any>(this.baseURL + 'usuarios/cadastrar', {nome, email, senha },
        { observe: 'response' as 'body'})
        .pipe(map(res => {
            return res.headers.get("Authorization");
        }));
}
}
