import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { QuerSairConfirmComponent } from '../dialogs/quer-sair-confirm/quer-sair-confirm.component';
import { FuncionarioComponent } from '../pages/funcionario/funcionario.component';

@Injectable({
  providedIn: 'root'
})
export class PodeSairGuard implements CanDeactivate<FuncionarioComponent> {
  constructor(private dialog: MatDialog) { }
  canDeactivate(
    component: FuncionarioComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // 1- Pegar os dados do formulario e guardar cada um em variaveis diferentes
    const nome = component.formFuncionario.value.nome
    const email = component.formFuncionario.value.email
    const foto = component.formFuncionario.value.foto

    if (component.canLeave) {
      if (nome != component.funcionario.nome || email != component.funcionario.email || foto.length > 0) {
        const dialog = this.dialog.open(QuerSairConfirmComponent)
        return dialog.afterClosed()
      }
    }
    return true


  }

}
