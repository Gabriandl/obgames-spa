import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Avaliacao } from '../models/Avaliacao';
import { Observable } from 'rxjs';

@Injectable()
export class AvaliacaoService {
  private avaliacaoApiUrl = 'https://obgames-api.herokuapp.com/avaliacoes';
  constructor(private http: HttpClient) { }

  getAvaliacoes(): Observable<Avaliacao[]> {
    return this.http.get<Avaliacao[]>(this.avaliacaoApiUrl);
  }

  getAvaliacaoById(id: string): Observable<Avaliacao> {
    return this.http.get<Avaliacao>(`${this.avaliacaoApiUrl}/${id}`);
  }

  getAvaliacoesByBrowserGameId(id: string): Observable<Avaliacao[]> {
    return this.http.get<Avaliacao[]>(`${this.avaliacaoApiUrl}?browserGameId=${id}`);
  }

  createAvaliacoes(avaliacao: Avaliacao): Observable<Avaliacao> {
    return this.http.post<Avaliacao>(this.avaliacaoApiUrl, avaliacao);
  }

  editAvaliacao(avaliacao: Avaliacao): Observable<Avaliacao> {
    return this.http.put<Avaliacao>(`${this.avaliacaoApiUrl}/${avaliacao.id}`, avaliacao);
  }

  addCurtida(id: string, usuarioId: string): any{
    return this.http.put<Avaliacao>(`${this.avaliacaoApiUrl}/${id}/curtida?usuarioId=${usuarioId}`,'');
  }

  deleteCurtida(id: string, usuarioId: string): any{
    return this.http.delete<Avaliacao>(`${this.avaliacaoApiUrl}/${id}/curtida?usuarioId=${usuarioId}`);
  }

  deleteAvaliacao(id: string): Observable<any> {
    return this.http.delete<any>(`${this.avaliacaoApiUrl}/${id}`);
  }
}