import { Component,OnInit} from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    email: new FormControl('',[ Validators.required, Validators.email])})
foto!:File
fotoPreview:string ='/assets/imgs/default.jpg';
  constructor(public dialogRef: MatDialogRef<AddFuncionarioComponent>, public funcionarioService: FuncionariosService, private storage: AngularFireStorage, private snackBar:MatSnackBar) { }

  postFuncionario():void{
    const funcionario: Funcionario = this.formFuncionario.value;
    funcionario.foto= '';
    this.funcionarioService.postFuncionario(funcionario, this.foto)
    .subscribe(
      (dados)=>{
        dados.then((obs$)=>{
          obs$.subscribe((func)=>{
            this.dialogRef.close()
            this.snackBar.open("Funcionario criado com sucesso!", 'Ok', {
              duration: 4000,
            })
          }
          )
        })
      },
      (erro)=>{
        console.log(erro)
      }
    )
  }
  recuperarFoto(event:any):void{
    this.foto=event.target.files[0]
    this.carregarPreview();
  }

  carregarPreview():void{
    const reader = new FileReader();
    reader.readAsDataURL(this.foto)
    reader.onload=()=>{
      this.fotoPreview = reader.result as string
    }
  }
  
  ngOnInit(): void {
  }

}
