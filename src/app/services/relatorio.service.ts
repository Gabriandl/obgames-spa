import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Relatorio } from '../models/Relatorio';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {
  private relatorioApiUrl = 'https://obgames-api.herokuapp.com/relatorio';
  constructor(private http: HttpClient) { }


  getRelatorio(tipoRelatorio: string, dataInicial: number, dataFinal: number): Observable<Relatorio> {
    return this.http.get<Relatorio>(`${this.relatorioApiUrl}?tipoRelatorio=${tipoRelatorio}&dataInicial=${dataInicial}&dataFinal=${dataFinal}`);
  }

}
