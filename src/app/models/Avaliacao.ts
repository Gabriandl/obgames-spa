import { BrowserGame } from "./BrowserGame"
import { Usuario } from "./Usuario"

export interface Avaliacao {
    id?: string
    numEstrelas: number;
    comentario: string;
    curtidas?: Array<Usuario>;
    curtidasSize?: number;
    timestamp?: Date;
    dataCriacao?: string;
    browserGame: BrowserGame;
    usuario: Usuario
  }

