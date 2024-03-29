import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AnimalService } from '@services/animal.service';
import { CidadeService } from '@services/cidade.service';
import { EspecieService } from '@services/especie.service';
import { RacaService } from '@services/raca.service';
import { EstadoService } from '@services/estado.service';
import {
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  Renderer2
} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import { Animal } from '@models/animal.model';

import { from, Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})


export class CadastroComponent implements OnInit {
  isSubmited: boolean = false;
  imageSrc: string;
  constructor(private animalService: AnimalService,
     private cidadeService: CidadeService,
      private estadoService: EstadoService,
      private especieService: EspecieService,
      private racaService: RacaService,
      private toastr: ToastrService,
      private router: Router) { }

  public formControl = new FormControl();

  animal: Animal = new Animal();

  public cidadeData: Array<Select2OptionData>;
  public especieData: Array<Select2OptionData>;
  public estadoData: Array<Select2OptionData>;
  public sexoData: Array<Select2OptionData>;
  public racaData: Array<Select2OptionData>;
  public porteData: Array<Select2OptionData>;



  public options: Options;

  animais: any[] = new Array();
  estados: any[] = new Array();
  cidades: any[] = new Array();
  especies: any[] = new Array();
  racas: any[] = new Array();
  public value: string;

  cadastroForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    sexo: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required),
    especie: new FormControl('', Validators.required),
    cidade: new FormControl('', Validators.required),
    raca: new FormControl('', Validators.required),
    porte: new FormControl('', Validators.required),
    cor: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required)

  });

  ngOnInit() {


    this.estadoService.buscarEstados().subscribe(estados => {
      estados.map(item => {
        this.estados.push({
          id: item.id,
          text: item.nome
        })
      });
      this.estadoData = this.estados;
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


    this.porteData = [
      {
        id: 'Pequeno',
        text: 'Pequeno'
      },
      {
        id: 'Médio',
        text: 'Médio'
      },
      {
        id: 'Grande',
        text: 'Grande'
      },
    ];




    this.options = {
      multiple: true,
      closeOnSelect: true,
      allowClear: true,
      maximumSelectionLength: 1
    };
  }

  get nome(): any {
    return this.cadastroForm.get('nome');
  }

  get file(): any {
    return this.cadastroForm.get('file');
  }
  get cidade(): any {
    return this.cadastroForm.get('cidade');
  }
  get raca(): any {
    return this.cadastroForm.get('raca');
  }
  get porte(): any {
    return this.cadastroForm.get('porte');
  }
  get cor(): any {
    return this.cadastroForm.get('cor');
  }
  get sexo(): any {
    return this.cadastroForm.get('sexo');
  }
  get descricao(): any {
    return this.cadastroForm.get('descricao');
  }
  get estado(): any {
    return this.cadastroForm.get('estado');
  }
  get especie(): any {
    return this.cadastroForm.get('especie');
  }
  get f(){
    return this.cadastroForm.controls;
  }

  onChangeEstado(idEstado) {
    if (idEstado) {
      this.cidadeService.buscarCidadesPorEstado(idEstado).subscribe(cidades => {
        this.cidades = [];
        cidades.map(item => {
          this.cidades.push({
            id: item.id,
            text: item.nome
          })
        });
        this.cidadeData = this.cidades;
      });
    }
  }

  onChangeEspecie(idEspecie) {
    if (idEspecie) {
      this.racaService.buscarPorEspecie(idEspecie).subscribe(racas => {
        this.racas = [];
        racas.map(item => {
          this.racas.push({
            id: item.id,
            text: item.nome
          })
        });
        this.racaData = this.racas;
      });
    }
  }




  onFormSubmit() {

    this.isSubmited = true;
    if (this.cadastroForm.valid) {
      this.animal.cor = this.cor.value;
      this.animal.descricao = this.descricao.value;
      this.animal.genero = this.sexo.value;
      this.animal.idCidade = this.cidade.value;
      this.animal.nome = this.nome.value;
      this.animal.porte = this.porte.value;
      this.animal.idRaca = this.raca.value;
      this.animalService.cadastrar(this.animal).subscribe(result => {
        this.cadastroForm.reset();
        this.router.navigate(['/']);
        this.toastr.success('Animal salvo com sucesso! Assim que alguém quiser adotar você receberá um e-mail!', 'Sucesso');
      }, (error) => {
        this.toastr.error('Ocorreu um problema ao salvar, verifique os campos cadastrados.', 'Erro');

      });

    }

  }

}
