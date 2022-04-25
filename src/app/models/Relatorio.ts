import { BrowserGame } from "./BrowserGame";
import { Categoria } from "./Categoria";
import { Usuario } from "./Usuario";

export interface Relatorio {
    
    categorias?: Categoria[];
    browserGames?: BrowserGame[];
    usuarios?: Usuario[];
 
  }