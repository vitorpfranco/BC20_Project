import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { async } from '@firebase/util';
import { BehaviorSubject, map, mergeMap, Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Funcionario } from '../models/funcionario.model';

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService {
  defaultIMG: string = 'https://firebasestorage.googleapis.com/v0/b/appservicessoulcode.appspot.com/o/default.jpg?alt=media&token=0507ec6d-5dd0-4258-a20a-4fbb62c2e924'
  atualizarFuncionariosSub$: BehaviorSubject<boolean> = new BehaviorSubject(true)

  private readonly baseUrl: string = 'http://localhost:8080/servicos/funcionarios'
  constructor(private http: HttpClient, private storage: AngularFireStorage, private authService: AuthService) { }

  getFuncionarios(): Observable<Funcionario[]> {
    const token = this.authService.recuperarToken()
    return this.http.get<Funcionario[]>(this.baseUrl,
      { headers: { Authorization: 'Bearer ' + token } })
  }

  deletarFuncionario(funcionario: Funcionario): Observable<any> {
    if (funcionario.foto != this.defaultIMG) {
      this.storage.refFromURL(funcionario.foto).delete()
        .pipe(mergeMap(() => {
          return this.http.delete<any>(`${this.baseUrl}/${funcionario.id}`).pipe(
            tap((funcionario) => {
              this.atualizarFuncionariosSub$.next(true)
            })
          )
        }))
    }

    return this.http.delete<any>(`${this.baseUrl}/${funcionario.id}`).pipe(
      tap((funcionario) => {
        this.atualizarFuncionariosSub$.next(true)
      })
    )
  }

  getFuncionarioById(id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.baseUrl}/${id}`)
  }

  postFuncionario(funcionario: Funcionario, foto: File): Observable<Promise<Observable<Funcionario>>> {
    return this.http.post<Funcionario>((this.baseUrl), funcionario).pipe(
      map(async (funcionario) => {
        if (foto) {
          let linkFoto = await this.uploadImagem(foto)
          funcionario.foto = linkFoto
        } else {
          funcionario.foto = this.defaultIMG;
        }
        return this.putFuncionario(funcionario)
      })
    )
  }
  putFuncionario(funcionario: Funcionario, foto?: File): Observable<any> {
    if (foto) {
      const fotoAntiga = funcionario.foto
      return this.http.put<Funcionario>((this.baseUrl + "/" + funcionario.id), funcionario).pipe(
        map(async (funcionario) => {
          let linkFoto = await this.uploadImagem(foto)
          funcionario.foto = linkFoto
          if (fotoAntiga != this.defaultIMG) {
            return this.storage.refFromURL(fotoAntiga).delete()
              .pipe(mergeMap(() => {
                return this.putFuncionario(funcionario)
              }))
          }
          return this.putFuncionario(funcionario)
        })
      )
    }
    return this.http.put<Funcionario>((this.baseUrl + "/" + funcionario.id), funcionario).pipe(
      tap((funcionario) => {
        this.atualizarFuncionariosSub$.next(true)
      })
    )
  }


  private async uploadImagem(foto: File): Promise<string> {
    const nomeDoArquivo = Date.now()

    const dados = await this.storage.upload(`${nomeDoArquivo}`, foto)

    // a propriedade REF é a referencia do arquivo no firebase
    const downloadURL = await dados.ref.getDownloadURL() // retorna um link pro acesso da imagem

    return downloadURL
  }
}
