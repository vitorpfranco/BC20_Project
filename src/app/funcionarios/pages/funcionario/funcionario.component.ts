import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteConfirmComponent } from '../../dialogs/delete-confirm/delete-confirm.component';
import { Funcionario } from '../../models/funcionario.model';
import { FuncionariosService } from '../../services/funcionarios.service';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.scss']
})
export class FuncionarioComponent implements OnInit {
  funcionario!: Funcionario;
  foto!: File;
  fotoPreview!: string;
  desabilitar: boolean = false
  fotoDefault: string = '/assets/imgs/default.jpg'
  naoEncontrado: boolean = false
  canLeave: boolean = true

  constructor(private route: ActivatedRoute, private funcionariosService: FuncionariosService, private snackBar: MatSnackBar, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        let idFuncionario = parseInt(params.get("id")!);
        this.recuperarFuncionarios(idFuncionario);
      })

  }

  recuperarFuncionarios(id: number): void {

    this.funcionariosService.getFuncionarioById(id)
      .subscribe(
        (func) => {
          this.funcionario = func;
          this.formFuncionario.setValue({ nome: this.funcionario.nome, email: this.funcionario.email, foto: "" });
          this.fotoPreview = this.funcionario.foto;
          this.valorMudou()
        },
        (erro: HttpErrorResponse) => {
          this.naoEncontrado = erro.status == 404
        }
      )
  }

  formFuncionario: FormGroup = new FormGroup({
    nome: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    foto: new FormControl("")
  })

  atualizarFuncionario() {
    this.canLeave = false;
    this.formFuncionario.value.foto = this.funcionario.foto
    Object.assign(this.funcionario, this.formFuncionario.value)
    if (this.foto) {
      this.funcionariosService.putFuncionario(this.funcionario, this.foto).subscribe(
        (dados) => {
          dados.then((obs$: any) => {
            obs$.subscribe((func: any) => {
              this.snackBar.open("Funcionario Atualizado!", 'Ok', {
                duration: 3000,
              })
              this.router.navigateByUrl("/funcionarios")
            }
            )
          })
        }
      )
    } else {
      this.funcionariosService.putFuncionario(this.funcionario).subscribe((func) => {
        this.snackBar.open("Funcionario Atualizado!", 'Ok', {
          duration: 3000,
        })
        this.router.navigateByUrl("/funcionarios")
      })
    }

  }
  recuperarFoto(event: any): void {
    this.foto = event.target.files[0]
    this.carregarPreview();
  }

  carregarPreview(): void {
    const reader = new FileReader();
    reader.readAsDataURL(this.foto)
    reader.onload = () => {
      this.fotoPreview = reader.result as string
    }
  }

  valorMudou() {
    this.formFuncionario.valueChanges.subscribe(
      (value) => {
        this.desabilitar = this.formFuncionario.invalid || !(value.nome != this.funcionario.nome || value.email != this.funcionario.email || value.foto.length > 0)
      })
  }


  deletarFuncionario() {
    const dialog = this.dialog.open(DeleteConfirmComponent);
    dialog.afterClosed().subscribe(
      (boolean) => {
        if (boolean) {
          this.funcionariosService.deletarFuncionario(this.funcionario).subscribe(
            () => {
              this.snackBar.open("Funcionario deletado com sucesso!", 'Ok', {
                duration: 4000,
              })
              this.router.navigateByUrl('/funcionarios')
            }
          )
        }
      })
  }
}

