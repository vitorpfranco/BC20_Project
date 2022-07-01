import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Funcionario } from '../../models/funcionario.model';
import { FuncionariosService } from '../../services/funcionarios.service';
import { AddFuncionarioComponent } from '../add-funcionario/add-funcionario.component';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
@Component({
  selector: 'app-listar-funcionarios',
  templateUrl: './listar-funcionarios.component.html',
  styleUrls: ['./listar-funcionarios.component.scss']
})
export class ListarFuncionariosComponent implements OnInit{
funcionarios: Funcionario[]=[]
colunas: Array<string> = ["id","nome","email","actions"]
  constructor(private funcionarioService:FuncionariosService, public dialog:MatDialog, private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.recuperarFuncionarios()
  }



  deletarFuncionario(id:number){
    const dialog= this.dialog.open(DeleteConfirmComponent);
    dialog.afterClosed().subscribe(
      (boolean)=>{
        if(boolean){
          this.funcionarioService.deletarFuncionario(id).subscribe(
            (funcs)=>{
              this.recuperarFuncionarios();
              this.snackBar.open("Funcionario deletado com sucesso!", 'Ok', {
                duration: 4000,
              })
            }
          )
        }
    })
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

}
