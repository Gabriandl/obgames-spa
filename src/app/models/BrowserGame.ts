import { Categoria } from "./Categoria";

export interface BrowserGame {
    id?: string
    nome: string;
    urlImagem?: string;
    urlVideo?: string;
    urlJogo?: string;
    descricao?: string;
    timestamp?: Date;
    dataCriacao?: string;
    categoria: Categoria;
    idBrowserGame?: string;
  avgEstrelas: number;
  qtdAvaliacoes?: number;
  }