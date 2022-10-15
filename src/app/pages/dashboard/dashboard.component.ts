import { element } from 'protractor';
import {Component, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { AnimalService } from '@services/animal.service';
import { CidadeService } from '@services/cidade.service';
import { EspecieService } from '@services/especie.service';
import { Pesquisa } from '@models/pesquisa.model';
import {ToastrService} from 'ngx-toastr';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


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
  checkTermos: false;
  animalSelecionado: number;
  closeResult: string = '';
  image: string | ArrayBuffer;
  thumbnail: any;
  usuarioLogado: boolean;

  constructor(private animalService: AnimalService,
    private cidadeService: CidadeService,
     private especieService: EspecieService,
     private toastr: ToastrService,
     private modalService: NgbModal,
     private router: Router) {}

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
          this.animais =  this.animais.slice(0, 8);
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




        buscarAnimais(){
            this.animalService.buscarAnimais().subscribe(animais => {
            this.animais = animais;
            this.animais =  this.animais.slice(0, 8);
          });
        }

        adotar(){
          this.animalService.adotar(this.animalSelecionado).subscribe(animais => {
              this.toastr.success('Parabéns! Em breve você receberá um contato do tutor do animal!', 'Sucesso');
            }, (error) => {
              console.log(error);
             // this.toastr.error('Ocorreu um problema, tente novamente.', 'Erro');
          });
          this.modalService.dismissAll();
         // this. buscarAnimais();
          window.location.reload();
        }

        pesquisar(){
          this.animalService.pesquisar(this.pesquisa).subscribe(animais => {
            this.animais = animais;
          });
        }

        verificaLogin(content:any, animalId: number){
          this.usuarioLogado = localStorage.getItem('token') ? true : false;
          if(!this.usuarioLogado){
            this.router.navigate(['/login']);
          }else{
            this.open(content, animalId);
          }
        }
        open(content:any, animalId: number) {
          this.animalSelecionado = animalId;
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
          this.checkTermos = false;
          if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
          } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
          } else {
            return  `with: ${reason}`;
          }
        }





      }



