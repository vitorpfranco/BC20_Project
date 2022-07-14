import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }
  private readonly baseUrl = 'http://localhost:8080'

  signIn(user: User): Observable<{ Authorization: string }> {
    return this.http.post<{ Authorization: string }>(`${this.baseUrl}/login`, user).pipe(
      tap((response) => { this.armazenarToken(response.Authorization) }))
  }
  armazenarToken(token: string) {
    localStorage.setItem('authorization', token)
  }
}
