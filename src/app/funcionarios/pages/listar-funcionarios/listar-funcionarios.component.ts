import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Funcionario } from '../../models/funcionario.model';
import { FuncionariosService } from '../../services/funcionarios.service';
import { AddFuncionarioComponent } from '../add-funcionario/add-funcionario.component';

@Component({
  selector: 'app-listar-funcionarios',
  templateUrl: './listar-funcionarios.component.html',
  styleUrls: ['./listar-funcionarios.component.scss']
})
export class ListarFuncionariosComponent implements OnInit, OnDestroy{
funcionarios: Funcionario[]=[]
colunas: Array<string> = ["id","nome","email","actions"]
  constructor(private funcionarioService:FuncionariosService, public dialog:MatDialog) { }

  ngOnInit(): void {
    this.recuperarFuncionarios()
  }
  ngOnDestroy(){
    console.log("teste");
  }
  deletarFuncionario(id:number){
    const confirmar = confirm("Realmente deseja deletar esse funcionário?");
    if(confirmar) {
    this.funcionarioService.deletarFuncionario(id).subscribe(
      (funcs)=>{
        this.recuperarFuncionarios();
      },
      (erro)=>{
        console.log(erro)
      })
    }
  }

  recuperarFuncionarios():void{
    this.funcionarioService.getFuncionarios().subscribe(
      (funcs)=>{
        this.funcionarios= funcs
      },
      (erro)=>{
        console.log(erro)
      },
    )
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddFuncionarioComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
     this.dialog.afterAllClosed.subscribe(
      ()=>{
      this.recuperarFuncionarios()
     })
    }
}
