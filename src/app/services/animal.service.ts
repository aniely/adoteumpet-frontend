import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Pesquisa } from "@models/pesquisa.model";
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AnimalService {

    baseURL: string = "http://localhost:8082/animais";


    constructor(private http: HttpClient) { }


    buscarAnimais(): Observable<any> {
       
        return this.http.get(this.baseURL);
    }
 
        //let headers = new Headers();
       // headers.append('Content-Type', 'application/json');
      //  headers.append('projectid', this.id);
      //headers: headers,
 

    pesquisar(pesquisa: Pesquisa): Observable<any[]> {
        let params = new HttpParams();
        debugger;
        if (pesquisa.idEspecie && pesquisa.idEspecie.length > 0) {
            params = params.set('idEspecie', pesquisa.idEspecie[0]);
        }
        if (pesquisa.idCidade && pesquisa.idCidade.length > 0) {
            params = params.set('idCidade', pesquisa.idCidade[0]);
        }
        if (pesquisa.sexo && pesquisa.sexo.length > 0) {
            params = params.set('sexo', pesquisa.sexo[0]);
        }
        return this.http.get<any[]>(this.baseURL + '/pesquisar', {params});
   }

}