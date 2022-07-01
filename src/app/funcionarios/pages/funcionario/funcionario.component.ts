import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
foto!:File;
fotoPreview!:string;
fotoDefault:string ='/assets/imgs/default.jpg'
constructor(private route: ActivatedRoute, private funcionariosService: FuncionariosService) { }

  ngOnInit(): void {
  this.route.paramMap.subscribe(
    (params)=>{
    let idFuncionario = parseInt(params.get("id")!); 
    this.recuperarFuncionarios(idFuncionario); 
    })

  }

recuperarFuncionarios(id:number): void {
    this.funcionariosService.getFuncionarioById(id)
    .subscribe(
      func=>{
        this.funcionario=func;
        this.formFuncionario.setValue({nome:this.funcionario.nome,email:this.funcionario.email});
        this.fotoPreview= this.funcionario.foto;
      })
  }

  formFuncionario: FormGroup = new FormGroup({
    nome: new FormControl("", [ Validators.required ]),
    email: new FormControl("",[ Validators.required, Validators.email])})

atualizarFuncionario(){

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
}
