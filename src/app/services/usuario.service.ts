import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarioApiUrl = 'https://obgames-api.herokuapp.com/usuarios';
  constructor(private http: HttpClient) { }

  getBrowserGameById(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.usuarioApiUrl}/${id}`);
  }

  editCategoria(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.usuarioApiUrl}/${usuario.id}`, usuario);
  }
}
