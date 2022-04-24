export interface Usuario {
    id?: string | null
    nomeCompleto?: string;
    username?: string;
    dataNasc: string;
    estado?: string;
    pais?: string;
    senha?: string;
    dataCriacao?: string;
    timestamp?: BigInteger;
    roles?: string[]
  }