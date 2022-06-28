import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Funcionario } from '../../models/funcionario.model';
import { FuncionariosService } from '../../services/funcionarios.service';

@Component({
  selector: 'app-edit-funcionario',
  templateUrl: './edit-funcionario.component.html',
  styleUrls: ['./edit-funcionario.component.scss']
})
export class EditFuncionarioComponent implements OnInit {
  funcionario!:Funcionario

  ngOnInit(): void {
this.formFuncionario.setValue({nome: this.data.nome, email:this.data.email, foto:this.data.foto})
  }

  formFuncionario: FormGroup = new FormGroup({
    nome: new FormControl("", [ Validators.required ]),
    email: new FormControl("",[ Validators.required, Validators.email]),
    foto: new FormControl("")})

  constructor(public dialogRef: MatDialogRef<EditFuncionarioComponent>, public funcionarioService: FuncionariosService,   @Inject(MAT_DIALOG_DATA) public data: Funcionario) { }


  editFuncionario(){
    this.funcionarioService.putFuncionario(this.data.id!,this.formFuncionario.value)
    .subscribe(
      ()=>{},
      (erro)=>{
        console.log(erro)
      }
    )
  }
}
