import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map, Observable } from 'rxjs';
import { Funcionario } from '../models/funcionario.model';

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService {
private readonly baseUrl:string='http://localhost:3000/funcionarios'
  constructor(private http:HttpClient, private storage:AngularFireStorage) { }

  getFuncionarios(): Observable<Funcionario[]>{
    return this.http.get<Funcionario[]>(this.baseUrl)
  }

  deletarFuncionario(id:number):Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/${id}`)
  }

  getFuncionarioById(id:number):Observable<Funcionario>{
    return this.http.get<Funcionario>(`${this.baseUrl}/${id}`)
  }
  
   postFuncionario(funcionario:Funcionario,foto:File):Observable<Promise<Observable<Funcionario>>> {
     return this.http.post<Funcionario>((this.baseUrl),funcionario).pipe(
      map(async (funcionario)=>{
      if(foto){
       let linkFoto= await this.uploadImagem(foto)
       funcionario.foto= linkFoto
      }
      return this.putFuncionario(funcionario)
      })
     )
  }
    
  putFuncionario(funcionario:Funcionario):Observable<Funcionario>{
    return this.http.put<Funcionario>((this.baseUrl+"/"+funcionario.id),funcionario)
  }


  private async uploadImagem(foto: File): Promise<string> {
    const nomeDoArquivo = Date.now()

    const dados = await this.storage.upload(`${nomeDoArquivo}`, foto) 

    // a propriedade REF é a referencia do arquivo no firebase
    const downloadURL = await dados.ref.getDownloadURL() // retorna um link pro acesso da imagem

    return downloadURL
}
}
