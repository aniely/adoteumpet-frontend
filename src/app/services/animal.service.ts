import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Pesquisa } from "@models/pesquisa.model";
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AnimalService {

    baseURL: string = "https://apiadocao.azurewebsites.net/animais";


    constructor(private http: HttpClient) { }


    buscarAnimais(): Observable<any> {

        return this.http.get(this.baseURL);
    }





    pesquisar(pesquisa: Pesquisa): Observable<any[]> {
        let params = new HttpParams();
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


   cadastrar(animal: any): Observable<any> {
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') });
    let options = { headers: headers };
    return this.http.post<any>(this.baseURL,  animal, options);
   }

    adotar(idAnimal: number): Observable<any> {
       let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        });
        let options = { headers: headers };
        return this.http.post<any>(this.baseURL + '/adotar',  idAnimal, options);
    }

}
