import {Component, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { AnimalService } from '@services/animal.service';
import { CidadeService } from '@services/cidade.service';
import { EspecieService } from '@services/especie.service';
import { Pesquisa } from '@models/pesquisa.model';
import {ToastrService} from 'ngx-toastr';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  animais: any[] = new Array();
  cidades: any[] = new Array();
  especies: any[] = new Array();
  title = 'appBootstrap';
   
  closeResult: string = '';
  
  constructor(private animalService: AnimalService, 
    private cidadeService: CidadeService,
     private especieService: EspecieService,
     private toastr: ToastrService,
     private modalService: NgbModal) {}
   
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
           this.animais =  this.animais.slice(0, 4);
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
            console.log(animais);
          }); 
        }

        open(content:any) {
          this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
        } 
          
        /**
         * Write code on Method
         *
         * @return response()
         */
        private getDismissReason(reason: any): string {
          if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
          } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
          } else {
            return  `with: ${reason}`;
          }
        }
      }
      
 

