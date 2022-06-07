import {Component, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-blank',
    templateUrl: './blank.component.html',
    styleUrls: ['./blank.component.scss']
})
 

    export class BlankComponent implements OnInit {
        public formControl = new FormControl();

        public sexoData: Array<Select2OptionData>;
        public optionsSexo: Options;
        public exampleData: Array<Select2OptionData>;


        public value: string;


        ngOnInit() {

            this.exampleData = [
                {
                  id: 'basic1',
                  text: 'Basic 1'
                },
                {
                  id: 'basic2',
                  disabled: true,
                  text: 'Basic 2'
                },
                {
                  id: 'basic3',
                  text: 'Basic 3'
                },
                {
                  id: 'basic4',
                  text: 'Basic 4'
                }
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
        this.optionsSexo = {
           allowClear: true,
           multiple: true,
           placeholder: 'Selecione',
           maximumSelectionLength: 1
          };
        }
}


