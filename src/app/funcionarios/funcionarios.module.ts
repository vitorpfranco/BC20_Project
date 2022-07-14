import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { FuncionariosRoutingModule } from './funcionarios-routing.module';
import { ListarFuncionariosComponent } from './pages/listar-funcionarios/listar-funcionarios.component';
import { FuncionarioComponent } from './pages/funcionario/funcionario.component';
import { AddFuncionarioComponent } from './pages/add-funcionario/add-funcionario.component';
import { DeleteConfirmComponent } from './dialogs/delete-confirm/delete-confirm.component';
import { QuerSairConfirmComponent } from './dialogs/quer-sair-confirm/quer-sair-confirm.component';
import { NavbarComponent } from '../components/navbar/navbar.component';


@NgModule({
  declarations: [
    ListarFuncionariosComponent,
    FuncionarioComponent,
    AddFuncionarioComponent,
    DeleteConfirmComponent,
    QuerSairConfirmComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    FuncionariosRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class FuncionariosModule { }
