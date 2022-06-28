import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Funcionario } from '../../models/funcionario.model';
import { FuncionariosService } from '../../services/funcionarios.service';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.scss']
})
export class FuncionarioComponent implements OnInit {
funcionario!:Funcionario;
  constructor(private route: ActivatedRoute, private funcionariosService: FuncionariosService) { }

  ngOnInit(): void {
  this.route.paramMap.subscribe(
    (params)=>{
    let idFuncionario = parseInt(params.get("id")!);
    console.log(idFuncionario);
    this.recuperarFuncionarios(idFuncionario);
    })
  }

  recuperarFuncionarios(id:number): void {
    this.funcionariosService.getFuncionarioById(id)
    .subscribe(
      func=>{this.funcionario=func})
  }
}
