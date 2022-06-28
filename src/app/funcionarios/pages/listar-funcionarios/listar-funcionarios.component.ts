import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Funcionario } from '../../models/funcionario.model';
import { FuncionariosService } from '../../services/funcionarios.service';
import { AddFuncionarioComponent } from '../add-funcionario/add-funcionario.component';
import { EditFuncionarioComponent } from '../edit-funcionario/edit-funcionario.component';

@Component({
  selector: 'app-listar-funcionarios',
  templateUrl: './listar-funcionarios.component.html',
  styleUrls: ['./listar-funcionarios.component.scss']
})
export class ListarFuncionariosComponent implements OnInit{
funcionarios: Funcionario[]=[]
colunas: Array<string> = ["id","nome","email","actions"]
  constructor(private funcionarioService:FuncionariosService, public dialog:MatDialog) { }

  ngOnInit(): void {
    this.recuperarFuncionarios()
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
  editarFuncionario(id:number){

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

  openAddFuncionario(): void {
    this.dialog.open(AddFuncionarioComponent);
     this.dialog.afterAllClosed.subscribe(
      ()=>{
      this.recuperarFuncionarios()
     })
    }

    openEditFuncionario(funcionario:Funcionario): void {
      this.dialog.open(EditFuncionarioComponent,{
        data: {
          id:funcionario.id,
          nome:funcionario.nome,
          email:funcionario.email,
          foto:funcionario.foto
      }});
       this.dialog.afterAllClosed.subscribe(
        ()=>{
        this.recuperarFuncionarios()
       })
      }
}
