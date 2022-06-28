import { Component,OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Funcionario } from '../../models/funcionario.model';
import { FuncionariosService } from '../../services/funcionarios.service';

@Component({
  selector: 'app-add-funcionario',
  templateUrl: './add-funcionario.component.html',
  styleUrls: ['./add-funcionario.component.scss']
})
export class AddFuncionarioComponent implements OnInit {
  formFuncionario: FormGroup = new FormGroup({
    nome: new FormControl('', [ Validators.required ]),
    email: new FormControl('',[ Validators.required, Validators.email]),
    foto: new FormControl('')}) 

  constructor(public dialogRef: MatDialogRef<AddFuncionarioComponent>, public funcionarioService: FuncionariosService) { }

  postFuncionario():void{
    this.funcionarioService.postFuncionario(this.formFuncionario.value)
    .subscribe(
      ()=>{},
      (erro)=>{
        console.log(erro)
      }
    )
  }
  
  ngOnInit(): void {
  }

}
