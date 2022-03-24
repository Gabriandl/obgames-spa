import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../models/Categoria';

@Injectable()
export class CategoriaService {
  private categoriaApiUrl = 'https://obgames-api.herokuapp.com/categorias';
  constructor(private http: HttpClient) { }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.categoriaApiUrl);
  }

  createCategorias(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.categoriaApiUrl, categoria);
  }

  editCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.categoriaApiUrl}/${categoria.id}`, categoria);
  }

  deleteCategoria(id: string): Observable<any> {
    return this.http.delete<any>(`${this.categoriaApiUrl}/${id}`);
  }
}