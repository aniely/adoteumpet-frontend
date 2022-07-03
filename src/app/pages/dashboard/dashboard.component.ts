import {Component, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { AnimalService } from '@services/animal.service';
import { CidadeService } from '@services/cidade.service';
import { EspecieService } from '@services/especie.service';
import { Pesquisa } from '@models/pesquisa.model';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  animais: any[] = new Array();
  cidades: any[] = new Array();
  especies: any[] = new Array();
  constructor(private animalService: AnimalService, private cidadeService: CidadeService, private especieService: EspecieService) {}
   
        public cidadeData:  Array<Select2OptionData>;
        public especieData: Array<Select2OptionData>;
        public sexoData: Array<Select2OptionData>;

        public options: Options;
        public options2: Options;
        public options3: Options;

        pesquisa: any = new Pesquisa();
      
        ngOnInit() {
          this.animalService.buscarAnimais().subscribe(animais => {
            this.animais = animais;
          });
          this.cidadeService.buscarCidades().subscribe(cidades => {
            cidades.map(item => {
              this.cidades.push({
                id: item.id,
                text: item.nome
              })
            });
            this.cidadeData = this.cidades;
          });
          this.especieService.buscarEspecies().subscribe(especies => {
            especies.map(item => {
              this.especies.push({
                id: item.id,
                text: item.nome
              })
            });
            this.especieData = this.especies;
          });
  
          this.sexoData = [
            {
              id: 'F',
              text: 'Fêmea'
            },
            {
              id: 'M',
              text: 'Macho'
            },
          ];
 

          this.options = {
            multiple: true,
            closeOnSelect: true,
            allowClear: true,
           maximumSelectionLength: 1
          };
          this.options2 = {
            multiple: true,
            closeOnSelect: true,
            allowClear: true,
            maximumSelectionLength: 1 
          };

          this.options3 = {
            multiple: true,
           closeOnSelect: true,
            allowClear: true,
            maximumSelectionLength: 1   
          };
        }


        pesquisar(){
          this.animalService.pesquisar(this.pesquisa).subscribe(animais => {
            this.animais = animais;
          });
        }

    
      }
      
 

