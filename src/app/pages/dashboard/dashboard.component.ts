import {Component, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { ApiService } from '@services/api.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  animais: any[];
  constructor(private apiService: ApiService) {}
   
        public cidadeData: Array<Select2OptionData>;
        public especieData: Array<Select2OptionData>;
        public sexoData: Array<Select2OptionData>;

        public options: Options;
        public options2: Options;
        public options3: Options;
      
        ngOnInit() {
         
          this.apiService.buscarAnimais()
          .subscribe(r => {
            this.animais = r;
            
          });


          this.especieData = [
            {
              id: '1',
              text: 'Cachorro'
            },
            {
              id: '2',
              text: 'Gato'
            },
           
          ];

          this.sexoData = [
            {
              id: '1',
              text: 'Fêmea'
            },
            {
              id: '2',
              text: 'Macho'
            },
          ];

          this.cidadeData = [
            {
              id: '1',
              text: 'Campos dos Goytacazes'
            },
            {
              id: '2',
              text: 'São João da Barra'
            },                     
          ];
      
          this.options = {
            multiple: true,
            closeOnSelect: true,
            allowClear: true,
            maximumSelectionLength: 3
         
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
      }
      
 

